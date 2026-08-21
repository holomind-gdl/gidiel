"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 bg-ink-50/90 backdrop-blur-md md:backdrop-blur-xl border-b border-ink-100/50`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <nav className="mx-auto flex max-w-7xl items-center px-4 py-3 lg:px-10 lg:py-4">
        {/* Mobile: equal spacing between logo and all icon buttons */}
        <div className="flex items-center w-full md:hidden">
          <Link href="/#top" aria-label="GiDieL home">
            <Logo />
          </Link>
          <div className="flex-1" />
          <LanguageSwitcher iconOnly />
          <div className="flex-1" />
          <ThemeToggle />
          <div className="flex-1" />
          <Link
            href="/#contact"
            aria-label={t("nav.cta")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-700 transition-colors hover:border-rose-400 hover:text-rose-500"
          >
            <span className="text-sm font-semibold">S</span>
          </Link>
          <div className="flex-1" />
          <button
            className="flex items-center justify-center h-10 w-10 rounded-full border border-ink-200 text-ink-700 transition-colors hover:border-rose-400 hover:text-rose-500"
            aria-label={mobileOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center justify-between w-full">
          <Link href="/#top" aria-label="GiDieL home">
            <Logo />
          </Link>
          <ul className="list-none items-center gap-9 p-0 m-0 flex">
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
              className="rounded-full border border-ink-200 px-5 py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:border-rose-400 hover:text-rose-500 min-h-[44px]"
            >
              {t("nav.cta")}
            </Link>
          </div>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden bg-ink-50/95 backdrop-blur-xl transition-all duration-300 md:hidden border-b border-ink-100/50 ${
          mobileOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-4 py-4">
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
        </ul>
      </div>
    </header>
  );
}
