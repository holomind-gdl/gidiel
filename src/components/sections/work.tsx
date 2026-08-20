"use client";

import { useTranslation } from "@/context/LanguageContext";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/lib/projects";

export default function Work() {
  const { t, locale } = useTranslation();

  return (
    <Section id="work" className="bg-gradient-to-b from-ink-100 to-ink-50 panel-soft">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16">
        <SectionHeader
          eyebrow={t("work.eyebrow")}
          title={t("work.title")}
        />
        <p className="text-lg text-ink-600 mt-4 sm:mt-0 max-w-md">{t("work.subtitle")}</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => {
          const content = project.content[locale];
          return (
            <ProjectCard
              key={project.slug}
              title={content.title}
              category={t(project.categoryKey)}
              metric={content.summary}
              image={project.image}
              href={`/work/${project.slug}`}
              index={index}
            />
          );
        })}
      </div>
    </Section>
  );
}
