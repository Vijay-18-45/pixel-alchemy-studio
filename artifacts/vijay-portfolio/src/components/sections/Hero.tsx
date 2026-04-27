import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { RocketLaunch, ChatCircleDots } from "@phosphor-icons/react";

const Hero = () => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Cinematic entry: every element flies in from a different angle
      // and converges to its final position.
      tl.from(".hero-eyebrow", {
        y: -120,
        scale: 0.6,
        opacity: 0,
        rotate: -8,
        duration: 2.2,
        ease: "expo.out",
      })
        .from(
          ".hero-title-line:nth-child(1)",
          {
            x: -300,
            y: 40,
            opacity: 0,
            scale: 1.15,
            rotate: -4,
            filter: "blur(14px)",
            duration: 2.8,
            ease: "expo.out",
          },
          "-=1.4",
        )
        .from(
          ".hero-title-line:nth-child(2)",
          {
            x: 300,
            y: -40,
            opacity: 0,
            scale: 1.15,
            rotate: 4,
            filter: "blur(14px)",
            duration: 2.8,
            ease: "expo.out",
          },
          "-=2.4",
        )
        .from(
          ".hero-sub",
          {
            y: 80,
            scale: 0.92,
            opacity: 0,
            filter: "blur(8px)",
            duration: 2.2,
            ease: "expo.out",
          },
          "-=1.8",
        )
        .from(
          ".hero-cta",
          {
            y: 60,
            scale: 0.7,
            opacity: 0,
            duration: 1.8,
            stagger: { each: 0.24, from: "center" },
            ease: "back.out(1.8)",
          },
          "-=1.6",
        )
        .from(
          ".hero-stat",
          {
            y: 80,
            scale: 0.6,
            opacity: 0,
            duration: 1.8,
            stagger: { each: 0.24, from: "center" },
            ease: "back.out(1.6)",
          },
          "-=1.2",
        );

      gsap.to(".orb-1", { y: -30, x: 20, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".orb-2", { y: 25, x: -15, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".orb-3", { y: -20, x: -25, duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={root}
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden"
    >
      {/* Background visuals */}
      <div className="absolute inset-0 grid-glow opacity-50" />
      <div className="orb-1 absolute top-24 -left-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
      <div className="orb-2 absolute bottom-20 -right-20 h-96 w-96 rounded-full bg-secondary/25 blur-3xl" />
      <div className="orb-3 absolute top-1/2 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute block h-1 w-1 rounded-full bg-primary/60"
            style={{
              top: `${(i * 53) % 100}%`,
              left: `${(i * 71) % 100}%`,
              boxShadow: "0 0 10px hsl(var(--primary))",
              animation: `float ${1.5 + (i % 5) * 0.4}s ease-in-out ${i * 0.1}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="hero-eyebrow inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
          Available for new projects · 2026
        </div>

        <h1 className="font-display font-bold leading-[1.05] text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight max-w-5xl mx-auto">
          <span className="hero-title-line block">I Build Websites</span>
          <span className="hero-title-line block text-gradient">That Grow Businesses</span>
        </h1>

        <p className="hero-sub mx-auto mt-8 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
          Hi, I'm <span className="text-foreground font-medium">Vijay Bhemavarapu</span> — a web
          developer helping businesses, brands, and local companies create premium websites that
          convert visitors into customers.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hero-cta btn-premium btn-lg w-full sm:w-auto"
          >
            <RocketLaunch size={20} weight="fill" />
            Get Your Website
          </a>
          <a
            href="https://wa.me/918367592895"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta btn-ghost-premium btn-lg w-full sm:w-auto"
          >
            <ChatCircleDots size={20} weight="fill" />
            DM Us
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
          {[
            { num: "50+", label: "Websites Delivered" },
            { num: "100%", label: "Client Focus" },
            { num: "24/7", label: "Online Sales" },
          ].map((s) => (
            <div key={s.label} className="hero-stat text-center">
              <div className="font-display text-2xl md:text-4xl font-bold text-gradient">{s.num}</div>
              <div className="mt-1 text-xs md:text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
