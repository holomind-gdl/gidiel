import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import { Navbar, Footer } from "@/components/sections";
import AnimatedOrbs from "@/components/ui/AnimatedOrbs";
import CaseStudy from "@/components/work/CaseStudy";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.content.en.title} — GiDieL`,
    description: project.content.en.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <AnimatedOrbs />
      <Navbar />
      <main className="relative z-10">
        <CaseStudy project={project} />
      </main>
      <Footer />
    </>
  );
}
