"use client";

import { useTranslation } from "@/context/LanguageContext";

const brands = [
  "LUMIÈRE",
  "MAISON ROUGE",
  "VELVETÉ",
  "AURORA SKIN",
  "NOIR BEAUTÉ",
  "FLORÉLE",
  "KASIA",
  "OPALENCE",
];

export default function BrandMarquee() {
  const { t } = useTranslation();

  return (
    <div className="section relative overflow-hidden border-y border-ink-100/60 bg-ink-50 py-10">
      <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.22em] text-ink-500 dark-theme-eyebrow">
        {t("marquee.label")}
      </p>

      <div className="group relative">
        {/* `min-w-0` is required: flex children default to `min-width: auto`,
            which expands the container to fit the very long marquee track and
            produces a horizontal scrollbar on mobile. */}
        <div className="flex overflow-hidden min-w-0">
          <div className="animate-marquee flex shrink-0 items-center gap-16 pe-16 hover:[animation-play-state:paused]">
            {[...brands, ...brands].map((brand, i) => (
              <span
                key={i}
                className="whitespace-nowrap font-serif text-2xl font-medium uppercase tracking-[0.18em] text-ink-500 transition-colors duration-300 hover:text-ink-900"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-50 to-transparent" />
      </div>
    </div>
  );
}
