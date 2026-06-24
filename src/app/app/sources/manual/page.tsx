import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { createManualItem } from "@/lib/source-actions";
import { PROOF_TYPES } from "@/lib/constants";
import { Button, Field, Input, Select, Textarea } from "@/components/ui";

const PROOF_DEFAULT: Record<string, string> = {
  testimonial: "testimonial",
  email: "customer_quote",
  screenshot: "screenshot",
  ugc: "ugc",
  founder_update: "founder_update",
  google_reviews: "review",
  yelp: "review",
};
const SOCIAL = [
  "instagram",
  "facebook",
  "x",
  "linkedin",
  "tiktok",
  "reddit",
  "tumblr",
  "behance",
  "flickr",
  "deviantart",
  "vimeo",
  "youtube",
];

type Params = {
  searchParams: Promise<{ type?: string; platform?: string }>;
};

export default async function ManualImportPage({ searchParams }: Params) {
  await requireUser();
  const { type = "", platform = "" } = await searchParams;
  const defaultProof =
    PROOF_DEFAULT[type] ?? (SOCIAL.includes(type) ? "social_post" : "testimonial");

  return (
    <div className="cx-container max-w-2xl py-10">
      <Link href="/app/sources" className="text-sm text-muted hover:text-foreground">
        ← Back to sources
      </Link>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        Add proof manually
      </h1>
      <p className="mt-2 text-sm text-muted">
        New proof lands in your{" "}
        <Link href="/app/inbox" className="font-medium text-brand">
          Proof Inbox
        </Link>{" "}
        as <strong>pending</strong> — nothing publishes until you approve it.
      </p>

      <form action={createManualItem} className="cx-card mt-8 space-y-5 p-7">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Proof type" htmlFor="proof_type">
            <Select id="proof_type" name="proof_type" defaultValue={defaultProof}>
              {PROOF_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.icon} {t.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Source / platform" htmlFor="source_platform" hint="e.g. Instagram, G2, Email">
            <Input
              id="source_platform"
              name="source_platform"
              defaultValue={platform}
              placeholder="Where it came from"
            />
          </Field>
        </div>

        <Field label="Quote / content" htmlFor="content">
          <Textarea id="content" name="content" placeholder="What did they say?" />
        </Field>

        <Field label="Title / headline" htmlFor="title" hint="Optional. Start a review with ★★★★★ to render a rating.">
          <Input id="title" name="title" />
        </Field>

        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Author / customer" htmlFor="author_name">
            <Input id="author_name" name="author_name" />
          </Field>
          <Field label="Handle" htmlFor="author_handle" hint="e.g. @username">
            <Input id="author_handle" name="author_handle" />
          </Field>
          <Field label="Company" htmlFor="company">
            <Input id="company" name="company" />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Source URL" htmlFor="source_url">
            <Input id="source_url" name="source_url" placeholder="https://" />
          </Field>
          <Field label="Date" htmlFor="item_date" hint="Optional">
            <Input id="item_date" name="item_date" type="date" />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Media / image URL" htmlFor="media_url">
            <Input id="media_url" name="media_url" placeholder="https://" />
          </Field>
          <Field label="Avatar URL" htmlFor="avatar_url">
            <Input id="avatar_url" name="avatar_url" placeholder="https://" />
          </Field>
        </div>

        <Field label="Tags" htmlFor="tags" hint="Comma separated">
          <Input id="tags" name="tags" placeholder="onboarding, results" />
        </Field>

        <div className="flex gap-3 pt-2">
          <Button type="submit">Add to inbox</Button>
          <Link
            href="/app/sources"
            className="inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium text-muted hover:text-foreground"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
