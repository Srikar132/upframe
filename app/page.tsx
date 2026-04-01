import Navbar from "@/components/common/navbar";
import Intro from "@/components/common/intro";
import Hero from "@/components/main/hero";
import Image from "next/image";
import HowWeApproach from "@/components/main/how-we-approach";

export default function Home() {
  return (
    <>
      <Intro />

      <main className="w-full min-h-screen relative">
        <Navbar />

        {/* hero section */}
        <Hero/>
        {/* what we build */}
        <HowWeApproach/>
        {/* our works */}

        {/* about */}

        {/* say yes */}

        {/* fotter */}

      </main>
    </>
  );
}
