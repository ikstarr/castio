import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace, listWalls } from "@/lib/queries";
import { listSourceItems } from "@/lib/source-queries";
import { setItemStatus, deleteItem } from "@/lib/source-actions";
import { ButtonLink, StatusPill } from "@/components/ui";
import { proofTypeIcon, proofTypeLabel } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import type { SourceItem } from "@/lib/types";

function StatusForm({
  item,
  status,
  label,
}: {
  item: SourceItem;
  status: string;
  label: string;
}) {
  return (
    <form action={setItemStatus}>
      <input type="hidden" name="item_id" value={item.id} />
      <input type="hidden" name="status" value={status} />
      <button
        type="submit"
        className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted transition-colors hover:border-brand/40 hover:text-foreground"
      >
        {label}
      </button>
    </form>
  );
}

function ItemRow({ item, hasWalls }: { item: SourceItem; hasWalls: boolean }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 p-5">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span aria-hidden>{proofTypeIcon(item.proof_type)}</span>
          <span className="text-xs font-medium text-muted">
            {proofTypeLabel(item.proof_type)}
          </span>
          {item.source_platform ? (
            <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[11px] text-muted">
              {item.source_platform}
            </span>
          ) : null}
          <StatusPill status={item.status} />
        </div>
        <p className="mt-2 line-clamp-2 text-sm">
          {item.title ? <span className="font-semibold">{item.title} </span> : null}
          {item.content}
        </p>
        <p className="mt-1 text-xs text-muted">
          {[item.author_name, item.author_handle, item.company]
            .filter(Boolean)
            .join(" · ")}
          {item.item_date ? ` · ${formatDate(item.item_date)}` : ""}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {item.status === "pending" ? (
          <>
            <Link
              href={`/app/inbox/${item.id}`}
              className="rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white hover:bg-brand-strong"
            >
              {hasWalls ? "Review & approve" : "Review"}
            </Link>
            <StatusForm item={item} status="hidden" label="Hide" />
            <StatusForm item={item} status="archived" label="Archive" />
          </>
        ) : (
          <>
            {item.published_card_id && item.wall_id ? (
              <Link
                href={`/app/walls/${item.wall_id}`}
                className="rounded-full border border-border px-3 py-1 text-xs font-medium text-brand hover:border-brand/40"
              >
                View on wall
              </Link>
            ) : null}
            {item.status !== "approved" ? (
              <StatusForm item={item} status="pending" label="Restore" />
            ) : null}
          </>
        )}
        <form action={deleteItem}>
          <input type="hidden" name="item_id" value={item.id} />
          <button
            type="submit"
            className="rounded-full border border-border px-3 py-1 text-xs font-medium text-danger transition-colors hover:border-danger/40"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}

export default async function InboxPage() {
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

  const [items, walls] = await Promise.all([
    listSourceItems(workspace.id),
    listWalls(workspace.id),
  ]);
  const pending = items.filter((i) => i.status === "pending");
  const processed = items.filter((i) => i.status !== "pending");
  const hasWalls = walls.length > 0;

  return (
    <div className="cx-container py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted">{workspace.name}</p>
          <h1 className="text-3xl font-semibold tracking-tight">Proof Inbox</h1>
          <p className="mt-1 text-sm text-muted">
            Review incoming proof and approve only the best into a wall.
          </p>
        </div>
        <ButtonLink href="/app/sources" variant="outline">
          Add a source
        </ButtonLink>
      </div>

      {!hasWalls ? (
        <div className="mt-6 rounded-2xl border border-warning/30 bg-[#fff8ef] p-4 text-sm text-[#8a5a00]">
          You don’t have a wall yet. You can still review items, but you’ll need a{" "}
          <Link href="/app/walls/new" className="font-semibold underline">
            wall
          </Link>{" "}
          to approve proof into.
        </div>
      ) : null}

      {items.length === 0 ? (
        <div className="cx-card mt-8 p-10 text-center">
          <p className="text-lg font-semibold">Your inbox is empty</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            Add proof manually or connect an RSS / YouTube source. Imported proof
            arrives here as pending for you to curate.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <ButtonLink href="/app/sources/manual">Add manually</ButtonLink>
            <ButtonLink href="/app/sources" variant="outline">
              Connect a source
            </ButtonLink>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-8 flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Pending {pending.length > 0 ? `(${pending.length})` : ""}
            </h2>
          </div>
          {pending.length === 0 ? (
            <p className="mt-3 text-sm text-muted">Nothing waiting — inbox zero. 🎉</p>
          ) : (
            <div className="cx-card mt-3 divide-y divide-border p-0">
              {pending.map((item) => (
                <ItemRow key={item.id} item={item} hasWalls={hasWalls} />
              ))}
            </div>
          )}

          {processed.length > 0 ? (
            <div className="mt-10">
              <h2 className="text-lg font-semibold">Processed</h2>
              <div className="cx-card mt-3 divide-y divide-border p-0">
                {processed.map((item) => (
                  <ItemRow key={item.id} item={item} hasWalls={hasWalls} />
                ))}
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
