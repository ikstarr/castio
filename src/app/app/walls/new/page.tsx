import Link from "next/link";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/queries";
import { createWall } from "@/lib/actions";
import {
  AVAILABLE_LAYOUTS,
  ACCENT_PRESETS,
  DEFAULT_WALL,
} from "@/lib/constants";
import { Button, Field, Input, Select, Textarea } from "@/components/ui";

export default async function NewWallPage() {
  await requireUser();
  const workspace = await getPrimaryWorkspace();
  if (!workspace) redirect("/app");

  return (
    <div className="cx-container max-w-2xl py-10">
      <Link href="/app/walls" className="text-sm text-muted hover:text-foreground">
        ← Back to walls
      </Link>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        New proof wall
      </h1>
      <p className="mt-2 text-sm text-muted">
        Set the basics now — you can fine-tune the design and add cards next.
      </p>

      <form action={createWall} className="cx-card mt-8 space-y-5 p-7">
        <input type="hidden" name="workspace_id" value={workspace.id} />

        <Field label="Wall name" htmlFor="name">
          <Input id="name" name="name" required placeholder="Customer love" autoFocus />
        </Field>

        <Field
          label="URL slug"
          htmlFor="slug"
          hint="Public wall will live at /w/your-slug. Leave blank to auto-generate."
        >
          <Input id="slug" name="slug" placeholder="customer-love" />
        </Field>

        <Field label="Description" htmlFor="description" hint="Optional. Shown on the public wall.">
          <Textarea
            id="description"
            name="description"
            placeholder="What this wall is about"
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Layout" htmlFor="layout">
            <Select id="layout" name="layout" defaultValue={DEFAULT_WALL.layout}>
              {AVAILABLE_LAYOUTS.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Theme" htmlFor="theme_mode">
            <Select
              id="theme_mode"
              name="theme_mode"
              defaultValue={DEFAULT_WALL.theme_mode}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </Select>
          </Field>
        </div>

        <Field label="Accent color" htmlFor="accent_color">
          <div className="flex items-center gap-3">
            <input
              id="accent_color"
              name="accent_color"
              type="color"
              defaultValue={DEFAULT_WALL.accent_color}
              className="h-11 w-16 cursor-pointer rounded-lg border border-border bg-surface"
            />
            <div className="flex flex-wrap gap-1.5">
              {ACCENT_PRESETS.map((c) => (
                <span
                  key={c}
                  className="h-6 w-6 rounded-full border border-border"
                  style={{ background: c }}
                  title={c}
                />
              ))}
            </div>
          </div>
        </Field>

        <div className="flex gap-3 pt-2">
          <Button type="submit">Create wall</Button>
          <Link
            href="/app/walls"
            className="inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium text-muted hover:text-foreground"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
