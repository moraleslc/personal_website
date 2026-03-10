import Image from "next/image";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Blog from "@/components/Blog";

export default function Home() {
  return (
    <main className="relative w-screen flex flex-col items-start justify-center">
      {/* Hero */}
      <section id="hero" className="snap-start">
        <Hero />
      </section>

      {/* Remaining sections */}
        <About />
        <Experience />
        <Skills />
        <Blog />
    </main>
  );
}
