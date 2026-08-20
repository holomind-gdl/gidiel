"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { LOCALE_LABELS, type Locale } from "@/lib/i18n/types";

const LOCALES_LIST: Locale[] = ["en", "ru", "he"];

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const { locale, setLocale, t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full border border-ink-200 px-3 py-2 text-xs font-semibold text-ink-700 transition-colors hover:border-rose-400 hover:text-rose-500 min-h-[44px]"
        aria-label={t("nav.selectLanguage")}
        aria-expanded={open}
      >
        <Globe className="h-4 w-4" />
        {LOCALE_LABELS[locale]}
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul className="absolute end-0 mt-2 w-32 overflow-hidden rounded-xl border border-ink-200 bg-white shadow-lg z-50">
          {LOCALES_LIST.map((loc) => (
            <li key={loc}>
              <button
                onClick={() => {
                  setLocale(loc);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                  locale === loc
                    ? "bg-ink-50 text-ink-900 font-semibold"
                    : "text-ink-700 hover:bg-ink-50"
                }`}
              >
                {LOCALE_LABELS[loc]}
                {locale === loc && (
                  <span className="ms-auto text-rose-500">✓</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
