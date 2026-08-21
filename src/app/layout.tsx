import type { Metadata } from "next";
import {
  Geist,
  Nunito,
  Heebo,
} from "next/font/google";
import { MotionConfig } from "framer-motion";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ScrollProgress from "@/components/ui/ScrollProgress";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

// Hebrew: Heebo carries Hebrew glyphs that Nunito lacks.
const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["latin", "hebrew"],
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "GiDieL — Cosmetics Promotion & Brand Activation",
  description:
    "GiDieL crafts unforgettable cosmetics promotion campaigns — from product launches to in-store activations that make beauty brands sell.",
  icons: {
    icon: "/favicon.svg?v=4",
    apple: "/favicon.svg?v=4",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Inline bootstrap: reads the gidiel-theme cookie and applies data-theme
  // to <html> synchronously while the browser parses the response, BEFORE
  // any content paints. This eliminates any flash of the wrong theme.
  //
  // Behaviour by cookie value:
  //   - 'dark'   → html[data-theme="dark"]                (user picked dark)
  //   - 'light'  → html[data-theme="light"]               (user picked light)
  //   - 'system' → remove attribute so CSS media-query     (user wants OS pref)
  //                 follows prefers-color-scheme
  //   - (none)   → apply 'dark' as the project default     (first visit)
  //
  // The cookie is set by ThemeProvider on every choice change, so it
  // survives normal browser restarts (1-year max-age) and incognito tab
  // switches. First-visit defaults to dark to match the design intent.
  //
  // We deliberately do NOT use Next.js's `cookies()` here: reading cookies
  // in the root layout opts the entire app out of static prerendering.
  // Following the official Next.js 16 "Preventing flash before hydration"
  // guide, we read the cookie on the client via this inline script.
  const themeBootstrap = `(function(){try{var m=document.cookie.match(/(?:^|; )gidiel-theme=(light|dark|system)/);if(m){var v=m[1];if(v==='system'){document.documentElement.removeAttribute('data-theme')}else{document.documentElement.setAttribute('data-theme',v)}}else{document.documentElement.setAttribute('data-theme','dark')}}catch(e){}})()`;

  return (
    <html
      lang="en"
      className={`${geist.variable} ${nunito.variable} ${heebo.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <script
          dangerouslySetInnerHTML={{ __html: themeBootstrap }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <MotionConfig reducedMotion="user">
          <ScrollProgress />
          <ThemeProvider>
            <LanguageProvider>{children}</LanguageProvider>
          </ThemeProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
