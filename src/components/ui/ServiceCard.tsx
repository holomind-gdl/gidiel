"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ServiceCard({
  title,
  description,
  href = "#contact",
  learnMore,
  index = 0,
}: {
  title: string;
  description: string;
  href?: string;
  learnMore?: string;
  index?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="service-card-glow group relative rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-rose-200/50"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
        e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
      }}
    >
      <h3 className="font-serif text-lg lg:text-xl font-semibold text-ink-900 mb-3 text-balance">
        {title}
      </h3>
      <p className="text-base text-ink-600 mb-6">
        {description}
      </p>
      <a
        href={href}
        className="inline-flex items-center gap-1 text-sm font-medium text-ink-700 transition-colors group-hover:text-rose-500"
      >
        {learnMore}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </a>
    </motion.article>
  );
}
