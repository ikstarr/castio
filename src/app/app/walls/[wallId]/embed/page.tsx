import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getOwnedWall } from "@/lib/queries";
import { CopyButton } from "@/components/copy-button";
import { SITE_URL } from "@/lib/env";
import { embedSnippet } from "@/lib/utils";

type Params = { params: Promise<{ wallId: string }> };

export default async function EmbedPage({ params }: Params) {
  await requireUser();
  const { wallId } = await params;
  const wall = await getOwnedWall(wallId);
  if (!wall) notFound();

  const snippet = embedSnippet(wall.id, SITE_URL);
  const publicUrl = `${SITE_URL}/w/${wall.slug}`;
  const embedUrl = `${SITE_URL}/embed/${wall.id}`;
  const isPublished = wall.status === "published";

  return (
    <div className="cx-container max-w-3xl py-10">
      <Link
        href={`/app/walls/${wall.id}`}
        className="text-sm text-muted hover:text-foreground"
      >
        ← Back to {wall.name}
      </Link>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Embed</h1>
      <p className="mt-2 text-sm text-muted">
        Paste this snippet into any website, store or builder. The embed shows
        only approved cards from your published wall.
      </p>

      {!isPublished ? (
        <div className="mt-6 rounded-2xl border border-warning/30 bg-[#fff8ef] p-4 text-sm text-[#8a5a00]">
          This wall isn’t published yet. The embed will go live once you publish
          it from the wall editor.
        </div>
      ) : null}

      {/* Iframe snippet */}
      <div className="cx-card mt-6 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Iframe embed code</h2>
          <CopyButton value={snippet} label="Copy code" />
        </div>
        <pre className="mt-3 overflow-x-auto rounded-xl bg-foreground p-4 text-xs leading-relaxed text-white">
          <code>{snippet}</code>
        </pre>
      </div>

      {/* URLs */}
      <div className="cx-card mt-6 space-y-4 p-6">
        <div>
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold">Public wall URL</p>
              <p className="truncate text-sm text-muted">{publicUrl}</p>
            </div>
            <CopyButton value={publicUrl} />
          </div>
        </div>
        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold">Embed URL</p>
              <p className="truncate text-sm text-muted">{embedUrl}</p>
            </div>
            <CopyButton value={embedUrl} />
          </div>
        </div>
      </div>

      {/* Live preview */}
      <div className="cx-card mt-6 p-6">
        <h2 className="text-sm font-semibold">Live embed preview</h2>
        <p className="mt-1 text-sm text-muted">
          This is the exact iframe your visitors will see.
        </p>
        <div className="mt-4 overflow-hidden rounded-xl border border-border">
          <iframe
            src={embedUrl}
            title="Castio embed preview"
            loading="lazy"
            style={{ width: "100%", border: 0 }}
            height={520}
          />
        </div>
      </div>
    </div>
  );
}
