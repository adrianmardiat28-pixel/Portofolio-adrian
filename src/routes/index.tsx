import { createFileRoute } from "@tanstack/react-router";
import { StarField } from "@/components/StarField";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Contact, Footer } from "@/components/sections/Contact";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Adrian Mardiat — Data Science & Web Developer Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Adrian Alrizqullah Mardiat, a Data Science & Information Systems student building data-driven and web experiences.",
      },
      { property: "og:title", content: "Adrian Mardiat — Portfolio" },
      {
        property: "og:description",
        content:
          "Data Science & Information Systems student. Selected projects: Kakak Saku, SafeSpace.",
      },
    ],
  }),
});

function Index() {
  useReveal();
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <StarField />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
