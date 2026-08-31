"use client";

import { MotionConfig } from "framer-motion";
import { useAccessibility } from "@/context/AccessibilityContext";

export function MotionConfigWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { settings } = useAccessibility();
  const reducedMotion = settings.pauseAnimations ? "always" : "user";

  return <MotionConfig reducedMotion={reducedMotion}>{children}</MotionConfig>;
}
