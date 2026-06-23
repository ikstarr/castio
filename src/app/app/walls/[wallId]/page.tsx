import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getOwnedWall, listCards } from "@/lib/queries";
import {
  deleteCard,
  deleteWall,
  setCardStatus,
  setWallStatus,
  updateWall,
} from "@/lib/actions";
import { ProofWall } from "@/components/proof-wall";
import {
  Button,
  ButtonLink,
  Field,
  Input,
  Select,
  StatusPill,
  Textarea,
} from "@/components/ui";
import { AVAILABLE_LAYOUTS, proofTypeIcon, proofTypeLabel } from "@/lib/constants";
import type { CardStatus, ProofCard, Wall } from "@/lib/types";

function StatusButton({
  wallId,
  status,
  label,
  variant,
}: {
  wallId: string;
  status: string;
  label: string;
  variant?: "primary" | "outline";
}) {
  return (
    <form action={setWallStatus}>
      <input type="hidden" name="wall_id" value={wallId} />
      <input type="hidden" name="status" value={status} />
      <Button type="submit" size="sm" variant={variant ?? "outline"}>
        {label}
      </Button>
    </form>
  );
}

function CardStatusForm({
  card,
  wallId,
  status,
  label,
}: {
  card: ProofCard;
  wallId: string;
  status: CardStatus;
  label: string;
}) {
  return (
    <form action={setCardStatus}>
      <input type="hidden" name="card_id" value={card.id} />
      <input type="hidden" name="wall_id" value={wallId} />
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

function WallSettings({ wall }: { wall: Wall }) {
  return (
    <form action={updateWall} className="cx-card space-y-5 p-6">
      <input type="hidden" name="wall_id" value={wall.id} />

      <Field label="Wall name" htmlFor="name">
        <Input id="name" name="name" defaultValue={wall.name} required />
      </Field>

      <Field label="URL slug" htmlFor="slug" hint="Public wall: /w/your-slug">
        <Input id="slug" name="slug" defaultValue={wall.slug} required />
      </Field>

      <Field label="Description" htmlFor="description">
        <Textarea
          id="description"
          name="description"
          defaultValue={wall.description ?? ""}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Layout" htmlFor="layout">
          <Select id="layout" name="layout" defaultValue={wall.layout}>
            {AVAILABLE_LAYOUTS.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Theme" htmlFor="theme_mode">
          <Select id="theme_mode" name="theme_mode" defaultValue={wall.theme_mode}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </Select>
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Accent color" htmlFor="accent_color">
          <input
            id="accent_color"
            name="accent_color"
            type="color"
            defaultValue={wall.accent_color}
            className="h-11 w-full cursor-pointer rounded-lg border border-border bg-surface"
          />
        </Field>
        <Field label="Columns (grid)" htmlFor="column_count">
          <Input
            id="column_count"
            name="column_count"
            type="number"
            min={1}
            max={4}
            defaultValue={wall.column_count}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Card radius (px)" htmlFor="card_radius">
          <Input
            id="card_radius"
            name="card_radius"
            type="number"
            min={0}
            max={40}
            defaultValue={wall.card_radius}
          />
        </Field>
        <Field label="Spacing (px)" htmlFor="spacing">
          <Input
            id="spacing"
            name="spacing"
            type="number"
            min={4}
            max={48}
            defaultValue={wall.spacing}
          />
        </Field>
      </div>

      <fieldset className="space-y-3 rounded-xl border border-border p-4">
        <legend className="px-1 text-sm font-medium">Display options</legend>
        {[
          ["show_source_label", "Show source label", wall.show_source_label],
          ["show_cta_button", "Show CTA button", wall.show_cta_button],
          [
            "show_castio_branding",
            "Show “Powered by Castio”",
            wall.show_castio_branding,
          ],
        ].map(([name, label, checked]) => (
          <label key={name as string} className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              name={name as string}
              defaultChecked={checked as boolean}
              className="h-4 w-4 accent-[var(--brand)]"
            />
            {label as string}
          </label>
        ))}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="CTA label" htmlFor="cta_label">
          <Input
            id="cta_label"
            name="cta_label"
            defaultValue={wall.cta_label ?? ""}
            placeholder="Try it free"
          />
        </Field>
        <Field label="CTA link" htmlFor="cta_url">
          <Input
            id="cta_url"
            name="cta_url"
            defaultValue={wall.cta_url ?? ""}
            placeholder="https://yoursite.com/signup"
          />
        </Field>
      </div>

      <Button type="submit">Save changes</Button>
    </form>
  );
}

type Params = { params: Promise<{ wallId: string }> };

export default async function WallEditorPage({ params }: Params) {
  await requireUser();
  const { wallId } = await params;
  const wall = await getOwnedWall(wallId);
  if (!wall) notFound();

  const cards = await listCards(wallId);
  const approved = cards.filter((c) => c.status === "approved");

  return (
    <div className="cx-container py-8">
      <Link href="/app/walls" className="text-sm text-muted hover:text-foreground">
        ← Back to walls
      </Link>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">{wall.name}</h1>
          <StatusPill status={wall.status} />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {wall.status !== "published" ? (
            <StatusButton
              wallId={wall.id}
              status="published"
              label="Publish"
              variant="primary"
            />
          ) : (
            <StatusButton wallId={wall.id} status="draft" label="Unpublish" />
          )}
          {wall.status !== "archived" ? (
            <StatusButton wallId={wall.id} status="archived" label="Archive" />
          ) : null}
          <ButtonLink
            href={`/app/walls/${wall.id}/embed`}
            size="sm"
            variant="outline"
          >
            Embed
          </ButtonLink>
          {wall.status === "published" ? (
            <ButtonLink
              href={`/w/${wall.slug}`}
              size="sm"
              variant="outline"
              target="_blank"
            >
              View ↗
            </ButtonLink>
          ) : null}
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <WallSettings wall={wall} />

        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-2 text-sm font-medium text-muted">
            Preview · approved cards
          </p>
          <div className="cx-card p-4">
            <ProofWall data={{ wall, cards: approved }} />
          </div>
        </div>
      </div>

      {/* Cards management */}
      <div className="mt-12">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Proof cards</h2>
            <p className="text-sm text-muted">
              {approved.length} approved · {cards.length} total. Only approved
              cards on a published wall appear publicly.
            </p>
          </div>
          <ButtonLink href={`/app/walls/${wall.id}/cards/new`}>
            Add card
          </ButtonLink>
        </div>

        {cards.length === 0 ? (
          <div className="cx-card mt-4 p-10 text-center">
            <p className="text-base font-semibold">No proof cards yet</p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
              Add your first testimonial, review or screenshot to start building
              this wall.
            </p>
            <ButtonLink
              href={`/app/walls/${wall.id}/cards/new`}
              className="mt-5"
            >
              Add your first card
            </ButtonLink>
          </div>
        ) : (
          <div className="cx-card mt-4 divide-y divide-border p-0">
            {cards.map((card) => (
              <div
                key={card.id}
                className="flex flex-wrap items-start justify-between gap-4 p-5"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span aria-hidden>{proofTypeIcon(card.proof_type)}</span>
                    <span className="text-xs font-medium text-muted">
                      {proofTypeLabel(card.proof_type)}
                    </span>
                    <StatusPill status={card.status} />
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm">
                    {card.title ? (
                      <span className="font-semibold">{card.title} </span>
                    ) : null}
                    {card.quote_or_caption}
                  </p>
                  {(card.person_name || card.company) && (
                    <p className="mt-1 text-xs text-muted">
                      {[card.person_name, card.person_role, card.company]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {card.status !== "approved" ? (
                    <CardStatusForm
                      card={card}
                      wallId={wall.id}
                      status="approved"
                      label="Approve"
                    />
                  ) : null}
                  {card.status !== "hidden" ? (
                    <CardStatusForm
                      card={card}
                      wallId={wall.id}
                      status="hidden"
                      label="Hide"
                    />
                  ) : null}
                  {card.status !== "archived" ? (
                    <CardStatusForm
                      card={card}
                      wallId={wall.id}
                      status="archived"
                      label="Archive"
                    />
                  ) : null}
                  <Link
                    href={`/app/walls/${wall.id}/cards/${card.id}`}
                    className="rounded-full border border-border px-3 py-1 text-xs font-medium text-brand transition-colors hover:border-brand/40"
                  >
                    Edit
                  </Link>
                  <form action={deleteCard}>
                    <input type="hidden" name="card_id" value={card.id} />
                    <input type="hidden" name="wall_id" value={wall.id} />
                    <button
                      type="submit"
                      className="rounded-full border border-border px-3 py-1 text-xs font-medium text-danger transition-colors hover:border-danger/40"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Danger zone */}
      <div className="mt-12 rounded-2xl border border-danger/20 bg-[#fdf4f4] p-6">
        <h2 className="text-sm font-semibold text-danger">Danger zone</h2>
        <p className="mt-1 text-sm text-muted">
          Deleting a wall removes it and all its cards permanently.
        </p>
        <form action={deleteWall} className="mt-4">
          <input type="hidden" name="wall_id" value={wall.id} />
          <Button type="submit" variant="danger" size="sm">
            Delete this wall
          </Button>
        </form>
      </div>
    </div>
  );
}
