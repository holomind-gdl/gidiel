"use client";

import { useEffect, useRef, useState } from "react";
import { Sun, Moon, Monitor, ChevronDown } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const OPTS = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
] as const;

export default function ThemeToggle() {
  const { choice, setChoice } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const current = OPTS.find((o) => o.value === choice) ?? OPTS[2];
  const CurrentIcon = current.Icon;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={`Theme: ${current.label}`}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-1.5 rounded-full border border-ink-200 px-3 py-2 text-ink-700 transition-colors hover:border-rose-400 hover:text-rose-500 min-h-[44px]"
      >
        <CurrentIcon className="h-4 w-4" aria-hidden="true" />
        <ChevronDown
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="menu"
          className="absolute end-0 mt-2 w-40 overflow-hidden rounded-xl border border-ink-200 bg-white shadow-lg z-50"
        >
          {OPTS.map(({ value, label, Icon }) => (
            <li key={value} role="none">
              <button
                type="button"
                role="menuitemradio"
                aria-checked={choice === value}
                onClick={() => {
                  setChoice(value);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                  choice === value
                    ? "bg-ink-50 text-ink-900 font-semibold"
                    : "text-ink-700 hover:bg-ink-50"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
                {choice === value && (
                  <span className="ms-auto text-rose-500" aria-hidden="true">
                    ✓
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
