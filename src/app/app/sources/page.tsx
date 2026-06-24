import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/queries";
import { listSources, pendingInboxCount } from "@/lib/source-queries";
import { syncSource, deleteSource } from "@/lib/source-actions";
import {
  SOURCE_CATALOG,
  SOURCE_STATUS_META,
  type SourceCatalogEntry,
} from "@/lib/constants";
import { Button, ButtonLink } from "@/components/ui";
import { formatDate } from "@/lib/utils";

function StatusPill({ status }: { status: SourceCatalogEntry["status"] }) {
  const meta = SOURCE_STATUS_META[status];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${meta.className}`}
    >
      {meta.label}
    </span>
  );
}

function CatalogCard({ entry }: { entry: SourceCatalogEntry }) {
  const href =
    entry.mode === "rss"
      ? "/app/sources/rss"
      : entry.mode === "youtube"
        ? "/app/sources/youtube"
        : `/app/sources/manual?type=${entry.key}&platform=${encodeURIComponent(entry.platform ?? entry.name)}`;
  const cta =
    entry.mode === "rss"
      ? "Connect feed"
      : entry.mode === "youtube"
        ? "Connect channel"
        : "Add manually";
  return (
    <div className="cx-card flex flex-col p-5">
      <div className="flex items-start justify-between gap-2">
        <span className="text-2xl" aria-hidden>
          {entry.icon}
        </span>
        <StatusPill status={entry.status} />
      </div>
      <h3 className="mt-3 font-semibold">{entry.name}</h3>
      <p className="mt-1 flex-1 text-sm text-muted">{entry.blurb}</p>
      {entry.note ? (
        <p className="mt-1 text-xs text-muted/80">{entry.note}</p>
      ) : null}
      <ButtonLink
        href={href}
        size="sm"
        variant={entry.status === "live" ? "primary" : "outline"}
        className="mt-4 w-full"
      >
        {cta}
      </ButtonLink>
    </div>
  );
}

export default async function SourcesPage() {
  await requireUser();
  const workspace = await getPrimaryWorkspace();
  if (!workspace) {
    return (
      <div className="cx-container py-16 text-center">
        <p className="text-muted">Create a workspace first.</p>
        <ButtonLink href="/app" className="mt-4">
          Go to dashboard
        </ButtonLink>
      </div>
    );
  }

  const [sources, pending] = await Promise.all([
    listSources(workspace.id),
    pendingInboxCount(workspace.id),
  ]);

  const live = SOURCE_CATALOG.filter((s) => s.status === "live");
  const manual = SOURCE_CATALOG.filter((s) => s.status !== "live");

  return (
    <div className="cx-container py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted">{workspace.name}</p>
          <h1 className="text-3xl font-semibold tracking-tight">Sources</h1>
          <p className="mt-1 text-sm text-muted">
            Bring proof in, then curate it in the{" "}
            <Link href="/app/inbox" className="font-medium text-brand">
              Proof Inbox
            </Link>
            {pending > 0 ? ` (${pending} pending)` : ""}.
          </p>
        </div>
        <ButtonLink href="/app/sources/manual">Add proof manually</ButtonLink>
      </div>

      {/* Connected sources */}
      {sources.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-lg font-semibold">Connected sources</h2>
          <div className="cx-card mt-3 divide-y divide-border p-0">
            {sources.map((s) => (
              <div
                key={s.id}
                className="flex flex-wrap items-center justify-between gap-3 p-5"
              >
                <div className="min-w-0">
                  <p className="font-medium">
                    <span className="capitalize">{s.type}</span> · {s.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    {s.last_sync_at
                      ? `Last synced ${formatDate(s.last_sync_at)}`
                      : "Not synced yet"}
                  </p>
                  {s.last_error ? (
                    <p className="mt-1 text-xs text-danger">⚠ {s.last_error}</p>
                  ) : null}
                </div>
                <div className="flex items-center gap-2">
                  <form action={syncSource}>
                    <input type="hidden" name="source_id" value={s.id} />
                    <Button type="submit" size="sm" variant="outline">
                      Re-sync
                    </Button>
                  </form>
                  <form action={deleteSource}>
                    <input type="hidden" name="source_id" value={s.id} />
                    <Button type="submit" size="sm" variant="ghost" className="text-danger">
                      Delete
                    </Button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Live / automated */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold">Automated sources</h2>
        <p className="text-sm text-muted">Import recent items on demand. Approve before anything goes live.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {live.map((entry) => (
            <CatalogCard key={entry.key} entry={entry} />
          ))}
        </div>
      </div>

      {/* Manual */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold">Manual import sources</h2>
        <p className="text-sm text-muted">
          Add, paste or organise proof from the places your customers already
          speak. Automated connectors for these are on the roadmap.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {manual.map((entry) => (
            <CatalogCard key={entry.key} entry={entry} />
          ))}
        </div>
      </div>
    </div>
  );
}
