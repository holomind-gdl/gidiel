"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  type PanInfo,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import TestimonialCard from "@/components/ui/TestimonialCard";

const testimonials = [
  {
    quoteKey: "testimonials.items.0.quote",
    authorKey: "testimonials.items.0.author",
    roleKey: "testimonials.items.0.role",
  },
  {
    quoteKey: "testimonials.items.1.quote",
    authorKey: "testimonials.items.1.author",
    roleKey: "testimonials.items.1.role",
  },
  {
    quoteKey: "testimonials.items.2.quote",
    authorKey: "testimonials.items.2.author",
    roleKey: "testimonials.items.2.role",
  },
];

export default function Testimonials() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();
  const active = testimonials[activeIndex];

  const move = (direction: 1 | -1) => {
    setActiveIndex(
      (activeIndex + direction + testimonials.length) % testimonials.length,
    );
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (Math.abs(info.offset.x) < 50) return;
    move(info.offset.x < 0 ? 1 : -1);
  };

  return (
    <Section id="testimonials">
      <SectionHeader
        eyebrow={t("testimonials.eyebrow")}
        title={t("testimonials.title")}
      />

      <div className="mx-auto max-w-3xl">
        <div
          className="relative overflow-hidden"
          aria-roledescription="carousel"
          aria-label={t("testimonials.title")}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeIndex}
              id="testimonial-panel"
              role="tabpanel"
              tabIndex={0}
              aria-label={t("testimonials.slideLabel").replace(
                "{number}",
                String(activeIndex + 1),
              )}
              drag={isMobile ? false : "x"}
              dragConstraints={isMobile ? undefined : { left: 0, right: 0 }}
              dragElastic={isMobile ? 0 : 0.15}
              onDragEnd={isMobile ? undefined : handleDragEnd}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") move(-1);
                if (event.key === "ArrowRight") move(1);
              }}
              initial={{ opacity: 0, x: isMobile ? 0 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isMobile ? 0 : -30 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-4"
            >
              <TestimonialCard
                quote={t(active.quoteKey)}
                author={t(active.authorKey)}
                role={t(active.roleKey)}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2" role="tablist">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.quoteKey}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                aria-controls="testimonial-panel"
                aria-label={t("testimonials.slideLabel").replace(
                  "{number}",
                  String(index + 1),
                )}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === index
                    ? "w-8 bg-rose-500"
                    : "w-2 bg-ink-200 hover:bg-ink-400"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span
              className="text-sm font-medium tabular-nums text-ink-500"
              aria-live="polite"
            >
              {activeIndex + 1} / {testimonials.length}
            </span>
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label={t("testimonials.previous")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-700 transition-colors hover:border-rose-400 hover:text-rose-500"
            >
              <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label={t("testimonials.next")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-700 transition-colors hover:border-rose-400 hover:text-rose-500"
            >
              <ChevronRight className="h-4 w-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
