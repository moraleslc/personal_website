import Image from "next/image";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Blog from "@/components/Blog";

export default function Home() {
  return (
    <main className="relative w-full flex flex-col items-center justify-center">
      {/* Hero */}
      <section id="hero" className="snap-start">
        <Hero />
      </section>

      {/* Remaining sections */}
      <section id='about' className="snap-center">
        <About />
        <Experience />
        <Skills />
        <Blog />
      </section>
    </main>
  );
}
