"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";

export default function About() {
  const { t } = useTranslation();

  return (
    <Section id="about">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <Image
            src="/images/about/retail.jpg"
            alt="Modern beauty retail interior"
            width={600}
            height={450}
            className="aspect-[4/3] w-full object-cover rounded-2xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
          >
            <p className="font-serif text-2xl lg:text-3xl font-semibold text-ink-900 leading-none">{t("about.stats.years")}</p>
            <p className="text-sm text-ink-500 mt-2">{t("about.stats.yearsLabel")}</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            eyebrow={t("about.eyebrow")}
            title={t("about.title")}
            subtitle={t("about.subtitle")}
            className="mb-8"
          />

          <div className="space-y-6">
            {[
              { title: t("about.pillars.0.title"), desc: t("about.pillars.0.description") },
              { title: t("about.pillars.1.title"), desc: t("about.pillars.1.description") },
              { title: t("about.pillars.2.title"), desc: t("about.pillars.2.description") },
            ].map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              >
                <h3 className="font-serif text-lg lg:text-xl font-semibold text-ink-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-base text-ink-600 measure">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
