"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { projects, type Project } from "@/lib/projects";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function CaseStudy({ project }: { project: Project }) {
  const { t, locale } = useTranslation();
  const content = project.content[locale];

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const nextContent = next.content[locale];

  return (
    <>
      <section className="relative pt-32 lg:pt-40 pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-3xl"
          >
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-rose-500 transition-colors mb-8"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              {t("caseStudy.backToWork")}
            </Link>
            <p className="text-sm font-medium text-ink-500 uppercase tracking-wider mb-4">
              {t("caseStudy.eyebrow")} · {t(project.categoryKey)}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-ink-900 mb-6 text-balance leading-[1.08]">
              {content.title}
            </h1>
            <p className="text-lg md:text-xl text-ink-600 max-w-2xl measure">
              {content.overview}
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-ink-500">
              <span>
                <strong className="font-semibold text-ink-900">
                  {t("caseStudy.client")}:
                </strong>{" "}
                {project.client}
              </span>
              <span>
                <strong className="font-semibold text-ink-900">
                  {t("caseStudy.year")}:
                </strong>{" "}
                {project.year}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {content.location}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-3xl"
          >
            <Image
              src={project.image}
              alt={content.title}
              width={1200}
              height={750}
              className="aspect-[16/10] w-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/30 to-transparent" />
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl lg:text-3xl font-serif font-semibold text-ink-900 mb-4">
              {t("caseStudy.challenge")}
            </h2>
            <p className="text-base text-ink-600 measure">{content.challenge}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl lg:text-3xl font-serif font-semibold text-ink-900 mb-6">
              {t("caseStudy.approach")}
            </h2>
            <ol className="space-y-4">
              {content.approach.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-serif text-ink-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-ink-600">{step}</p>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24 panel-dark">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">            <h2 className="text-2xl lg:text-3xl font-serif font-semibold mb-10">
            {t("caseStudy.results")}
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {content.results.map((r) => (
              <div key={r.label}>
                <p className="text-4xl lg:text-5xl font-serif font-semibold mb-2 leading-none">
                  {r.value}
                </p>
                <p className="text-sm text-ink-300 mt-2">{r.label}</p>
              </div>
            ))}
          </div>

          {content.quote && (
            <blockquote className="mt-12 border-t border-white/10 pt-8 max-w-2xl">
              <p className="font-serif text-xl lg:text-2xl mb-4 italic">
                &ldquo;{content.quote.text}&rdquo;
              </p>
              <footer className="text-sm text-ink-300">
                {content.quote.author} — {content.quote.role}
              </footer>
            </blockquote>
          )}
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-ink-900 mb-3 text-balance">
              {t("contact.title")}
            </h2>
            <p className="text-lg text-ink-600 max-w-xl measure">{t("contact.subtitle")}</p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full btn-ink px-6 py-3 text-sm font-medium btn-ink-shadow"
          >
            {t("caseStudy.startCampaign")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-10 mt-12 pt-8 border-t border-ink-100">
          <Link
            href={`/work/${next.slug}`}
            className="group flex items-center justify-between gap-4"
          >
            <div>
              <p className="text-sm text-ink-500 mb-2 uppercase tracking-wider font-semibold">
                {t("caseStudy.nextProject")}
              </p>
              <p className="font-serif text-2xl lg:text-3xl font-semibold text-ink-900 group-hover:text-rose-500 transition-colors text-balance">
                {nextContent.title}
              </p>
            </div>
            <ArrowUpRight className="h-6 w-6 text-ink-400 group-hover:text-rose-500 transition-colors" />
          </Link>
        </div>
      </section>
    </>
  );
}
