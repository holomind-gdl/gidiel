"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Logo from "@/components/ui/Logo";

const NAV_KEYS = [
  { href: "/#services", key: "nav.services" },
  { href: "/#work", key: "nav.work" },
  { href: "/#process", key: "nav.process" },
  { href: "/#about", key: "nav.about" },
  { href: "/#contact", key: "nav.contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 bg-ink-50/80 backdrop-blur-xl border-b border-ink-100/50`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/#top" aria-label="GiDieL home">
          <Logo />
        </Link>

        <ul className="hidden list-none items-center gap-9 p-0 m-0 md:flex">
          {NAV_KEYS.map((link) => (
            <li key={link.href} className="flex items-center">
              <Link
                href={link.href}
                className="text-sm font-medium text-ink-700 transition-colors hover:text-rose-500"
              >
                {t(link.key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link
            href="/#contact"
            className="hidden rounded-full border border-ink-200 px-5 py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:border-rose-400 hover:text-rose-500 min-h-[44px] md:inline-block"
          >
            {t("nav.cta")}
          </Link>
          <button
            className="md:hidden flex items-center justify-center min-h-[44px] min-w-[44px] text-ink-900"
            aria-label={mobileOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden bg-ink-50/90 backdrop-blur-xl transition-all duration-300 md:hidden border-b border-ink-100/50 ${
          mobileOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {NAV_KEYS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-lg px-3 py-3 text-base font-medium text-ink-700 transition-colors hover:bg-ink-100 hover:text-rose-500"
                onClick={() => setMobileOpen(false)}
              >
                {t(link.key)}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/#contact"
              className="block rounded-lg px-3 py-3 text-base font-medium text-ink-700 transition-colors hover:bg-ink-100 hover:text-rose-500"
              onClick={() => setMobileOpen(false)}
            >
              {t("nav.cta")}
            </Link>
          </li>
        </ul>
      </div>

      {!mobileOpen && (
        <Link
          href="/#contact"
          className="fixed inset-x-4 bottom-4 z-40 inline-flex items-center justify-center gap-2 rounded-full btn-ink px-5 py-3.5 text-sm font-medium btn-ink-shadow md:hidden"
          style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
        >
          {t("nav.cta")}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        </Link>
      )}
    </header>
  );
}
