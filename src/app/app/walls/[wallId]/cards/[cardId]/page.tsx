import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getCard, getOwnedWall } from "@/lib/queries";
import { deleteCard, updateCard } from "@/lib/actions";
import { CardFields } from "@/components/card-fields";
import { Button } from "@/components/ui";

type Params = { params: Promise<{ wallId: string; cardId: string }> };

export default async function EditCardPage({ params }: Params) {
  await requireUser();
  const { wallId, cardId } = await params;
  const wall = await getOwnedWall(wallId);
  if (!wall) notFound();
  const card = await getCard(cardId);
  if (!card || card.wall_id !== wallId) notFound();

  return (
    <div className="cx-container max-w-2xl py-10">
      <Link
        href={`/app/walls/${wall.id}`}
        className="text-sm text-muted hover:text-foreground"
      >
        ← Back to {wall.name}
      </Link>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Edit proof card</h1>

      <form action={updateCard} className="cx-card mt-8 p-7">
        <input type="hidden" name="wall_id" value={wall.id} />
        <input type="hidden" name="card_id" value={card.id} />
        <CardFields card={card} />
        <div className="mt-6 flex gap-3">
          <Button type="submit">Save card</Button>
          <Link
            href={`/app/walls/${wall.id}`}
            className="inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium text-muted hover:text-foreground"
          >
            Cancel
          </Link>
        </div>
      </form>

      <form action={deleteCard} className="mt-6">
        <input type="hidden" name="card_id" value={card.id} />
        <input type="hidden" name="wall_id" value={wall.id} />
        <Button type="submit" variant="danger" size="sm">
          Delete card
        </Button>
      </form>
    </div>
  );
}
