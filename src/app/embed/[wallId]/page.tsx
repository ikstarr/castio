import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { ProofWall } from "@/components/proof-wall";
import { WallViewTracker } from "@/components/tracking";
import { getPublicWallById } from "@/lib/walls";

type Params = { params: Promise<{ wallId: string }> };

// The embed renders only the wall — no marketing chrome — so it sits cleanly
// inside a host site's iframe. Framing is allowed via headers in next.config.ts.
export default async function EmbedPage({ params }: Params) {
  const { wallId } = await params;
  const data = await getPublicWallById(wallId);
  if (!data) notFound();

  const dark = data.wall.theme_mode === "dark";
  const style = {
    background: dark ? "#0c0c11" : "transparent",
  } as CSSProperties;

  return (
    <div className="min-h-screen p-4" style={style}>
      <WallViewTracker wallId={data.wall.id} />
      <ProofWall data={data} interactive />
    </div>
  );
}
