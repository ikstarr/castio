/** Tiny className joiner (avoids pulling in an extra dependency). */
export function cn(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(" ");
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 60);
}

/** The iframe snippet a user copies to embed a published wall. */
export function embedSnippet(wallId: string, origin: string): string {
  return `<iframe
  src="${origin}/embed/${wallId}"
  title="Castio proof wall"
  loading="lazy"
  style="width:100%;border:0;overflow:hidden"
  height="640"
></iframe>`;
}

export function initials(name: string | null | undefined): string {
  if (!name) return "★";
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function formatDate(input: string): string {
  try {
    return new Date(input).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}
