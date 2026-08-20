"use client";

import { motion, type Variants } from "framer-motion";

interface LogoProps {
  /** Render as a plain span (no Link wrapper). Default: false */
  plain?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Additional class names */
  className?: string;
  /** Disable entrance animation */
  noAnimate?: boolean;
}

const SIZES = {
  sm: {
    icon: 36,
    iconWrapper: "h-9 w-9",
    text: "text-lg leading-none",
    gap: "gap-2",
  },
  md: {
    icon: 50,
    iconWrapper: "h-12 w-12",
    text: "text-2xl leading-none",
    gap: "gap-2.5",
  },
  lg: {
    icon: 58,
    iconWrapper: "h-14 w-14",
    text: "text-3xl leading-none",
    gap: "gap-3",
  },
} as const;

const iconVariants: Variants = {
  hidden: { scale: 0, rotate: -90 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 260, damping: 20, delay: 0.1 },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * GiDieL brand mark: a soft abstract silhouette paired with the wordmark.
 *
 * The custom vector silhouette is designed to stay recognisable
 * in a website header, social avatar, and small packaging details.
 */
export default function Logo({
  plain = false,
  size = "md",
  className = "",
  noAnimate = false,
}: LogoProps) {
  const s = SIZES[size];
  const initial = noAnimate ? ("visible" as const) : ("hidden" as const);
  const animate = "visible" as const;

  const inner = (
    <motion.span
      className={`inline-flex items-center ${s.gap} ${className}`}
      initial={initial}
      animate={animate}
    >
      {/* Monogram: a single soft flowing silhouette with no surrounding frame or background.
         Colour comes from --logo-mark so it lightens automatically in dark theme — the solid
         teal on cream is 4.5:1 AA, on dark cream the swapped light-teal stays ≥9:1 AAA. */}
      <motion.span
        className={`relative flex ${s.iconWrapper} items-center justify-center`}
        style={{ color: "var(--logo-mark)" }}
        variants={iconVariants}
        initial={initial}
        animate={animate}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={s.icon * 0.82}
          height={s.icon * 0.82}
          viewBox="0 0 42 42"
          aria-hidden="true"
          className="overflow-visible"
        >
          {/* Soft ribbon knot: one nested loop with a single continuous gesture. */}
          <path
            d="M33.9 13.1C30.5 7.9 23.7 6.1 17.8 8.7C11.6 11.4 8.8 18.2 11.6 23.7C14.3 29.1 20.9 31 26 28.1C30.5 25.5 31.5 20.3 28.3 16.9C25.6 14 21.1 14.3 18.6 17.4C16.3 20.2 17.2 24.1 20.1 26.1C22.7 27.8 25.5 27.5 27.5 25.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.65"
            strokeLinecap="round"
          />
        </svg>
      </motion.span>

      {/* Wordmark. Gradient stops come from CSS vars so the brand palette
         flips with the theme: medium teals on cream (original look),
         light teals on dark surfaces (≥4.5:1 contrast on `#100d0a`). */}
      <motion.span
        className={`font-rounded font-semibold tracking-tight ${s.text}`}
        variants={textVariants}
        initial={initial}
        animate={animate}
      >
        {/* Brand wordmark is forced LTR even inside RTL pages so the logo
           renders identically in English, Russian, and Hebrew. */}
        <bdo dir="ltr">
          <span
            className="bg-gradient-to-r bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--logo-gi-from), var(--logo-gi-to))",
            }}
          >Gi</span><span
            className="bg-gradient-to-r bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--logo-di-from), var(--logo-di-to))",
            }}
          >Di</span><span
            className="bg-gradient-to-r bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--logo-el-from), var(--logo-el-to))",
            }}
          >eL</span>
        </bdo>
      </motion.span>
    </motion.span>
  );

  if (plain) return inner;

  // Navbar and footer provide the surrounding Link when navigation is needed.
  return inner;
}
