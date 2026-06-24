import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { createYoutubeSource } from "@/lib/source-actions";
import { Button, Field, Input } from "@/components/ui";

export default async function YoutubeSourcePage() {
  await requireUser();
  return (
    <div className="cx-container max-w-xl py-10">
      <Link href="/app/sources" className="text-sm text-muted hover:text-foreground">
        ← Back to sources
      </Link>
      <div className="mt-3 flex items-center gap-2">
        <span className="text-2xl" aria-hidden>
          ▶️
        </span>
        <h1 className="text-3xl font-semibold tracking-tight">Connect a YouTube channel</h1>
      </div>
      <p className="mt-2 text-sm text-muted">
        Uses YouTube’s public channel feed — <strong>no OAuth or API key</strong>.
        Recent public videos land in your Proof Inbox as pending.
      </p>

      <form action={createYoutubeSource} className="cx-card mt-8 space-y-5 p-7">
        <Field
          label="Channel URL, @handle, playlist or feed URL"
          htmlFor="channel"
          hint="e.g. youtube.com/@channel, a channel/playlist URL, or a videos.xml feed URL"
        >
          <Input
            id="channel"
            name="channel"
            required
            placeholder="https://www.youtube.com/@yourchannel"
            autoFocus
          />
        </Field>
        <Field label="Source name" htmlFor="name">
          <Input id="name" name="name" placeholder="Our YouTube" />
        </Field>
        <Field label="Default tags" htmlFor="default_tags" hint="Optional, comma separated">
          <Input id="default_tags" name="default_tags" placeholder="demo, walkthrough" />
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

      <p className="mt-4 text-xs text-muted">
        If a handle can’t be resolved, paste the channel’s RSS feed URL
        (youtube.com/feeds/videos.xml?channel_id=…) directly.
      </p>
    </div>
  );
}
