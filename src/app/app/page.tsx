import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace, listWalls } from "@/lib/queries";
import { ButtonLink, StatusPill } from "@/components/ui";
import { CreateWorkspaceForm } from "@/components/workspace-form";

export default async function DashboardPage() {
  await requireUser();
  const workspace = await getPrimaryWorkspace();

  // First-run: no workspace yet → onboarding.
  if (!workspace) {
    return (
      <div className="cx-container max-w-lg py-16">
        <div className="cx-card p-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create your workspace
          </h1>
          <p className="mt-2 text-sm text-muted">
            A workspace holds your proof walls. Name it after your brand,
            product or client.
          </p>
          <CreateWorkspaceForm autoFocus />
        </div>
      </div>
    );
  }

  const walls = await listWalls(workspace.id);
  const published = walls.filter((w) => w.status === "published").length;
  const totalViews = walls.reduce((sum, w) => sum + (w.view_count ?? 0), 0);
  const totalCtaClicks = walls.reduce(
    (sum, w) => sum + (w.cta_click_count ?? 0),
    0,
  );

  const stats = [
    { label: "Proof walls", value: walls.length, icon: "▦" },
    { label: "Published", value: published, icon: "✓" },
    { label: "Wall views", value: totalViews, icon: "◉" },
    { label: "CTA clicks", value: totalCtaClicks, icon: "↗" },
  ];

  return (
    <div className="cx-container py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted">{workspace.name}</p>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        </div>
        <ButtonLink href="/app/walls/new">New proof wall</ButtonLink>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="cx-card flex items-center gap-3.5 p-5">
            <span
              className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-brand-soft text-brand"
              aria-hidden
            >
              {s.icon}
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                {s.label}
              </p>
              <p className="text-2xl font-semibold tracking-tight">
                {s.value.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Your walls</h2>
        <Link href="/app/walls" className="text-sm font-medium text-brand">
          View all →
        </Link>
      </div>

      {walls.length === 0 ? (
        <div className="cx-card mt-4 p-10 text-center">
          <p className="text-lg font-semibold">No walls yet</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            Create your first proof wall, add a few cards, approve them, and
            embed it anywhere. It takes about five minutes.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <ButtonLink href="/app/walls/new">Create a wall</ButtonLink>
            <ButtonLink href="/demo" variant="outline">
              See an example
            </ButtonLink>
          </div>
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {walls.slice(0, 6).map((wall) => (
            <Link
              key={wall.id}
              href={`/app/walls/${wall.id}`}
              className="cx-card cx-card-i flex flex-col p-5"
            >
              <div className="flex items-center justify-between">
                <StatusPill status={wall.status} />
                <span className="text-xs text-muted">
                  {wall.view_count.toLocaleString()} views
                </span>
              </div>
              <p className="mt-3 text-base font-semibold">{wall.name}</p>
              <p className="mt-1 line-clamp-2 text-sm text-muted">
                {wall.description ?? "No description"}
              </p>
              <span className="mt-4 text-sm font-medium text-brand">
                Edit wall →
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
