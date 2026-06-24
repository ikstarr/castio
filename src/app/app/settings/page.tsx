import { requireUser } from "@/lib/auth";
import { listWorkspaces } from "@/lib/queries";
import { Button, ButtonLink } from "@/components/ui";
import { CreateWorkspaceForm } from "@/components/workspace-form";
import { BRAND } from "@/lib/constants";

export default async function SettingsPage() {
  const user = await requireUser();
  const workspaces = await listWorkspaces();

  return (
    <div className="cx-container max-w-2xl py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>

      {/* Account */}
      <section className="cx-card mt-8 p-6">
        <h2 className="text-sm font-semibold">Account</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Email</dt>
            <dd className="font-medium">{user.email}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">User ID</dt>
            <dd className="font-mono text-xs text-muted">{user.id}</dd>
          </div>
        </dl>
        <form action="/logout" method="post" className="mt-5">
          <Button type="submit" variant="outline" size="sm">
            Log out
          </Button>
        </form>
      </section>

      {/* Workspaces */}
      <section className="cx-card mt-6 p-6">
        <h2 className="text-sm font-semibold">Workspaces</h2>
        {workspaces.length === 0 ? (
          <p className="mt-3 text-sm text-muted">No workspaces yet.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {workspaces.map((ws) => (
              <li
                key={ws.id}
                className="flex items-center justify-between rounded-xl border border-border px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium">{ws.name}</p>
                  <p className="text-xs text-muted">/{ws.slug}</p>
                </div>
                <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-medium capitalize text-brand">
                  {ws.plan}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5">
          <CreateWorkspaceForm compact />
        </div>
      </section>

      {/* Plan */}
      <section className="cx-card mt-6 p-6">
        <h2 className="text-sm font-semibold">Plan &amp; billing</h2>
        <p className="mt-2 text-sm text-muted">
          You’re on the free Starter plan. Billing is not yet live during the
          MVP — explore pricing and the lifetime deal below.
        </p>
        <div className="mt-4 flex gap-3">
          <ButtonLink href="/pricing" variant="outline" size="sm">
            View pricing
          </ButtonLink>
          <ButtonLink href="/lifetime" variant="outline" size="sm">
            Lifetime deal
          </ButtonLink>
        </div>
      </section>

      <p className="mt-6 text-center text-xs text-muted">
        Need help? Email{" "}
        <a className="text-brand" href={`mailto:${BRAND.supportEmail}`}>
          {BRAND.supportEmail}
        </a>
      </p>
    </div>
  );
}
