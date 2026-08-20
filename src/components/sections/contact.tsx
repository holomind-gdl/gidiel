"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useTranslation, useTranslationValue } from "@/context/LanguageContext";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Contact() {
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const { t } = useTranslation();
  const getValue = useTranslationValue();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      budget: formData.get("budget"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setFormStatus("success");
        form.reset();
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <Section id="contact">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            eyebrow={t("contact.eyebrow")}
            title={t("contact.title")}
            subtitle={t("contact.subtitle")}
          />

          <ul className="space-y-4">
            {(getValue("contact.benefits") as string[]).map((benefit, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="flex items-center gap-3 text-ink-700"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                {benefit}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-ink-700 mb-2"
                >
                  {t("contact.form.nameLabel")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  placeholder={t("contact.form.namePlaceholder") as string}
                  className="input-base"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-ink-700 mb-2"
                >
                  {t("contact.form.emailLabel")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder={t("contact.form.emailPlaceholder") as string}
                  className="input-base"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-ink-700 mb-2"
                >
                  {t("contact.form.companyLabel")}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  autoComplete="organization"
                  placeholder={t("contact.form.companyPlaceholder") as string}
                  className="input-base"
                />
              </div>
              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-ink-700 mb-2"
                >
                  {t("contact.form.budgetLabel")}
                </label>
                <select
                  id="budget"
                  name="budget"
                  className="input-base"
                >
                  <option value="">{t("contact.form.budgetPlaceholder") as string}</option>
                  {(getValue("contact.form.budgetOptions") as Array<{value: string; label: string}>).map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-ink-700 mb-2"
              >
                {t("contact.form.messageLabel")}
              </label>
              <textarea
                id="message"
                name="message"
                autoComplete="off"
                required
                rows={5}
                placeholder={t("contact.form.messagePlaceholder") as string}
                className="input-base resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={formStatus === "loading" || formStatus === "success"}
              className="inline-flex items-center justify-center gap-2 rounded-full btn-ink px-8 py-3.5 text-sm font-medium btn-ink-shadow"
            >
              {formStatus === "loading" ? (
                t("contact.form.submitLoading")
              ) : formStatus === "success" ? (
                t("contact.form.submitSuccess")
              ) : (
                <>
                  {t("contact.form.submitIdle")}
                  <Send className="h-4 w-4" />
                </>
              )}
            </button>

            {formStatus === "success" && (
              <p className="text-sm text-green-600">
                {t("contact.form.successMessage")}
              </p>
            )}
            {formStatus === "error" && (
              <p className="text-sm text-red-600">
                {t("contact.form.errorMessage")}
              </p>
            )}

            <p className="text-sm text-ink-500">
              {t("contact.form.reassurance")} {" "}
              <a
                href="mailto:hello@gidiel.studio"
                className="font-medium text-ink-700 underline decoration-ink-300 underline-offset-4 transition-colors hover:text-rose-500"
              >
                {t("contact.form.emailFallback")}
              </a>
            </p>
          </form>
        </motion.div>
      </div>
    </Section>
  );
}
