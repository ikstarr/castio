import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { ProofWall } from "@/components/proof-wall";
import { WallViewTracker } from "@/components/tracking";
import { getPublicWallBySlug } from "@/lib/walls";

type Params = { params: Promise<{ wallSlug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { wallSlug } = await params;
  const data = await getPublicWallBySlug(wallSlug);
  if (!data) return { title: "Wall not found" };
  return {
    title: data.wall.name,
    description:
      data.wall.description ?? `Proof wall — ${data.wall.name} on Castio.`,
    alternates: { canonical: `/w/${data.wall.slug}` },
  };
}

export default async function PublicWallPage({ params }: Params) {
  const { wallSlug } = await params;
  const data = await getPublicWallBySlug(wallSlug);
  if (!data) notFound();

  const dark = data.wall.theme_mode === "dark";
  const pageStyle = {
    background: dark ? "#0c0c11" : "#fbfbfd",
    color: dark ? "#f4f4f6" : "#0d0d12",
  } as CSSProperties;

  return (
    <div className="flex min-h-screen flex-col" style={pageStyle}>
      <WallViewTracker wallId={data.wall.id} />
      <header
        className="border-b"
        style={{ borderColor: dark ? "#262630" : "#e8e8ef" }}
      >
        <div className="cx-container flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
            <span
              className="grid h-6 w-6 place-items-center rounded-[7px] text-white"
              style={{ background: data.wall.accent_color }}
              aria-hidden
            >
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none">
                <path
                  d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v7A2.5 2.5 0 0 1 16.5 16H10l-4 3.5V16H7.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            Castio
          </Link>
          <Link
            href="/signup"
            className="rounded-full px-4 py-2 text-xs font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
            style={{ background: data.wall.accent_color }}
          >
            Build your own
          </Link>
        </div>
      </header>

      <main className="cx-container flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p
              className="text-xs font-semibold uppercase tracking-[0.14em]"
              style={{ color: data.wall.accent_color }}
            >
              Wall of proof
            </p>
            <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {data.wall.name}
            </h1>
            {data.wall.description ? (
              <p className="mx-auto mt-3 max-w-2xl text-pretty opacity-70">
                {data.wall.description}
              </p>
            ) : null}
          </div>
          <div className="mt-10">
            <ProofWall data={data} interactive />
          </div>
        </div>
      </main>

      <footer className="cx-container py-8 text-center text-xs opacity-60">
        <Link href="/" className="hover:underline">
          Powered by Castio — build your own proof wall
        </Link>
      </footer>
    </div>
  );
}
