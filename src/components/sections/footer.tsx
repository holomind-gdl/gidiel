"use client";

import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { useTranslation, useTranslationValue } from "@/context/LanguageContext";
import Section from "@/components/ui/Section";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  const { t } = useTranslation();
  const getValue = useTranslationValue();

  const services = getValue("footer.services") as string[];
  const company = getValue("footer.company") as string[];
  const connectRaw = getValue("footer.connect") as Array<{label: string; abbr?: string; icon?: string}>;

  const companyAnchors = ["/#about", "/#work", "/#process", "/#contact"];

  const connectHref = (item: {label: string; abbr?: string; icon?: string}) => {
    if (item.icon === "mail") return "mailto:hello@gidiel.studio";
    if (item.icon === "map") return "/#contact";
    if (item.abbr === "IG") return "https://instagram.com";
    if (item.abbr === "LI") return "https://linkedin.com";
    return "/#contact";
  };

  return (
    <Section id="footer" className="!py-16 bg-ink-50 border-t border-ink-100" noAnimate>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
        <div className="col-span-2 md:col-span-1">
          <Link href="/#top" className="inline-block mb-4">
            <Logo size="sm" noAnimate />
          </Link>
          <p className="text-sm text-ink-600 mb-6 max-w-xs">
            {t("footer.tagline")}
          </p>
          <div className="flex items-center gap-4">
            {connectRaw.slice(0, 2).map((item) => (
              <a
                key={item.label}
                href={item.abbr === "IG" ? "https://instagram.com" : "https://linkedin.com"}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-600 transition-colors hover:border-rose-400 hover:text-rose-500"
              >
                <span className="text-xs font-semibold">
                  {item.abbr}
                </span>
              </a>
            ))}
            <a
              href="mailto:hello@gidiel.studio"
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-600 transition-colors hover:border-rose-400 hover:text-rose-500"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <div className="text-base font-semibold text-ink-900 mb-4 tracking-tight">
            <p>{t("footer.servicesHeader")}</p>
          </div>
          <ul className="space-y-3">
            {services.map((item) => (
              <li key={item}>
                <Link
                  href="/#services"
                  className="text-sm text-ink-600 transition-colors hover:text-rose-500"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-base font-semibold text-ink-900 mb-4 tracking-tight">
            <p>{t("footer.companyHeader")}</p>
          </div>
          <ul className="space-y-3">
            {company.map((item, i) => (
              <li key={item}>
                <Link
                  href={companyAnchors[i] ?? "/"}
                  className="text-sm text-ink-600 transition-colors hover:text-rose-500"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-base font-semibold text-ink-900 mb-4 tracking-tight">
            <p>{t("footer.connectHeader")}</p>
          </div>
          <ul className="space-y-3">
            {connectRaw.map((item) => (
              <li key={item.label}>
                <a
                  href={connectHref(item)}
                  target={item.abbr ? "_blank" : undefined}
                  rel={item.abbr ? "noreferrer" : undefined}
                  className="flex items-center gap-2 text-sm text-ink-600 transition-colors hover:text-rose-500"
                >
                  {item.icon === "mail" && <Mail className="h-4 w-4" />}
                  {item.icon === "map" && <MapPin className="h-4 w-4" />}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-ink-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm text-ink-500">
          {t("footer.copyright")}
        </p>
        <p className="text-sm text-ink-500">
          {t("footer.locations")}
        </p>
      </div>
    </Section>
  );
}
