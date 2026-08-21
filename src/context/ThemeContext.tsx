"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type ThemeChoice = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

/** Name of the cookie and localStorage key that persist the theme choice.
 *  The cookie is read by an inline <script> in the root layout's <head>, so
 *  the user's choice is applied to <html> BEFORE the browser paints —
 *  eliminates the flash of the default theme. The cookie also persists
 *  across regular browser restarts, and (within an incognito session)
 *  across tab switches and page refreshes, even though localStorage in
 *  incognito gets wiped at the end of the session.
 *
 *  The same key is used for both stores so the inline script and the
 *  client-side hydration step read from the same string. */
export const THEME_COOKIE = "gidiel-theme";
const STORAGE_KEY = THEME_COOKIE;

interface ThemeContextValue {
  /** What the user picked. */
  choice: ThemeChoice;
  /** What the page is actually rendering (resolved from system when
   *  choice==="system"). */
  resolved: ResolvedTheme;
  setChoice: (next: ThemeChoice) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isChoice(v: unknown): v is ThemeChoice {
  return v === "light" || v === "dark" || v === "system";
}

/** Read persisted choice. Cookie first (it is what the inline script and
 *  the next server request both see), then localStorage as a fallback for
 *  environments where cookies are blocked. */
function readPersistedChoice(): ThemeChoice | null {
  if (typeof document === "undefined") return null;
  try {
    const m = document.cookie.match(
      /(?:^|; )gidiel-theme=(light|dark|system)/,
    );
    if (m && isChoice(m[1])) return m[1];
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isChoice(stored)) return stored;
  } catch {
    // ignore quota / sandbox / privacy mode errors
  }
  return null;
}

function resolveTheme(choice: ThemeChoice): ResolvedTheme {
  if (choice === "light" || choice === "dark") return choice;
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(resolved: ResolvedTheme, choice: ThemeChoice) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (choice === "system") {
    // Drop the attribute so the prefers-color-scheme media query kicks in.
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", choice);
  }
  // Expose the actual rendered scheme for components that branch on it
  // (e.g. icons in the toggle, theme-dependent imagery).
  root.dataset.resolvedTheme = resolved;
}

/** Write to BOTH localStorage and the cookie. The cookie is the source of
 *  truth that the inline script reads on the next page load. We set a 1-year
 *  max-age so the choice persists across normal browser restarts and
 *  SameSite=Lax so cross-tab hard navigations also pick it up. */
function persistChoice(next: ThemeChoice) {
  if (typeof document === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {}
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `${THEME_COOKIE}=${next}; path=/; max-age=${oneYear}; samesite=lax`;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default state matches the project's dark-first design: the inline
  // bootstrap script in <head> either applies the persisted cookie or
  // sets `data-theme="dark"` for first visits, so by the time React
  // hydrates the page is already in the correct scheme. We mirror that
  // initial state here (`resolved = "dark"`) so dependent UI like the
  // toggle's icon shows the right glyph on the very first render and
  // doesn't briefly swap from Sun→Moon.
  const [choice, setChoiceState] = useState<ThemeChoice>("dark");
  const [resolved, setResolved] = useState<ResolvedTheme>("dark");

  // Hydrate from cookie/localStorage right after mount. The inline script
  // in <head> already applied the matching data-theme attribute to <html>
  // before the page painted, so the visual theme is correct from frame 1;
  // this effect just syncs React state so dependent UI (toggle icons,
  // theme-aware imagery) re-renders into agreement.
  useEffect(() => {
    const persisted = readPersistedChoice();
    const next: ThemeChoice = persisted ?? "dark";
    const r = resolveTheme(next);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional hydration step; see LanguageContext
    setChoiceState(next);
    setResolved(r);
    applyTheme(r, next);
  }, []);

  // Listen for OS theme changes while we're on "system".
  useEffect(() => {
    if (typeof window === "undefined" || choice !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const r = resolveTheme("system");
      setResolved(r);
      applyTheme(r, "system");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [choice]);

  const setChoice = useCallback((next: ThemeChoice) => {
    setChoiceState(next);
    const r = resolveTheme(next);
    setResolved(r);
    applyTheme(r, next);
    persistChoice(next);
  }, []);

  return (
    <ThemeContext.Provider value={{ choice, resolved, setChoice }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
