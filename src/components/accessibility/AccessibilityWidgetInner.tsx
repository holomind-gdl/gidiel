"use client";

import { useAccessibility } from "@/context/AccessibilityContext";
import { FloatingButton } from "./FloatingButton";
import { AccessibilityPanel } from "./AccessibilityPanel";
import { ReadingGuide } from "./ReadingGuide";

export function AccessibilityWidgetInner() {
  const { isOpen, settings } = useAccessibility();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
      >
        Skip to main content
      </a>

      <FloatingButton />

      {isOpen && <AccessibilityPanel />}

      {settings.readingGuide && <ReadingGuide />}
    </>
  );
}
