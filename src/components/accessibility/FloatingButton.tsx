"use client";

import { useAccessibility } from "@/context/AccessibilityContext";
import { useTranslation } from "@/context/LanguageContext";

export function FloatingButton() {
  const { setIsOpen, isOpen, settings } = useAccessibility();
  const { t, dir } = useTranslation();

  const hasActiveSettings = Object.entries(settings).some(([key, value]) => {
    if (key === "fontSize") return value !== 100;
    if (typeof value === "boolean") return value;
    return value !== "normal";
  });

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      aria-label={t("accessibility.toggle")}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      className={`fixed z-[9998] bottom-6 sm:bottom-24 ${dir === "rtl" ? "left-6" : "right-6"} w-14 h-14 rounded-full shadow-lg flex items-center justify-center bg-primary text-primary-foreground hover:scale-110 transition-transform focus:outline-none focus:ring-4 focus:ring-primary/50 ${hasActiveSettings ? "ring-2 ring-green-500" : ""}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7"
        aria-hidden="true"
      >
        <circle cx="12" cy="4" r="1" />
        <path d="M7 8h10" />
        <path d="M12 8v8" />
        <path d="M9 20l3-4 3 4" />
        <path d="M12 16v-4" />
      </svg>
    </button>
  );
}
