import { Field, Input, Select, Textarea } from "@/components/ui";
import { PROOF_TYPES } from "@/lib/constants";
import type { ProofCard } from "@/lib/types";

/** Shared form fields for creating and editing a proof card. */
export function CardFields({ card }: { card?: ProofCard }) {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Proof type" htmlFor="proof_type">
          <Select
            id="proof_type"
            name="proof_type"
            defaultValue={card?.proof_type ?? "testimonial"}
          >
            {PROOF_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.icon} {t.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Status" htmlFor="status">
          <Select id="status" name="status" defaultValue={card?.status ?? "draft"}>
            <option value="draft">Draft</option>
            <option value="approved">Approved</option>
            <option value="hidden">Hidden</option>
            <option value="archived">Archived</option>
          </Select>
        </Field>
      </div>

      <Field
        label="Title / headline"
        htmlFor="title"
        hint="Optional. For reviews, start with ★★★★★ to render a rating."
      >
        <Input id="title" name="title" defaultValue={card?.title ?? ""} />
      </Field>

      <Field label="Quote / caption" htmlFor="quote_or_caption">
        <Textarea
          id="quote_or_caption"
          name="quote_or_caption"
          defaultValue={card?.quote_or_caption ?? ""}
          placeholder="What did they say?"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Person name" htmlFor="person_name">
          <Input
            id="person_name"
            name="person_name"
            defaultValue={card?.person_name ?? ""}
          />
        </Field>
        <Field label="Role" htmlFor="person_role">
          <Input
            id="person_role"
            name="person_role"
            defaultValue={card?.person_role ?? ""}
          />
        </Field>
        <Field label="Company" htmlFor="company">
          <Input id="company" name="company" defaultValue={card?.company ?? ""} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Source platform" htmlFor="source_platform" hint="e.g. G2, X, Email">
          <Input
            id="source_platform"
            name="source_platform"
            defaultValue={card?.source_platform ?? ""}
          />
        </Field>
        <Field label="Source URL" htmlFor="source_url">
          <Input
            id="source_url"
            name="source_url"
            defaultValue={card?.source_url ?? ""}
            placeholder="https://"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Avatar URL" htmlFor="avatar_url">
          <Input
            id="avatar_url"
            name="avatar_url"
            defaultValue={card?.avatar_url ?? ""}
            placeholder="https://"
          />
        </Field>
        <Field label="Media URL" htmlFor="media_url" hint="Image or video link">
          <Input
            id="media_url"
            name="media_url"
            defaultValue={card?.media_url ?? ""}
            placeholder="https://"
          />
        </Field>
        <Field label="Screenshot URL" htmlFor="screenshot_url">
          <Input
            id="screenshot_url"
            name="screenshot_url"
            defaultValue={card?.screenshot_url ?? ""}
            placeholder="https://"
          />
        </Field>
      </div>

      <Field
        label="Embed code"
        htmlFor="embed_code"
        hint="Optional. Paste a raw embed snippet (stored for future rendering)."
      >
        <Textarea
          id="embed_code"
          name="embed_code"
          defaultValue={card?.embed_code ?? ""}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Card CTA label" htmlFor="cta_label">
          <Input
            id="cta_label"
            name="cta_label"
            defaultValue={card?.cta_label ?? ""}
          />
        </Field>
        <Field label="Card CTA link" htmlFor="cta_url">
          <Input
            id="cta_url"
            name="cta_url"
            defaultValue={card?.cta_url ?? ""}
            placeholder="https://"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Tags" htmlFor="tags" hint="Comma separated">
          <Input
            id="tags"
            name="tags"
            defaultValue={card?.tags?.join(", ") ?? ""}
            placeholder="enterprise, onboarding"
          />
        </Field>
        <Field label="Sort order" htmlFor="sort_order" hint="Lower shows first">
          <Input
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={card?.sort_order ?? 0}
          />
        </Field>
      </div>
    </div>
  );
}
