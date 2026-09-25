"use client";

import React, { useState } from "react";
import { asset, Lang, LANGS, Localized } from "@lib/portfolio";

export const inputClass =
  "about-in w-full rounded-xl px-3.5 py-2.5 text-sm text-[#2e2e2e] placeholder:text-neutral-400 outline-none transition-shadow focus:ring-2 focus:ring-neutral-500/25";

function Label({ children }: { children: React.ReactNode }) {
  return <span className="mb-1.5 block text-[11px] uppercase tracking-[0.2em] text-neutral-500">{children}</span>;
}

function Hint({ children }: { children?: React.ReactNode }) {
  return children ? <span className="mt-1.5 block text-xs text-neutral-400">{children}</span> : null;
}

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: React.ReactNode;
  type?: string;
  multiline?: boolean;
  rows?: number;
  mono?: boolean;
};

export function TextField({ label, value, onChange, placeholder, hint, type = "text", multiline, rows = 3, mono }: TextFieldProps) {
  const className = `${inputClass} ${mono ? "font-mono text-xs leading-relaxed" : ""}`;
  return (
    <label className="block min-w-0">
      <Label>{label}</Label>
      {multiline ? (
        <textarea className={`${className} resize-y`} rows={rows} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className={className} type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      )}
      <Hint>{hint}</Hint>
    </label>
  );
}

export function NumberField({ label, value, onChange, hint, min = 0, max }: { label: string; value: number; onChange: (value: number) => void; hint?: React.ReactNode; min?: number; max?: number }) {
  return (
    <label className="block min-w-0">
      <Label>{label}</Label>
      <input
        className={`${inputClass} tabular-nums`}
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Math.max(min, parseInt(e.target.value, 10) || 0))}
      />
      <Hint>{hint}</Hint>
    </label>
  );
}

export function SelectField<T extends string | number>({ label, value, options, onChange }: { label: string; value: T; options: { value: T; label: string }[]; onChange: (value: T) => void }) {
  return (
    <label className="block min-w-0">
      <Label>{label}</Label>
      <select
        className={`${inputClass} appearance-none cursor-pointer`}
        value={String(value)}
        onChange={(e) => {
          const option = options.find((o) => String(o.value) === e.target.value);
          if (option) onChange(option.value);
        }}
      >
        {options.map((option) => (
          <option key={String(option.value)} value={String(option.value)}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

type LocalizedFieldProps = {
  label: string;
  value: Localized;
  onChange: (value: Localized) => void;
  multiline?: boolean;
  rows?: number;
  mono?: boolean;
  hint?: React.ReactNode;
  placeholder?: Partial<Localized>;
};

/** One field in both languages, side by side. */
export function LocalizedField({ label, value, onChange, multiline, rows = 3, mono, hint, placeholder }: LocalizedFieldProps) {
  const className = `${inputClass} pr-10 ${mono ? "font-mono text-xs leading-relaxed" : ""}`;
  const set = (lang: Lang, text: string) => onChange({ ...value, [lang]: text });
  return (
    <div className="min-w-0">
      <Label>{label}</Label>
      <div className={`grid gap-3 ${multiline && rows > 4 ? "" : "sm:grid-cols-2"}`}>
        {LANGS.map((lang) => (
          <div key={lang} className="relative min-w-0">
            {multiline ? (
              <textarea
                aria-label={`${label} (${lang})`}
                className={`${className} resize-y`}
                rows={rows}
                value={value[lang]}
                placeholder={placeholder?.[lang]}
                onChange={(e) => set(lang, e.target.value)}
              />
            ) : (
              <input
                aria-label={`${label} (${lang})`}
                className={className}
                value={value[lang]}
                placeholder={placeholder?.[lang]}
                onChange={(e) => set(lang, e.target.value)}
              />
            )}
            <span className="pointer-events-none absolute right-2.5 top-2.5 rounded-md px-1.5 py-0.5 text-[10px] font-[Lexend-medium] uppercase tracking-wider text-neutral-400">
              {lang}
            </span>
          </div>
        ))}
      </div>
      <Hint>{hint}</Hint>
    </div>
  );
}

export function Toggle({ label, checked, onChange, hint }: { label: string; checked: boolean; onChange: (checked: boolean) => void; hint?: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 h-7 w-12 shrink-0 rounded-full transition-colors duration-300 ${checked ? "bg-[#3d3d3d]" : "about-in"}`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-[#e3e3e3] shadow-[2px_2px_5px_rgba(0,0,0,0.2)] transition-all duration-300 ${
            checked ? "left-6" : "left-1"
          }`}
        />
        <span className="sr-only">{label}</span>
      </button>
      <span className="text-sm text-[#2e2e2e]">
        {label}
        <Hint>{hint}</Hint>
      </span>
    </div>
  );
}

/** Image path input with a live thumbnail of the file from /public. */
export function ImageField({ label, value, onChange, base = "", hint }: { label: string; value: string; onChange: (value: string) => void; base?: string; hint?: React.ReactNode }) {
  return (
    <div className="flex items-end gap-3 min-w-0">
      <div className="flex-1 min-w-0">
        <TextField label={label} value={value} onChange={onChange} hint={hint} />
      </div>
      <Thumb src={value ? asset(base + value) : ""} className={hint ? "mb-6" : ""} />
    </div>
  );
}

export function Thumb({ src, className = "" }: { src: string; className?: string }) {
  const [failed, setFailed] = useState<string | null>(null);
  return (
    <span className={`about-out-sm flex h-[42px] w-[42px] shrink-0 items-center justify-center overflow-hidden rounded-xl ${className}`}>
      {src && failed !== src ? (
        <img src={src} alt="" className="h-full w-full object-contain" onError={() => setFailed(src)} />
      ) : (
        <span className="text-[10px] text-neutral-400">{src ? "404" : "—"}</span>
      )}
    </span>
  );
}

export function Group({ title, description, children, actions }: { title: string; description?: string; children: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="font-[Lexend-bold] text-lg text-[#2e2e2e]">{title}</h3>
          {description && <p className="mt-0.5 text-xs text-neutral-500">{description}</p>}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}

// ---------- editable list ----------

type ItemListProps<T extends { id: string }> = {
  items: T[];
  onChange: (items: T[]) => void;
  create: () => T;
  addLabel: string;
  itemTitle: (item: T) => string;
  itemMeta?: (item: T) => string;
  render: (item: T, update: (fn: (draft: T) => void) => void) => React.ReactNode;
  /** where each item can be shown or hidden: the portfolio (showOnSite) and / or the CV (showInCv) */
  visibility?: Target[];
};

type Target = "site" | "cv";

const TARGETS: Record<Target, { key: "showOnSite" | "showInCv"; label: string; where: string }> = {
  site: { key: "showOnSite", label: "WWW", where: "w portfolio" },
  cv: { key: "showInCv", label: "CV", where: "w CV" },
};

type Flags = Partial<Record<"showOnSite" | "showInCv", boolean>>;

export function ItemList<T extends { id: string }>({ items, onChange, create, addLabel, itemTitle, itemMeta, render, visibility = [] }: ItemListProps<T>) {
  const [open, setOpen] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const update = (index: number, fn: (draft: T) => void) => {
    const next = [...items];
    const draft = structuredClone(items[index]);
    fn(draft);
    next[index] = draft;
    onChange(next);
  };

  const move = (index: number, by: number) => {
    const target = index + by;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const remove = (index: number) => {
    if (!window.confirm(`Usunąć „${itemTitle(items[index]) || "bez nazwy"}”?`)) return;
    onChange(items.filter((_, i) => i !== index));
  };

  const add = () => {
    const item = create();
    onChange([...items, item]);
    setOpen((prev) => new Set(prev).add(item.id));
  };

  return (
    <div className="space-y-3">
      {visibility.length > 0 && items.length > 0 && (
        <p className="text-xs text-neutral-500">
          {visibility.map((target) => `${TARGETS[target].where}: ${items.filter((item) => (item as Flags)[TARGETS[target].key]).length}/${items.length}`).join(" · ")}
        </p>
      )}
      <ul className="space-y-3">
        {items.map((item, index) => {
          const isOpen = open.has(item.id);
          const hiddenEverywhere = visibility.length > 0 && visibility.every((target) => !(item as Flags)[TARGETS[target].key]);
          return (
            <li key={item.id} className={`about-out-sm rounded-2xl transition-opacity ${hiddenEverywhere ? "opacity-60" : ""}`}>
              <div className="flex items-center gap-1.5 py-2 pl-3 pr-2">
                <button type="button" onClick={() => toggle(item.id)} aria-expanded={isOpen} className="flex min-w-0 flex-1 items-center gap-2.5 py-1 text-left">
                  <span className={`shrink-0 text-neutral-500 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}>
                    <ChevronRight />
                  </span>
                  <span className="truncate font-[Lexend-medium] text-sm text-[#2e2e2e]">{itemTitle(item) || "(bez nazwy)"}</span>
                  {itemMeta && <span className="hidden truncate text-xs text-neutral-400 sm:inline">{itemMeta(item)}</span>}
                </button>
                {visibility.map((target) => {
                  const { key, label, where } = TARGETS[target];
                  const shown = Boolean((item as Flags)[key]);
                  return (
                    <button
                      key={target}
                      type="button"
                      aria-pressed={shown}
                      title={shown ? `Widoczne ${where} – kliknij, aby ukryć` : `Ukryte ${where} – kliknij, aby pokazać`}
                      onClick={() => update(index, (draft) => void ((draft as Flags)[key] = !shown))}
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-[Lexend-medium] uppercase tracking-wider transition-all ${
                        shown ? "about-in text-[#2e2e2e]" : "text-neutral-400 line-through"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
                <IconButton label="W górę" disabled={index === 0} onClick={() => move(index, -1)}>
                  <ArrowIcon up />
                </IconButton>
                <IconButton label="W dół" disabled={index === items.length - 1} onClick={() => move(index, 1)}>
                  <ArrowIcon />
                </IconButton>
                <IconButton label="Usuń" onClick={() => remove(index)} danger>
                  <TrashIcon />
                </IconButton>
              </div>
              {isOpen && <div className="space-y-4 border-t border-white/70 px-4 pb-5 pt-4">{render(item, (fn) => update(index, fn))}</div>}
            </li>
          );
        })}
      </ul>
      <button type="button" onClick={add} className="neu-press inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-[Lexend-medium] text-[#2e2e2e]">
        <span className="text-lg leading-none">+</span>
        {addLabel}
      </button>
    </div>
  );
}

function IconButton({ label, onClick, disabled, danger, children }: { label: string; onClick: () => void; disabled?: boolean; danger?: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-500 transition-colors disabled:opacity-25 ${
        danger ? "hover:text-red-600" : "hover:text-[#2e2e2e]"
      }`}
    >
      {children}
    </button>
  );
}

const iconProps = {
  width: 15,
  height: 15,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function ChevronRight() {
  return (
    <svg {...iconProps}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function ArrowIcon({ up = false }: { up?: boolean }) {
  return (
    <svg {...iconProps} className={up ? "rotate-180" : ""}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
    </svg>
  );
}
