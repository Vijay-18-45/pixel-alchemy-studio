import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@phosphor-icons/react";
import restaurant from "@/assets/project-restaurant.jpg";
import gym from "@/assets/project-gym.jpg";
import clinic from "@/assets/project-clinic.jpg";
import salon from "@/assets/project-salon.jpg";
import construction from "@/assets/project-construction.jpg";
import store from "@/assets/project-store.jpg";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { img: restaurant, title: "Restaurant Website", desc: "Online menu, reservations, gallery.", stack: ["React", "Tailwind", "GSAP"] },
  { img: gym, title: "Gym Website", desc: "Class schedules, trainers, memberships.", stack: ["React", "Tailwind", "Framer"] },
  { img: clinic, title: "Doctor Clinic", desc: "Online booking & patient portal.", stack: ["Next.js", "Tailwind"] },
  { img: salon, title: "Salon Website", desc: "Service catalog & instant bookings.", stack: ["React", "Tailwind"] },
  { img: construction, title: "Construction Co.", desc: "Project portfolio & lead funnel.", stack: ["React", "GSAP"] },
  { img: store, title: "Online Store", desc: "Premium ecommerce with cart & checkout.", stack: ["Next.js", "Stripe"] },
];

const Projects = () => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      // Project cards fly in from random angles and merge into the grid
      gsap.from(".project-card", {
        x: (i) => [-320, 320, -240, 240, -180, 180][i % 6],
        y: (i) => [180, -180, 220, -160, 160, -200][i % 6],
        rotate: (i) => [-12, 12, -8, 8, -10, 10][i % 6],
        scale: 0.5,
        opacity: 0,
        filter: "blur(14px)",
        duration: 2.4,
        stagger: { each: 0.14, from: "center" },
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
        clearProps: "transform,filter",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={root} className="relative py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <span className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-primary/80 mb-4">
              Selected Work
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Real Websites,
              <br />
              <span className="text-gradient">Real Businesses</span>
            </h2>
          </div>
          <p className="text-muted-foreground md:text-right md:max-w-sm">
            A glimpse at the kind of premium business websites I build — yours could be next.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {projects.map((p) => (
            <article
              key={p.title}
              className="project-card group glass border-glow rounded-3xl overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={p.img}
                  alt={`${p.title} preview`}
                  width={1024}
                  height={640}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              </div>

              <div className="p-6 flex flex-col gap-3 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                  <ArrowUpRight
                    size={20}
                    className="text-muted-foreground group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1 transition-all"
                  />
                </div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-mono uppercase tracking-wider rounded-full border border-primary/30 px-2 py-0.5 text-primary/90"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="btn-ghost-premium mt-3"
                >
                  Get Similar Website
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
