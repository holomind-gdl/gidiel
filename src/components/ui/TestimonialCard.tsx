"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function TestimonialCard({
  quote,
  author,
  role,
  index = 0,
}: {
  quote: string;
  author: string;
  role: string;
  index?: number;
}) {
  const isMobile = useIsMobile();

  return (
    <motion.figure
      initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: isMobile ? 0.3 : 0.5, delay: isMobile ? 0 : index * 0.08 }}
      className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
    >
      <blockquote className="text-lg text-ink-700 mb-6 italic border-none p-0 m-0 font-serif">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption>
        <p className="text-base font-semibold text-ink-900">{author}</p>
        <p className="text-sm text-ink-500 mt-0.5">{role}</p>
      </figcaption>
    </motion.figure>
  );
}
