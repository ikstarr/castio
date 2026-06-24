"use client";

import { useActionState } from "react";
import { createWorkspace, type ActionResult } from "@/lib/actions";
import { Button, Field, Input } from "@/components/ui";

const initial: ActionResult = {};

/**
 * Workspace-creation form. Uses `useActionState` so a failed insert shows a
 * clean inline message instead of crashing the page.
 *
 * `compact` renders the inline row used on the Settings page.
 */
export function CreateWorkspaceForm({
  compact = false,
  autoFocus = false,
}: {
  compact?: boolean;
  autoFocus?: boolean;
}) {
  const [state, formAction, pending] = useActionState(createWorkspace, initial);

  if (compact) {
    return (
      <form action={formAction} className="border-t border-border pt-5">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <Field label="New workspace name" htmlFor="ws-name-compact">
              <Input
                id="ws-name-compact"
                name="name"
                required
                placeholder="Client name"
                disabled={pending}
              />
            </Field>
          </div>
          <Button type="submit" disabled={pending}>
            {pending ? "Creating…" : "Create"}
          </Button>
        </div>
        {state?.error ? (
          <p className="mt-3 rounded-lg bg-[#fdecec] px-3 py-2 text-sm text-danger break-words">
            {state.error}
          </p>
        ) : null}
      </form>
    );
  }

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <Field label="Workspace name" htmlFor="ws-name">
        <Input
          id="ws-name"
          name="name"
          required
          placeholder="Acme Inc"
          autoFocus={autoFocus}
          disabled={pending}
        />
      </Field>
      {state?.error ? (
        <p className="rounded-lg bg-[#fdecec] px-3 py-2 text-sm text-danger break-words">
          {state.error}
        </p>
      ) : null}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Creating…" : "Create workspace"}
      </Button>
    </form>
  );
}
