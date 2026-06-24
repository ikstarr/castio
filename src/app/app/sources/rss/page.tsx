import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { createRssSource } from "@/lib/source-actions";
import { Button, Field, Input } from "@/components/ui";

export default async function RssSourcePage() {
  await requireUser();
  return (
    <div className="cx-container max-w-xl py-10">
      <Link href="/app/sources" className="text-sm text-muted hover:text-foreground">
        ← Back to sources
      </Link>
      <div className="mt-3 flex items-center gap-2">
        <span className="text-2xl" aria-hidden>
          📡
        </span>
        <h1 className="text-3xl font-semibold tracking-tight">Connect an RSS feed</h1>
      </div>
      <p className="mt-2 text-sm text-muted">
        We’ll fetch the most recent items and add them to your Proof Inbox as
        <strong> pending</strong>. Nothing publishes until you approve it.
      </p>

      <form action={createRssSource} className="cx-card mt-8 space-y-5 p-7">
        <Field label="RSS / Atom feed URL" htmlFor="feed_url">
          <Input
            id="feed_url"
            name="feed_url"
            type="url"
            required
            placeholder="https://example.com/feed.xml"
            autoFocus
          />
        </Field>
        <Field label="Source name" htmlFor="name" hint="How it shows in your sources list">
          <Input id="name" name="name" placeholder="Company blog" />
        </Field>
        <Field label="Default tags" htmlFor="default_tags" hint="Optional, comma separated — applied to imported items">
          <Input id="default_tags" name="default_tags" placeholder="press, blog" />
        </Field>
        <div className="flex gap-3 pt-2">
          <Button type="submit">Connect &amp; import</Button>
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
