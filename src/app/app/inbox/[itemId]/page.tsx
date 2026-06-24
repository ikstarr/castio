import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace, listWalls } from "@/lib/queries";
import { getSourceItem } from "@/lib/source-queries";
import { updateItem, approveItem } from "@/lib/source-actions";
import { PROOF_TYPES } from "@/lib/constants";
import { Button, Field, Input, Select, Textarea } from "@/components/ui";

type Params = { params: Promise<{ itemId: string }> };

export default async function InboxItemPage({ params }: Params) {
  await requireUser();
  const { itemId } = await params;
  const workspace = await getPrimaryWorkspace();
  if (!workspace) notFound();
  const item = await getSourceItem(itemId);
  if (!item || item.workspace_id !== workspace.id) notFound();
  const walls = await listWalls(workspace.id);

  return (
    <div className="cx-container max-w-2xl py-10">
      <Link href="/app/inbox" className="text-sm text-muted hover:text-foreground">
        ← Back to inbox
      </Link>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Review proof</h1>
      <p className="mt-2 text-sm text-muted">
        Edit the copy, then save it as a draft or approve it straight into a wall
        as a proof card.
      </p>

      {item.source_url ? (
        <p className="mt-3 text-sm">
          <a
            href={item.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand underline"
          >
            View original source ↗
          </a>
        </p>
      ) : null}

      <form action={updateItem} className="cx-card mt-8 space-y-5 p-7">
        <input type="hidden" name="item_id" value={item.id} />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Proof type" htmlFor="proof_type">
            <Select id="proof_type" name="proof_type" defaultValue={item.proof_type}>
              {PROOF_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.icon} {t.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Source / platform" htmlFor="source_platform">
            <Input
              id="source_platform"
              name="source_platform"
              defaultValue={item.source_platform ?? ""}
            />
          </Field>
        </div>

        <Field label="Quote / content" htmlFor="content">
          <Textarea id="content" name="content" defaultValue={item.content ?? ""} />
        </Field>

        <Field label="Title / headline" htmlFor="title">
          <Input id="title" name="title" defaultValue={item.title ?? ""} />
        </Field>

        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Author / customer" htmlFor="author_name">
            <Input id="author_name" name="author_name" defaultValue={item.author_name ?? ""} />
          </Field>
          <Field label="Handle / role" htmlFor="author_handle">
            <Input id="author_handle" name="author_handle" defaultValue={item.author_handle ?? ""} />
          </Field>
          <Field label="Company" htmlFor="company">
            <Input id="company" name="company" defaultValue={item.company ?? ""} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Media / image URL" htmlFor="media_url">
            <Input id="media_url" name="media_url" defaultValue={item.media_url ?? ""} placeholder="https://" />
          </Field>
          <Field label="Avatar URL" htmlFor="avatar_url">
            <Input id="avatar_url" name="avatar_url" defaultValue={item.avatar_url ?? ""} placeholder="https://" />
          </Field>
        </div>

        <Field label="Source URL" htmlFor="source_url">
          <Input id="source_url" name="source_url" defaultValue={item.source_url ?? ""} placeholder="https://" />
        </Field>

        <Field label="Tags" htmlFor="tags" hint="Comma separated">
          <Input id="tags" name="tags" defaultValue={item.tags?.join(", ") ?? ""} />
        </Field>

        {/* Approve controls */}
        <div className="rounded-xl border border-border bg-surface-muted/40 p-5">
          <p className="text-sm font-semibold">Approve into a wall</p>
          <div className="mt-3 grid gap-5 sm:grid-cols-2">
            <Field label="Wall" htmlFor="wall_id">
              <Select id="wall_id" name="wall_id" defaultValue={walls[0]?.id ?? ""}>
                {walls.length === 0 ? (
                  <option value="">No walls yet</option>
                ) : (
                  walls.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name}
                    </option>
                  ))
                )}
              </Select>
            </Field>
            <Field label="CTA label" htmlFor="cta_label" hint="Optional">
              <Input id="cta_label" name="cta_label" placeholder="Try it free" />
            </Field>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="CTA link" htmlFor="cta_url" hint="Optional">
              <Input id="cta_url" name="cta_url" placeholder="https://" />
            </Field>
            <label className="flex items-center gap-3 self-end pb-2.5 text-sm">
              <input type="checkbox" name="is_pinned" className="h-4 w-4 accent-[var(--brand)]" />
              Pin to top of wall
            </label>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-1">
          <Button type="submit" formAction={approveItem} disabled={walls.length === 0}>
            Approve to wall
          </Button>
          <Button type="submit" variant="outline">
            Save draft
          </Button>
          {walls.length === 0 ? (
            <Link
              href="/app/walls/new"
              className="inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium text-brand"
            >
              Create a wall first
            </Link>
          ) : null}
        </div>
      </form>
    </div>
  );
}
