import type { CSSProperties } from "react";
import type { ProofCard, Wall, WallWithCards } from "@/lib/types";
import { proofTypeIcon, proofTypeLabel } from "@/lib/constants";
import { initials } from "@/lib/utils";
import { TrackLink } from "@/components/tracking";

function Avatar({ card }: { card: ProofCard }) {
  return (
    <span className="castio-avatar" aria-hidden>
      {card.avatar_url ? (
        <img src={card.avatar_url} alt="" />
      ) : (
        initials(card.person_name)
      )}
    </span>
  );
}

function Rating({ title }: { title: string }) {
  const stars = title.match(/^★+/)?.[0] ?? "";
  const rest = title.slice(stars.length).trim();
  return (
    <p className="leading-snug">
      <span className="castio-stars" style={{ color: "var(--gold)" }}>
        {stars}
      </span>
      {rest ? (
        <span className="ml-1.5 text-[15px] font-semibold">{rest}</span>
      ) : null}
    </p>
  );
}

function ProofCardView({
  card,
  wall,
  interactive,
}: {
  card: ProofCard;
  wall: Wall;
  interactive: boolean;
}) {
  const isRating = (card.title ?? "").trim().startsWith("★");
  const showSource = wall.show_source_label && card.source_platform;
  const showCardCta = wall.show_cta_button && card.cta_url && card.cta_label;
  const hasIdentity = card.person_name || card.avatar_url;
  const image =
    card.screenshot_url || (card.proof_type !== "video" && card.media_url);

  return (
    <article className="castio-proof-card">
      <header className="flex items-start justify-between gap-2">
        {hasIdentity ? (
          <div className="flex min-w-0 items-center gap-3">
            <Avatar card={card} />
            <div className="min-w-0">
              {card.person_name ? (
                <p className="truncate text-sm font-semibold leading-tight">
                  {card.person_name}
                </p>
              ) : null}
              {(card.person_role || card.company) && (
                <p className="castio-muted truncate text-xs leading-tight">
                  {[card.person_role, card.company].filter(Boolean).join(" · ")}
                </p>
              )}
            </div>
          </div>
        ) : (
          <span />
        )}
        <span className="castio-typechip" title={proofTypeLabel(card.proof_type)}>
          <span aria-hidden>{proofTypeIcon(card.proof_type)}</span>
          {proofTypeLabel(card.proof_type)}
        </span>
      </header>

      {isRating ? (
        <Rating title={card.title ?? ""} />
      ) : card.title ? (
        <p className="text-base font-semibold leading-snug">{card.title}</p>
      ) : null}

      {card.quote_or_caption ? (
        <p className="castio-quote">{card.quote_or_caption}</p>
      ) : null}

      {image ? (
        <img
          src={image as string}
          alt={card.title ?? "Proof"}
          className="w-full rounded-xl border"
          style={{ borderColor: "var(--wall-border)" }}
        />
      ) : null}

      {card.proof_type === "video" && card.media_url ? (
        <a
          href={card.media_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold"
          style={{ color: wall.accent_color }}
        >
          <span aria-hidden>▶</span> Watch video
        </a>
      ) : null}

      {card.tags && card.tags.length > 0 ? (
        <div className="castio-tags">
          {card.tags.slice(0, 4).map((t) => (
            <span key={t} className="castio-tag">
              #{t}
            </span>
          ))}
        </div>
      ) : null}

      {(showSource || showCardCta) && (
        <footer className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
          {showSource ? (
            card.source_url ? (
              <a
                href={card.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="castio-source hover:opacity-80"
              >
                {card.source_platform}
              </a>
            ) : (
              <span className="castio-source">{card.source_platform}</span>
            )
          ) : (
            <span />
          )}
          {showCardCta ? (
            interactive ? (
              <TrackLink
                kind="cta"
                wallId={wall.id}
                cardId={card.id}
                href={card.cta_url!}
                className="castio-cardcta hover:underline"
                style={{ color: wall.accent_color }}
              >
                {card.cta_label} →
              </TrackLink>
            ) : (
              <span
                className="castio-cardcta"
                style={{ color: wall.accent_color }}
              >
                {card.cta_label} →
              </span>
            )
          ) : null}
        </footer>
      )}
    </article>
  );
}

export function ProofWall({
  data,
  interactive = false,
}: {
  data: WallWithCards;
  interactive?: boolean;
}) {
  const { wall, cards } = data;
  const style = {
    "--wall-accent": wall.accent_color,
    "--wall-radius": `${wall.card_radius}px`,
    "--wall-gap": `${wall.spacing}px`,
    "--cols": wall.column_count,
  } as CSSProperties;

  const containerClass =
    wall.layout === "compact_list" ? "castio-list" : "castio-grid";

  return (
    <div className="castio-wall" data-theme={wall.theme_mode} style={style}>
      <div className="p-0.5">
        {cards.length === 0 ? (
          <div
            className="castio-muted rounded-2xl border border-dashed py-16 text-center text-sm"
            style={{ borderColor: "var(--wall-border)" }}
          >
            No approved proof yet.
          </div>
        ) : (
          <div className={containerClass}>
            {cards.map((card) => (
              <ProofCardView
                key={card.id}
                card={card}
                wall={wall}
                interactive={interactive}
              />
            ))}
          </div>
        )}

        {wall.show_cta_button && wall.cta_url && wall.cta_label ? (
          <div className="mt-7 text-center">
            {interactive ? (
              <TrackLink
                kind="cta"
                wallId={wall.id}
                href={wall.cta_url}
                className="inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
                style={{ background: wall.accent_color }}
              >
                {wall.cta_label}
              </TrackLink>
            ) : (
              <span
                className="inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-semibold text-white shadow-sm"
                style={{ background: wall.accent_color }}
              >
                {wall.cta_label}
              </span>
            )}
          </div>
        ) : null}

        {wall.show_castio_branding ? (
          <p className="castio-muted mt-6 flex items-center justify-center gap-1.5 text-center text-xs">
            <span
              className="inline-block h-3 w-3 rounded-[5px]"
              style={{ background: wall.accent_color, opacity: 0.85 }}
              aria-hidden
            />
            Powered by{" "}
            <a
              href="https://castio.co"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              Castio
            </a>
          </p>
        ) : null}
      </div>
    </div>
  );
}
