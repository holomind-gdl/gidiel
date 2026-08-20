import {
  Navbar,
  Hero,
  BrandMarquee,
  Services,
  Work,
  Process,
  About,
  Testimonials,
  Contact,
  Footer,
} from "@/components/sections";
import AnimatedOrbs from "@/components/ui/AnimatedOrbs";
import TrustBadges from "@/components/ui/TrustBadges";

export default function Home() {
  return (
    <div id="top">
      <AnimatedOrbs />
      <Navbar />
      <main>
        <Hero />
        <TrustBadges />
        <BrandMarquee />
        <Services />
        <Work />
        <Process />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
