"use client";

import { useTranslation, useTranslationValue } from "@/context/LanguageContext";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import ServiceCard from "@/components/ui/ServiceCard";

export default function Services() {
  const { t } = useTranslation();
  const getValue = useTranslationValue();

  const rawItems = getValue("services.items");
  const serviceItems = Array.isArray(rawItems)
    ? (rawItems as Array<{ title: string; description: string }>)
    : [];

  return (
    <Section id="services">
      <SectionHeader
        eyebrow={t("services.eyebrow")}
        title={t("services.title")}
        subtitle={t("services.subtitle")}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {serviceItems.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            learnMore={t("services.learnMore")}
            index={index}
          />
        ))}
      </div>
    </Section>
  );
}
