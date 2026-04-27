import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MagnifyingGlass,
  Crown,
  TrendUp,
  Lightning,
  DeviceMobile,
  Storefront,
  ChartLineUp,
  Headset,
} from "@phosphor-icons/react";
import portrait from "@/assets/developer-portrait.jpg";

gsap.registerPlugin(ScrollTrigger);

const offerings = [
  { icon: MagnifyingGlass, label: "SEO Ready" },
  { icon: Crown, label: "Premium Design" },
  { icon: TrendUp, label: "More Leads" },
  { icon: Lightning, label: "Blazing Fast" },
  { icon: DeviceMobile, label: "Mobile First" },
  { icon: Storefront, label: "Sells 24/7" },
  { icon: ChartLineUp, label: "Growth Focused" },
  { icon: Headset, label: "Always On Support" },
];

const About = () => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const trigger = { trigger: root.current, start: "top 75%" };

      // Portrait slides in from the left
      gsap.from(".about-img", {
        x: -120,
        scale: 0.9,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: trigger,
        clearProps: "transform,opacity",
      });

      // Heading + paragraphs cascade in from the right
      gsap.from(".about-content > *", {
        x: 80,
        y: 30,
        opacity: 0,
        duration: 1.0,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: trigger,
        clearProps: "transform,opacity",
      });

      // Offering chips burst from the center outward
      gsap.from(".offering-item", {
        scale: 0.6,
        opacity: 0,
        duration: 0.8,
        stagger: { each: 0.06, from: "center" },
        ease: "back.out(1.8)",
        scrollTrigger: { trigger: ".offerings-grid", start: "top 85%" },
        clearProps: "transform,opacity",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="relative py-20 sm:py-24 md:py-32">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="about-img flex justify-center lg:justify-start">
            <div className="relative group">
              <div className="absolute -inset-4 rounded-full bg-gradient-aurora opacity-60 blur-2xl group-hover:opacity-90 transition-opacity duration-500" />
              <div className="relative h-56 w-56 sm:h-72 sm:w-72 md:h-96 md:w-96 rounded-full overflow-hidden border-2 border-primary/40 shadow-glow-primary transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-1">
                <img
                  src={portrait}
                  alt="Vijay Bhemavarapu — web developer portrait"
                  width={768}
                  height={768}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 glass-strong rounded-2xl px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium">
                <span className="text-gradient font-semibold">3+ years</span>
                <span className="text-muted-foreground"> · building</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="about-content">
            <span className="inline-block text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-primary/80 mb-3 sm:mb-4">
              About Me
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Why <span className="text-gradient">Work With Me?</span>
            </h2>
            <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
              I build fast, modern, mobile-friendly business websites designed to attract leads,
              build trust, and increase sales. Every pixel is crafted with conversion in mind.
            </p>

            <div className="offerings-grid mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4">
              {offerings.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="offering-item glass border-glow rounded-2xl p-3 md:p-4 flex flex-col items-center text-center gap-2 hover:-translate-y-1 transition-transform duration-300"
                >
                  <Icon size={24} weight="duotone" className="text-primary" />
                  <span className="text-[11px] md:text-xs font-medium text-muted-foreground leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
