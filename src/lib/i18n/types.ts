export type Locale = "en" | "ru" | "he";

export type TranslationValue =
  | string
  | TranslationValue[]
  | { [key: string]: TranslationValue };

export type Translations = { [key: string]: TranslationValue };

export const LOCALES: Locale[] = ["en", "ru", "he"];
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
  he: "HE",
};
export const LOCALE_DIR: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ru: "ltr",
  he: "rtl",
};

export const DEFAULT_LOCALE: Locale = "en";
