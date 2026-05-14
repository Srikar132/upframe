import Navbar from "@/components/shared/navbar";
import Hero from "@/components/main/hero";
import About from "@/components/main/about";
import Footer from "@/components/shared/footer";
import OurServices from "@/components/main/our-services";
import OurWorks from "@/components/main/our-works";

export default async function Home() {
  return (
    <>
      <main className="w-full min-h-screen relative bg-background">
        <Navbar />

        {/* hero section */}
        <Hero />

        <OurServices />

        {/* what we build */}
        {/* <HowWeApproach /> */}

        {/* our works */}
        <OurWorks />

        {/* about */}
        <About />


        {/* say yes */}
        {/* <SayOkay /> */}

        {/* footer */}
        <Footer />
      </main>
    </>
  );
}
