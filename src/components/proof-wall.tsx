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

  const image = card.screenshot_url || (card.proof_type !== "video" && card.media_url);

  return (
    <article className="castio-proof-card">
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {(card.person_name || card.avatar_url) && <Avatar card={card} />}
          <div className="min-w-0">
            {card.person_name ? (
              <p className="text-sm font-semibold leading-tight">
                {card.person_name}
              </p>
            ) : null}
            {(card.person_role || card.company) && (
              <p className="castio-muted text-xs leading-tight">
                {[card.person_role, card.company].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
        </div>
        <span
          className="castio-muted shrink-0 text-[11px] font-medium"
          title={proofTypeLabel(card.proof_type)}
        >
          {proofTypeIcon(card.proof_type)}
        </span>
      </header>

      {isRating ? (
        <p style={{ color: wall.accent_color }} className="text-sm font-semibold">
          {card.title}
        </p>
      ) : card.title ? (
        <p className="text-base font-semibold leading-snug">{card.title}</p>
      ) : null}

      {card.quote_or_caption ? (
        <p className="text-[15px] leading-relaxed">{card.quote_or_caption}</p>
      ) : null}

      {image ? (
        <img
          src={image as string}
          alt={card.title ?? "Proof"}
          className="w-full rounded-lg border"
          style={{ borderColor: "var(--wall-border)" }}
        />
      ) : null}

      {card.proof_type === "video" && card.media_url ? (
        <a
          href={card.media_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium"
          style={{ color: wall.accent_color }}
        >
          ▶ Watch video
        </a>
      ) : null}

      {(showSource || showCardCta) && (
        <footer className="mt-auto flex items-center justify-between gap-3 pt-1">
          {showSource ? (
            card.source_url ? (
              <a
                href={card.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="castio-muted text-xs hover:underline"
              >
                via {card.source_platform}
              </a>
            ) : (
              <span className="castio-muted text-xs">
                via {card.source_platform}
              </span>
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
                className="text-xs font-semibold hover:underline"
              >
                {card.cta_label} →
              </TrackLink>
            ) : (
              <span
                className="text-xs font-semibold"
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
      <div className="p-1">
        {cards.length === 0 ? (
          <div className="castio-muted rounded-xl border border-dashed py-16 text-center text-sm">
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
          <div className="mt-6 text-center">
            {interactive ? (
              <TrackLink
                kind="cta"
                wallId={wall.id}
                href={wall.cta_url}
                className="inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-semibold text-white shadow-sm"
                style={{ background: wall.accent_color }}
              >
                {wall.cta_label}
              </TrackLink>
            ) : (
              <span
                className="inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-semibold text-white shadow-sm"
                style={{ background: wall.accent_color }}
              >
                {wall.cta_label}
              </span>
            )}
          </div>
        ) : null}

        {wall.show_castio_branding ? (
          <p className="castio-muted mt-6 text-center text-xs">
            Powered by{" "}
            <a
              href="https://castio.co"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              Castio
            </a>
          </p>
        ) : null}
      </div>
    </div>
  );
}
