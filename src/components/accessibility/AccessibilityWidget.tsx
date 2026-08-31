"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const AccessibilityWidgetInner = dynamic(
  () => import("./AccessibilityWidgetInner").then((mod) => mod.AccessibilityWidgetInner),
  { ssr: false } as const,
) as ComponentType;

export function AccessibilityWidget() {
  return <AccessibilityWidgetInner />;
}
