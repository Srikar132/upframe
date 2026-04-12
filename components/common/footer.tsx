"use client";

const Footer = () => {
  return (
    <section className="z-50 w-full h-screen common-section-light px-10 py-16 flex flex-col">
      
      {/* Top border */}
      <div className="w-full h-px bg-black/30" />

      {/* Content */}
      <div className="flex justify-between mt-10">
        
        {/* LEFT - MENU */}
        <div className="flex flex-col gap-6">
          <p className="text-sm uppercase tracking-wide">(Menu)</p>

          <div className="flex flex-col gap-4 text-xl">
            <a href="#">Home</a>
            <a href="#">Portfolio</a>
            <a href="#">My process</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>
        </div>

        {/* CENTER - SOCIALS */}
        <div className="flex flex-col gap-6">
          <p className="text-sm uppercase tracking-wide">(Socials)</p>

          <div className="flex flex-col gap-4 text-xl">
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
            <a href="#">Dribbble</a>
          </div>
        </div>

        {/* RIGHT - CONTACT */}
        <div className="flex flex-col gap-6 items-end text-right">
          <p className="text-sm uppercase tracking-wide">(Say "Hello")</p>

          <a
            href="mailto:hello@bogdankolomiyets.com"
            className="text-xl"
          >
            abc@xyz.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default Footer;