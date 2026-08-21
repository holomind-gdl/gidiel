"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function StatBadge({
  value,
  label,
  index = 0,
}: {
  value: string;
  label: string;
  index?: number;
}) {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: isMobile ? 0.3 : 0.5, delay: isMobile ? 0 : index * 0.1 }}
    >
      <p className="font-serif text-3xl lg:text-4xl font-semibold text-ink-900 leading-none tabular-nums text-balance">
        {value}
      </p>
      <p className="text-sm text-ink-500 mt-2">{label}</p>
    </motion.div>
  );
}
