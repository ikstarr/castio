import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

export function buttonClasses(
  variant: Variant = "primary",
  size: Size = "md",
  className?: string,
): string {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap active:translate-y-px";
  const sizes: Record<Size, string> = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-7 text-base",
  };
  const variants: Record<Variant, string> = {
    primary:
      "bg-brand text-white shadow-sm shadow-brand/20 hover:bg-brand-strong hover:shadow-md hover:shadow-brand/25",
    secondary: "bg-foreground text-white hover:opacity-90 shadow-sm",
    outline:
      "border border-border-strong bg-surface text-foreground hover:bg-surface-muted hover:border-brand/30",
    ghost: "text-foreground hover:bg-surface-muted",
    danger: "bg-danger text-white hover:opacity-90 shadow-sm",
  };
  return cn(base, sizes[size], variants[variant], className);
}

export function Button({
  variant,
  size,
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return (
    <button className={buttonClasses(variant, size, className)} {...props} />
  );
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return <Link className={buttonClasses(variant, size, className)} {...props} />;
}

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-surface px-3 py-1 text-xs font-medium text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

const statusStyles: Record<string, string> = {
  draft: "bg-surface-muted text-muted border-border",
  published: "bg-[#e8f7ee] text-[#15803d] border-[#bce7cc]",
  approved: "bg-[#e8f7ee] text-[#15803d] border-[#bce7cc]",
  hidden: "bg-[#fff4e5] text-[#b45309] border-[#fde2bd]",
  archived: "bg-[#fdecec] text-[#b91c1c] border-[#f6cccc]",
};

export function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        statusStyles[status] ?? statusStyles.draft,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-muted">{hint}</span> : null}
    </label>
  );
}

const fieldBase =
  "w-full rounded-xl border border-border-strong bg-surface px-3.5 py-2.5 text-sm text-foreground transition-colors placeholder:text-muted/60 hover:border-brand/30 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(fieldBase, "min-h-11", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea className={cn(fieldBase, "min-h-24 resize-y", className)} {...props} />
  );
}

// Custom chevron (appearance-none strips the native one).
const selectChevron =
  "appearance-none min-h-11 bg-no-repeat bg-[length:1.1rem] bg-[position:right_0.75rem_center] pr-10 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2365656f%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')]";

export function Select({ className, ...props }: ComponentProps<"select">) {
  return <select className={cn(fieldBase, selectChevron, className)} {...props} />;
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("cx-card p-6", className)}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow ? <p className="cx-eyebrow mb-3">{eyebrow}</p> : null}
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-[2.5rem] sm:leading-[1.1]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-lg leading-relaxed text-muted text-pretty">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
