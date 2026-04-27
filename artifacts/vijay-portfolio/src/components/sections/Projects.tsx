import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Barbell, Tooth, ForkKnife, Buildings, Scissors, Rocket } from "@phosphor-icons/react";
import gym from "@/assets/project-gym.jpg";
import dental from "@/assets/project-dental.jpg";
import restaurant from "@/assets/project-restaurant.jpg";
import realestate from "@/assets/project-realestate.jpg";
import salon from "@/assets/project-salon.jpg";
import techstartup from "@/assets/project-techstartup.jpg";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    img: gym,
    icon: Barbell,
    industry: "Gym / Fitness",
    name: "PulseFit Studio",
    desc: "Class schedules, trainer profiles, and membership signups.",
    accent: "from-fuchsia-500/40 to-purple-600/40",
  },
  {
    img: dental,
    icon: Tooth,
    industry: "Dental Clinic",
    name: "Bright Smile Dental",
    desc: "Online appointments, treatment menus, and patient reviews.",
    accent: "from-sky-500/40 to-indigo-600/40",
  },
  {
    img: restaurant,
    icon: ForkKnife,
    industry: "Restaurant",
    name: "Spice Route Café",
    desc: "Digital menu, table reservations, and food photography.",
    accent: "from-amber-500/40 to-pink-600/40",
  },
  {
    img: realestate,
    icon: Buildings,
    industry: "Real Estate",
    name: "Skyline Realty",
    desc: "Property listings, virtual tours, and lead capture.",
    accent: "from-emerald-500/40 to-teal-600/40",
  },
  {
    img: salon,
    icon: Scissors,
    industry: "Salon / Spa",
    name: "Velvet Beauty Lounge",
    desc: "Service catalog, instant bookings, and stylist showcase.",
    accent: "from-rose-500/40 to-fuchsia-600/40",
  },
  {
    img: techstartup,
    icon: Rocket,
    industry: "Tech Startup",
    name: "Nimbus Cloud",
    desc: "Product landing, pricing tiers, and demo signups.",
    accent: "from-violet-500/40 to-blue-600/40",
  },
];

const Projects = () => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      // Project cards fade-up and converge into the grid
      gsap.from(".project-card", {
        y: 80,
        scale: 0.92,
        opacity: 0,
        duration: 1.4,
        stagger: { each: 0.12, from: "center" },
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
        clearProps: "transform,opacity",
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

        <div className="relative mx-auto max-w-6xl">
          {/* Soft glowing gradient behind the grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(60% 50% at 30% 20%, hsl(265 95% 60% / 0.25), transparent 70%), radial-gradient(60% 50% at 80% 80%, hsl(220 95% 55% / 0.22), transparent 70%)",
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 justify-items-stretch">
            {projects.map((p) => {
              const Icon = p.icon;
              return (
                <article
                  key={p.name}
                  className="project-card group relative flex flex-col overflow-hidden rounded-[24px] glass border-glow transition-all duration-500 will-change-transform hover:-translate-y-2 hover:scale-[1.03] hover:shadow-glow-primary"
                >
                  {/* Accent halo behind card on hover */}
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -inset-px rounded-[24px] bg-gradient-to-br ${p.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    style={{ filter: "blur(28px)", zIndex: -1 }}
                  />

                  {/* Thumbnail / mockup */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={p.img}
                      alt={`${p.name} — ${p.industry} website preview`}
                      width={1024}
                      height={640}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover will-change-transform transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90" />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-0 group-hover:opacity-50 transition-opacity duration-500 mix-blend-screen`}
                    />
                    {/* Industry chip */}
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full glass px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/90">
                      <Icon size={12} weight="fill" />
                      {p.industry}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="relative p-6 md:p-7 flex flex-col gap-3 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-xl md:text-[1.35rem] font-semibold leading-tight">
                        {p.name}
                      </h3>
                      <ArrowUpRight
                        size={20}
                        className="shrink-0 text-muted-foreground group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1 transition-all"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>

                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="btn-ghost-premium mt-auto self-start"
                    >
                      View Project
                      <ArrowUpRight size={16} weight="bold" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
