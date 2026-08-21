"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function ProjectCard({
  title,
  category,
  metric,
  image,
  href,
  index = 0,
}: {
  title: string;
  category: string;
  metric: string;
  image: string;
  href: string;
  index?: number;
}) {
  const isMobile = useIsMobile();

  return (
    <motion.article
      initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: isMobile ? 0.3 : 0.5, delay: isMobile ? 0 : index * 0.08 }}
    >
      <Link href={href} className="group block">
        <div className="relative overflow-hidden rounded-2xl mb-4">
          <Image
            src={image}
            alt={title}
            width={600}
            height={400}
            className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/40 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink-900">
              {category}
            </span>
          </div>
          <div className="absolute bottom-4 right-4">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-900 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
        <h3 className="font-serif text-lg lg:text-xl font-semibold text-ink-900 mb-2 group-hover:text-rose-500 transition-colors text-balance">
          {title}
        </h3>
        <p className="text-base text-ink-600">{metric}</p>
      </Link>
    </motion.article>
  );
}
