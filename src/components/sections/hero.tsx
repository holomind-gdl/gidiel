"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import StatBadge from "@/components/ui/StatBadge";

const fadeUp = (isMobile: boolean) => ({
  hidden: { opacity: 0, ...(isMobile ? {} : { y: 30 }) },
  visible: (i: number) => ({
    opacity: 1,
    ...(isMobile ? {} : { y: 0 }),
    transition: {
      delay: i * (isMobile ? 0.05 : 0.1),
      duration: isMobile ? 0.4 : 0.7,
      ease: isMobile ? undefined : ([0.16, 1, 0.3, 1] as const),
    },
  }),
});

export default function Hero() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : 60]);

  return (
    <section
      ref={heroRef}
      className="section relative flex items-center pt-24 pb-14 lg:pt-28 lg:pb-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-xl">
            <motion.p
              custom={0}
              variants={fadeUp(isMobile)}
              initial="hidden"
              animate="visible"
              className="text-sm font-medium text-ink-500 uppercase tracking-wider mb-4"
            >
              {t("hero.eyebrow")}
            </motion.p>
            <motion.h1
              custom={1}
              variants={fadeUp(isMobile)}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-ink-900 mb-6 text-balance leading-[1.05]"
            >
              {t("hero.title")}
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeUp(isMobile)}
              initial="hidden"
              animate="visible"
              className="text-lg text-ink-600 mb-8"
            >
              {t("hero.subtitle")}
            </motion.p>
            <motion.div
              custom={3}
              variants={fadeUp(isMobile)}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4 mb-12"
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full btn-ink px-6 py-3 text-sm font-medium btn-ink-shadow"
              >
                {t("hero.ctaPrimary")}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full border border-ink-200 px-6 py-3 text-sm font-medium text-ink-700 transition-all duration-300 hover:border-ink-900 hover:text-ink-900"
              >
                {t("hero.ctaSecondary")}
              </a>
            </motion.div>
            <motion.div
              custom={4}
              variants={fadeUp(isMobile)}
              initial="hidden"
              animate="visible"
              className="flex gap-8"
            >
              <StatBadge value={t("hero.stat1.value")} label={t("hero.stat1.label")} index={0} />
              <StatBadge value={t("hero.stat2.value")} label={t("hero.stat2.label")} index={1} />
              <StatBadge value={t("hero.stat3.value")} label={t("hero.stat3.label")} index={2} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative"
          >
            <motion.div style={{ y: imageY }} className="relative">
              <div className="relative z-10">
                <Image
                  src="/images/hero/model.jpg"
                  alt="Model wearing bold cosmetics"
                  width={600}
                  height={750}
                  className="aspect-[4/5] w-full max-w-md mx-auto object-cover rounded-2xl"
                  priority
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-ink-950/70 via-ink-950/30 to-transparent" />
              </div>
              <div className="hidden sm:block absolute top-1/2 -end-4 z-20">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <p className="text-2xl font-semibold text-ink-900 font-serif leading-none">+212%</p>
                  <p className="text-sm text-ink-500 mt-1">{t("hero.launchLift")}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
