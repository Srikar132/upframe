import Navbar from "@/components/common/navbar";
import Intro from "@/components/common/intro";
import Hero from "@/components/main/hero";
import Image from "next/image";
import HowWeApproach from "@/components/main/how-we-approach";
import OurWorks from "@/components/main/our-works";
import About from "@/components/main/about";
import SayOkay from "@/components/main/say-okay";
import Footer from "@/components/common/footer";

export default function Home() {
  return (
    <>
      <Intro />

      <main className="w-full min-h-screen relative bg-background">
        <Navbar />

        {/* hero section */}
        <Hero/>
        {/* what we build */}
        <HowWeApproach/>

        {/* our works */}
        <OurWorks/>

        {/* about */}
        <About />


        {/* say yes */}
        <SayOkay/>

        {/* footer */}
        <Footer />
      </main>
    </>
  );
}
