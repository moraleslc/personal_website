import Image from "next/image";
import Hero from "@/components/Hero";
import About from "@/components/About";

export default function Home() {
  return (
    <main className="relative w-full flex flex-col items-center justify-center">
      {/* Hero */}
      <section id="hero" className="snap-start">
        <Hero />

      </section>


      {/* About */}
      <section id='about' className="snap-center">
        <About />
      </section>
    </main>
  );
}
