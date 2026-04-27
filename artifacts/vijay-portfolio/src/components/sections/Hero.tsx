import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { RocketLaunch, WhatsappLogo, ArrowRight } from "@phosphor-icons/react";

const Hero = () => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      // Background orbs sweep in from far edges and settle behind everything
      gsap.from(".orb-1", {
        x: -600,
        y: -400,
        scale: 0.2,
        opacity: 0,
        duration: 3.2,
        ease: "expo.out",
      });
      gsap.from(".orb-2", {
        x: 600,
        y: 400,
        scale: 0.2,
        opacity: 0,
        duration: 3.4,
        ease: "expo.out",
      });
      gsap.from(".orb-3", {
        scale: 0.1,
        opacity: 0,
        duration: 3.6,
        ease: "expo.out",
      });

      // Particles burst in from a center implosion
      gsap.from(".hero-particle", {
        x: 0,
        y: 0,
        scale: 0,
        opacity: 0,
        duration: 2.4,
        stagger: { each: 0.08, from: "random" },
        ease: "power3.out",
        delay: 0.4,
      });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // Cinematic entry — every element flies in from a distinct angle
      // and converges to its final composition. Longer, slower, grander.
      tl.from(".hero-eyebrow", {
        y: -200,
        scale: 0.4,
        opacity: 0,
        rotate: -14,
        filter: "blur(12px)",
        duration: 3.0,
      })
        .from(
          ".hero-title-line:nth-child(1)",
          {
            x: -700,
            y: 120,
            opacity: 0,
            scale: 1.4,
            rotate: -10,
            skewX: 8,
            filter: "blur(24px)",
            duration: 4.2,
          },
          "-=2.2",
        )
        .from(
          ".hero-title-line:nth-child(2)",
          {
            x: 700,
            y: -120,
            opacity: 0,
            scale: 1.4,
            rotate: 10,
            skewX: -8,
            filter: "blur(24px)",
            duration: 4.2,
          },
          "-=3.8",
        )
        .from(
          ".hero-sub",
          {
            y: 160,
            scale: 0.85,
            opacity: 0,
            filter: "blur(14px)",
            duration: 3.4,
          },
          "-=2.6",
        )
        .from(
          ".hero-cta",
          {
            y: 140,
            scale: 0.5,
            opacity: 0,
            duration: 2.4,
            stagger: { each: 0.22, from: "center" },
            ease: "back.out(1.6)",
            clearProps: "transform,opacity",
          },
          "-=2.2",
        )
        .from(
          ".hero-stat",
          {
            y: 180,
            scale: 0.5,
            opacity: 0,
            duration: 2.2,
            stagger: { each: 0.28, from: "center" },
            ease: "back.out(1.5)",
            clearProps: "transform,opacity",
          },
          "-=1.6",
        )
        // Final "settle" pulse — a subtle breath after everything converges
        .to(
          ".hero-eyebrow, .hero-title-line, .hero-sub, .hero-cta, .hero-stat",
          {
            scale: 1.012,
            duration: 0.6,
            yoyo: true,
            repeat: 1,
            ease: "sine.inOut",
          },
          "-=0.4",
        );

      // Ambient float loop — kicks in after the entry animation completes
      gsap.to(".orb-1", {
        y: -30,
        x: 20,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 4,
      });
      gsap.to(".orb-2", {
        y: 25,
        x: -15,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 4,
      });
      gsap.to(".orb-3", {
        y: -20,
        x: -25,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 4,
      });
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
            className="hero-particle absolute block h-1 w-1 rounded-full bg-primary/60"
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

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hero-cta btn-premium btn-lg"
          >
            <RocketLaunch size={17} weight="fill" />
            Get Your Website
            <ArrowRight size={16} weight="bold" className="btn-arrow" />
          </a>
          <a
            href="https://wa.me/918367592895"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta btn-ghost-premium btn-lg"
          >
            <WhatsappLogo size={17} weight="fill" className="text-[#25D366]" />
            DM on WhatsApp
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
