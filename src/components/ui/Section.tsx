"use client";

import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function Section({
  id,
  className = "",
  children,
  noAnimate = false,
  bgGradient,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  noAnimate?: boolean;
  bgGradient?: React.ReactNode;
}) {
  const base = "section relative py-14 lg:py-20";

  if (noAnimate) {
    return (
      <section id={id} className={`${base} ${className}`}>
        {bgGradient && (
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {bgGradient}
          </div>
        )}
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          {children}
        </div>
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={`${base} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {bgGradient && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {bgGradient}
        </div>
      )}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        {children}
      </div>
    </motion.section>
  );
}
