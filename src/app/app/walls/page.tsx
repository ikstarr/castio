import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace, listWalls } from "@/lib/queries";
import { ButtonLink, StatusPill } from "@/components/ui";

export default async function WallsPage() {
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

  const walls = await listWalls(workspace.id);

  return (
    <div className="cx-container py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted">{workspace.name}</p>
          <h1 className="text-3xl font-semibold tracking-tight">Proof walls</h1>
        </div>
        <ButtonLink href="/app/walls/new">New proof wall</ButtonLink>
      </div>

      {walls.length === 0 ? (
        <div className="cx-card mt-8 p-10 text-center">
          <p className="text-lg font-semibold">No walls yet</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            Your proof walls will show up here once you create one.
          </p>
          <ButtonLink href="/app/walls/new" className="mt-6">
            Create your first wall
          </ButtonLink>
        </div>
      ) : (
        <div className="cx-card mt-8 divide-y divide-border p-0">
          {walls.map((wall) => (
            <div
              key={wall.id}
              className="flex flex-wrap items-center justify-between gap-4 p-5"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <Link
                    href={`/app/walls/${wall.id}`}
                    className="truncate text-base font-semibold hover:text-brand"
                  >
                    {wall.name}
                  </Link>
                  <StatusPill status={wall.status} />
                </div>
                <p className="mt-1 text-sm text-muted">
                  /{wall.slug} · {wall.view_count.toLocaleString()} views ·{" "}
                  {wall.cta_click_count.toLocaleString()} CTA clicks
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium">
                <Link href={`/app/walls/${wall.id}`} className="text-brand">
                  Edit
                </Link>
                <Link
                  href={`/app/walls/${wall.id}/embed`}
                  className="text-muted hover:text-foreground"
                >
                  Embed
                </Link>
                {wall.status === "published" ? (
                  <Link
                    href={`/w/${wall.slug}`}
                    className="text-muted hover:text-foreground"
                    target="_blank"
                  >
                    View ↗
                  </Link>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
