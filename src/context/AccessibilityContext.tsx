"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

export interface AccessibilitySettings {
  fontSize: number;
  contrast: "normal" | "high" | "dark";
  dyslexiaFont: boolean;
  cursorSize: "normal" | "large" | "xlarge";
  linkHighlight: boolean;
  textSpacing: "normal" | "wide" | "wider";
  readingGuide: boolean;
  pauseAnimations: boolean;
}

export const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontSize: 100,
  contrast: "normal",
  dyslexiaFont: false,
  cursorSize: "normal",
  linkHighlight: false,
  textSpacing: "normal",
  readingGuide: false,
  pauseAnimations: false,
};

const STORAGE_KEY = "gidiel-a11y";

interface AccessibilityContextValue {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K],
  ) => void;
  resetSettings: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(
  null,
);

function readStoredSettings(): AccessibilitySettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
  } catch {}
  return DEFAULT_SETTINGS;
}

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] =
    useState<AccessibilitySettings>(DEFAULT_SETTINGS);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSettings(readStoredSettings());
  }, []);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setSettings({ ...DEFAULT_SETTINGS, ...parsed });
        } catch {}
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {}
  }, [settings]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--a11y-font-size", `${settings.fontSize}%`);
    root.dataset.a11yContrast = settings.contrast;
    root.dataset.a11yDyslexia = String(settings.dyslexiaFont);
    root.dataset.a11yCursor = settings.cursorSize;
    root.dataset.a11yLinks = String(settings.linkHighlight);
    root.dataset.a11ySpacing = settings.textSpacing;
    root.dataset.a11yGuide = String(settings.readingGuide);
    root.dataset.a11yAnimations = String(settings.pauseAnimations);
  }, [settings]);

  const updateSetting = useCallback(
    <K extends keyof AccessibilitySettings>(
      key: K,
      value: AccessibilitySettings[K],
    ) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{ settings, updateSetting, resetSettings, isOpen, setIsOpen }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx)
    throw new Error(
      "useAccessibility must be used within AccessibilityProvider",
    );
  return ctx;
}
