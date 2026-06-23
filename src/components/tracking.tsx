"use client";

import { useEffect } from "react";
import type { CSSProperties, ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/env";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function trackingEnabled(id: string): boolean {
  // Demo walls use non-UUID ids and never hit the database.
  return isSupabaseConfigured() && UUID_RE.test(id);
}

/** Fires a wall_view once when a public/embed wall mounts. Best-effort. */
export function WallViewTracker({ wallId }: { wallId: string }) {
  useEffect(() => {
    if (!trackingEnabled(wallId)) return;
    const supabase = createClient();
    supabase.rpc("track_wall_view", { p_wall_id: wallId }).then(
      () => {},
      () => {},
    );
  }, [wallId]);
  return null;
}

/**
 * Anchor that records a card or CTA click before navigating. External links
 * open in a new tab so the tracking request can complete.
 */
export function TrackLink({
  kind,
  wallId,
  cardId,
  href,
  className,
  style,
  children,
}: {
  kind: "card" | "cta";
  wallId: string;
  cardId?: string;
  href: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const external = /^https?:\/\//i.test(href);

  function handleClick() {
    if (!trackingEnabled(wallId)) return;
    const supabase = createClient();
    if (kind === "card" && cardId && trackingEnabled(cardId)) {
      supabase.rpc("track_card_click", { p_card_id: cardId }).then(
        () => {},
        () => {},
      );
    } else {
      supabase
        .rpc("track_cta_click", {
          p_wall_id: wallId,
          p_card_id: cardId && UUID_RE.test(cardId) ? cardId : null,
        })
        .then(
          () => {},
          () => {},
        );
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      style={style}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </a>
  );
}
