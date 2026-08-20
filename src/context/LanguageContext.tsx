"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type {
  Locale,
  Translations,
  TranslationValue,
} from "@/lib/i18n/types";
import { LOCALES, LOCALE_DIR, DEFAULT_LOCALE } from "@/lib/i18n/types";
import en from "@/lib/i18n/en.json";

async function loadDict(locale: Locale): Promise<Translations> {
  const mod = await import(`@/lib/i18n/${locale}.json`);
  return mod.default as Translations;
}

const translationsCache: Partial<Record<Locale, Translations>> = {
  [DEFAULT_LOCALE]: en as unknown as Translations,
};

function getNestedValue(
  obj: Translations,
  key: string,
): TranslationValue | undefined {
  return key.split(".").reduce<TranslationValue | undefined>((acc, part) => {
    if (Array.isArray(acc)) {
      const index = Number(part);
      return Number.isInteger(index) ? acc[index] : undefined;
    }
    if (acc && typeof acc === "object") {
      return acc[part];
    }
    return undefined;
  }, obj);
}

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;

  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get("lang");
  if (urlLang && LOCALES.includes(urlLang as Locale)) {
    return urlLang as Locale;
  }

  try {
    const stored = localStorage.getItem("gidiel-locale");
    if (stored && LOCALES.includes(stored as Locale)) {
      return stored as Locale;
    }
  } catch {}

  return DEFAULT_LOCALE;
}

interface LanguageContextValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: (key: string) => string;
  getValue: (key: string) => TranslationValue;
  setLocale: (locale: Locale) => void;
  dict: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [dict, setDict] = useState<Translations>(en as unknown as Translations);

  // Resolve the persisted locale once after hydration (avoiding a hydration
  // mismatch, since the server always renders the default locale).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocaleState(getInitialLocale());
  }, []);

  useEffect(() => {
    let cancelled = false;
    const cached = translationsCache[locale];

    if (cached) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDict(cached);
    } else {
      loadDict(locale).then((d) => {
        translationsCache[locale] = d;
        if (!cancelled) setDict(d);
      });
    }

    return () => {
      cancelled = true;
    };
  }, [locale]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
      document.documentElement.dir = LOCALE_DIR[locale];
    }
  }, [locale]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem("gidiel-locale", locale);
    } catch {}
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    const cached = translationsCache[next];
    if (cached) setDict(cached);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", next);
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  const t = useCallback(
    (key: string): string => {
      const value = getNestedValue(dict, key);
      if (typeof value === "string") return value;
      return key;
    },
    [dict]
  );

  const getValue = useCallback(
    (key: string): TranslationValue => {
      const value = getNestedValue(dict, key);
      if (Array.isArray(value)) return value;
      if (value && typeof value === "object") return value;
      return key;
    },
    [dict]
  );

  return (
    <LanguageContext.Provider
      value={{ locale, dir: LOCALE_DIR[locale], t, setLocale, dict, getValue }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useTranslation must be used within LanguageProvider");
  return ctx;
}

export function useTranslationValue() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useTranslationValue must be used within LanguageProvider");
  return ctx.getValue;
}
