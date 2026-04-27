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

      gsap.from(".about-img", {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      gsap.from(".about-content > *", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      gsap.from(".offering-item", {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: ".offerings-grid", start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="relative py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="about-img flex justify-center lg:justify-start">
            <div className="relative group">
              <div className="absolute -inset-4 rounded-full bg-gradient-aurora opacity-60 blur-2xl group-hover:opacity-90 transition-opacity duration-500" />
              <div className="relative h-72 w-72 md:h-96 md:w-96 rounded-full overflow-hidden border-2 border-primary/40 shadow-glow-primary transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-1">
                <img
                  src={portrait}
                  alt="Vijay Bhemavarapu — web developer portrait"
                  width={768}
                  height={768}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 glass-strong rounded-2xl px-4 py-2 text-sm font-medium">
                <span className="text-gradient font-semibold">3+ years</span>
                <span className="text-muted-foreground"> · building</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="about-content">
            <span className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-primary/80 mb-4">
              About Me
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Why <span className="text-gradient">Work With Me?</span>
            </h2>
            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              I build fast, modern, mobile-friendly business websites designed to attract leads,
              build trust, and increase sales. Every pixel is crafted with conversion in mind.
            </p>

            <div className="offerings-grid mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
              {offerings.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="offering-item glass border-glow rounded-2xl p-3 md:p-4 flex flex-col items-center text-center gap-2 hover:-translate-y-1 transition-transform duration-300"
                >
                  <Icon size={26} weight="duotone" className="text-primary" />
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
