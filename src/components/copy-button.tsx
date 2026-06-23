"use client";

import { useState } from "react";
import { buttonClasses } from "@/components/ui";

export function CopyButton({
  value,
  label = "Copy",
  size = "sm",
}: {
  value: string;
  label?: string;
  size?: "sm" | "md";
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — no-op.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={buttonClasses(copied ? "primary" : "outline", size)}
    >
      {copied ? "Copied ✓" : label}
    </button>
  );
}
