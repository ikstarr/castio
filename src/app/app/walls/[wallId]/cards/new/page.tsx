import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getOwnedWall } from "@/lib/queries";
import { createCard } from "@/lib/actions";
import { CardFields } from "@/components/card-fields";
import { Button } from "@/components/ui";

type Params = { params: Promise<{ wallId: string }> };

export default async function NewCardPage({ params }: Params) {
  await requireUser();
  const { wallId } = await params;
  const wall = await getOwnedWall(wallId);
  if (!wall) notFound();

  return (
    <div className="cx-container max-w-2xl py-10">
      <Link
        href={`/app/walls/${wall.id}`}
        className="text-sm text-muted hover:text-foreground"
      >
        ← Back to {wall.name}
      </Link>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Add proof card</h1>
      <p className="mt-2 text-sm text-muted">
        Fill in what you have — only the quote or a title is really needed. Set
        status to “Approved” to publish it immediately.
      </p>

      <form action={createCard} className="cx-card mt-8 p-7">
        <input type="hidden" name="wall_id" value={wall.id} />
        <CardFields />
        <div className="mt-6 flex gap-3">
          <Button type="submit">Add card</Button>
          <Link
            href={`/app/walls/${wall.id}`}
            className="inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium text-muted hover:text-foreground"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
