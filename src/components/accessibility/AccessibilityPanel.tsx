"use client";

import { useAccessibility } from "@/context/AccessibilityContext";
import { useTranslation } from "@/context/LanguageContext";
import { useEffect, useRef, useCallback } from "react";

export function AccessibilityPanel() {
  const { settings, updateSetting, resetSettings, setIsOpen } =
    useAccessibility();
  const { t, dir } = useTranslation();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first || !panelRef.current.contains(document.activeElement)) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    },
    [setIsOpen],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <div
        className="fixed inset-0 z-[9998]"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-label={t("accessibility.panelTitle")}
        tabIndex={-1}
        className={`fixed z-[9999] bottom-24 sm:bottom-40 ${dir === "rtl" ? "left-6" : "right-6"} w-80 max-h-[70vh] overflow-y-auto bg-background border border-border rounded-xl shadow-2xl p-4 space-y-4`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{t("accessibility.title")}</h2>
          <button
            ref={closeButtonRef}
            onClick={() => setIsOpen(false)}
            aria-label={t("accessibility.close")}
            className="p-1 rounded hover:bg-muted"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            {t("accessibility.fontSize")}
          </label>
          <div className="flex gap-2">
            {[100, 125, 150].map((size) => (
              <button
                key={size}
                onClick={() => updateSetting("fontSize", size)}
                aria-pressed={settings.fontSize === size}
                className={`flex-1 py-2 rounded border ${
                  settings.fontSize === size
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {size}%
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            {t("accessibility.contrast")}
          </label>
          <div className="flex gap-2">
            {(["normal", "high", "dark"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => updateSetting("contrast", mode)}
                aria-pressed={settings.contrast === mode}
                className={`flex-1 py-2 rounded border text-sm ${
                  settings.contrast === mode
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {t(`accessibility.contrast_${mode}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <ToggleRow
            label={t("accessibility.dyslexiaFont")}
            checked={settings.dyslexiaFont}
            onChange={(v) => updateSetting("dyslexiaFont", v)}
          />
          <ToggleRow
            label={t("accessibility.linkHighlight")}
            checked={settings.linkHighlight}
            onChange={(v) => updateSetting("linkHighlight", v)}
          />
          <ToggleRow
            label={t("accessibility.readingGuide")}
            checked={settings.readingGuide}
            onChange={(v) => updateSetting("readingGuide", v)}
          />
          <ToggleRow
            label={t("accessibility.pauseAnimations")}
            checked={settings.pauseAnimations}
            onChange={(v) => updateSetting("pauseAnimations", v)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            {t("accessibility.cursorSize")}
          </label>
          <div className="flex gap-2">
            {(["normal", "large", "xlarge"] as const).map((size) => (
              <button
                key={size}
                onClick={() => updateSetting("cursorSize", size)}
                aria-pressed={settings.cursorSize === size}
                className={`flex-1 py-2 rounded border text-sm ${
                  settings.cursorSize === size
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {t(`accessibility.cursor_${size}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            {t("accessibility.textSpacing")}
          </label>
          <div className="flex gap-2">
            {(["normal", "wide", "wider"] as const).map((spacing) => (
              <button
                key={spacing}
                onClick={() => updateSetting("textSpacing", spacing)}
                aria-pressed={settings.textSpacing === spacing}
                className={`flex-1 py-2 rounded border text-sm ${
                  settings.textSpacing === spacing
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {t(`accessibility.spacing_${spacing}`)}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={resetSettings}
          className="w-full py-2 rounded border border-dashed border-muted-foreground hover:bg-muted"
        >
          {t("accessibility.reset")}
        </button>
      </div>
    </>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-6 rounded-full transition-colors ${
          checked ? "bg-primary" : "bg-muted"
        }`}
      >
        <span
          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
            checked ? "left-5" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}
