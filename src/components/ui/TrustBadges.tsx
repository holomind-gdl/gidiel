"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Star } from "lucide-react";
import { useTranslation, useTranslationValue } from "@/context/LanguageContext";

const icons = [Trophy, Award, Star];

export default function TrustBadges() {
  const { t } = useTranslation();
  const getValue = useTranslationValue();

  const rawItems = getValue("badges.items");
  const badgeItems = Array.isArray(rawItems)
    ? (rawItems as Array<{ title: string; subtitle: string }>)
    : [];

  if (badgeItems.length === 0) return null;

  return (
    <section aria-label={t("badges.label")} className="relative py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-ink-400 mb-8">
          {t("badges.label")}
        </p>

        <div className="grid gap-6 sm:grid-cols-3">
          {badgeItems.map((item, i) => {
            const Icon = icons[i] ?? Star;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center justify-center gap-4 rounded-2xl border border-ink-100 bg-white px-6 py-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-gold-400 text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-base font-semibold text-ink-900">{item.title}</p>
                  <p className="text-sm text-ink-500 mt-0.5">{item.subtitle}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
