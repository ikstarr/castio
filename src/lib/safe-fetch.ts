import { lookup } from "node:dns/promises";
import net from "node:net";

/**
 * SSRF protection for server-side fetches of user-supplied URLs (RSS / YouTube).
 *
 * - only http/https, only ports 80/443, no embedded credentials
 * - blocks loopback / private / link-local / unique-local / metadata addresses
 *   (checked against the *resolved* IPs, not just the literal host)
 * - manual redirect following: every hop is re-validated, so a public URL can't
 *   bounce to an internal one
 * - request timeout + max response size
 *
 * Uses only Node built-ins (no new dependencies).
 */

const MAX_REDIRECTS = 5;
const TIMEOUT_MS = 10_000;
const MAX_BYTES = 4 * 1024 * 1024; // 4 MB

const BLOCKED_HOSTS = new Set([
  "localhost",
  "metadata",
  "metadata.google.internal",
]);

export class BlockedUrlError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BlockedUrlError";
  }
}

/** True if an IP literal falls in a private/loopback/link-local/reserved range. */
export function ipIsBlocked(rawIp: string): boolean {
  let ip = rawIp;
  const mapped = ip.match(/^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/i);
  if (mapped) ip = mapped[1];

  const kind = net.isIP(ip);
  if (kind === 4) {
    const parts = ip.split(".").map(Number);
    if (parts.length !== 4 || parts.some((n) => Number.isNaN(n) || n < 0 || n > 255)) {
      return true;
    }
    const [a, b] = parts;
    if (a === 0) return true; // 0.0.0.0/8
    if (a === 10) return true; // private
    if (a === 127) return true; // loopback
    if (a === 169 && b === 254) return true; // link-local + cloud metadata (169.254.169.254)
    if (a === 172 && b >= 16 && b <= 31) return true; // private
    if (a === 192 && b === 168) return true; // private
    if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT
    if (a >= 224) return true; // multicast / reserved
    return false;
  }

  if (kind === 6) {
    const v = ip.toLowerCase();
    if (v === "::1" || v === "::") return true; // loopback / unspecified
    if (v.startsWith("fe80")) return true; // link-local
    if (v.startsWith("fc") || v.startsWith("fd")) return true; // unique-local fc00::/7
    if (v.startsWith("ff")) return true; // multicast
    return false;
  }

  return true; // not a valid IP literal → block
}

/** Synchronous syntax/scheme/port/host checks (no DNS). */
export function validateUrlSyntax(raw: string): URL {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new BlockedUrlError("That doesn’t look like a valid URL.");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new BlockedUrlError("Only http and https URLs are allowed.");
  }
  if (url.username || url.password) {
    throw new BlockedUrlError("URLs with embedded credentials are not allowed.");
  }
  const port = url.port ? Number(url.port) : url.protocol === "https:" ? 443 : 80;
  if (port !== 80 && port !== 443) {
    throw new BlockedUrlError("Only standard ports 80 and 443 are allowed.");
  }
  const host = url.hostname.toLowerCase().replace(/\.$/, "");
  if (BLOCKED_HOSTS.has(host)) {
    throw new BlockedUrlError("That host is not allowed.");
  }
  if (net.isIP(host) && ipIsBlocked(host)) {
    throw new BlockedUrlError("That address is private or internal and not allowed.");
  }
  return url;
}

/** Full validation including DNS resolution of every record. */
export async function assertPublicUrl(raw: string): Promise<URL> {
  const url = validateUrlSyntax(raw);
  const host = url.hostname.toLowerCase().replace(/\.$/, "");

  if (net.isIP(host)) return url; // literal IP already checked

  let addresses: { address: string }[];
  try {
    addresses = await lookup(host, { all: true });
  } catch {
    throw new BlockedUrlError("Could not resolve that host.");
  }
  if (addresses.length === 0) {
    throw new BlockedUrlError("Could not resolve that host.");
  }
  for (const a of addresses) {
    if (ipIsBlocked(a.address)) {
      throw new BlockedUrlError(
        "That host resolves to a private or internal address.",
      );
    }
  }
  return url;
}

async function readCapped(res: Response): Promise<string> {
  const declared = Number(res.headers.get("content-length") ?? 0);
  if (declared > MAX_BYTES) throw new Error("That feed is too large.");

  const reader = res.body?.getReader();
  if (!reader) return res.text();

  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      total += value.length;
      if (total > MAX_BYTES) {
        await reader.cancel();
        throw new Error("That feed is too large.");
      }
      chunks.push(value);
    }
  }
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) {
    merged.set(c, offset);
    offset += c.length;
  }
  return new TextDecoder().decode(merged);
}

/**
 * Fetch a user-supplied URL safely: validates the URL (and every redirect hop)
 * against the SSRF rules, applies a timeout and a max size, and returns the
 * response body as text.
 */
export async function safeFetch(
  rawUrl: string,
  headers?: Record<string, string>,
): Promise<string> {
  let current = rawUrl;

  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    const url = await assertPublicUrl(current);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    let res: Response;
    try {
      res = await fetch(url.toString(), {
        headers,
        redirect: "manual",
        signal: controller.signal,
      });
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") {
        throw new Error("That request timed out.");
      }
      throw new Error("Could not reach that URL.");
    } finally {
      clearTimeout(timer);
    }

    // Manual redirect handling — re-validate the next hop.
    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location");
      if (!location) throw new Error(`Feed returned HTTP ${res.status}.`);
      current = new URL(location, url).toString();
      continue;
    }

    if (!res.ok) throw new Error(`Feed returned HTTP ${res.status}.`);
    return readCapped(res);
  }

  throw new Error("Too many redirects.");
}
