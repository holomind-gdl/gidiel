"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";

const steps = [
  {
    number: "01",
    titleKey: "process.steps.0.title",
    descriptionKey: "process.steps.0.description",
  },
  {
    number: "02",
    titleKey: "process.steps.1.title",
    descriptionKey: "process.steps.1.description",
  },
  {
    number: "03",
    titleKey: "process.steps.2.title",
    descriptionKey: "process.steps.2.description",
  },
  {
    number: "04",
    titleKey: "process.steps.3.title",
    descriptionKey: "process.steps.3.description",
  },
];

export default function Process() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <Section id="process">
      <motion.div
        initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: isMobile ? 0.3 : 0.6 }}
      >
        <SectionHeader
          eyebrow={t("process.eyebrow")}
          title={t("process.title")}
        />
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: isMobile ? 0.3 : 0.5, delay: isMobile ? 0 : index * 0.1 }}
            className="group"
          >
            <p className="text-sm font-semibold text-ink-400 uppercase tracking-wider mb-4 tabular-nums">
              {step.number}
            </p>
            <h3 className="font-serif text-xl lg:text-2xl font-semibold text-ink-900 mb-3 text-balance">
              {t(step.titleKey)}
            </h3>
            <p className="text-base text-ink-600">
              {t(step.descriptionKey)}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
