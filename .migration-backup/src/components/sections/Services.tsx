import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Briefcase,
  ForkKnife,
  Buildings,
  ShoppingBag,
  CalendarCheck,
  RocketLaunch,
  UserCircle,
  ArrowsClockwise,
  ArrowUpRight,
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: Briefcase, title: "Business Website Design", desc: "Modern, conversion-focused sites that establish authority for your brand." },
  { icon: ForkKnife, title: "Restaurant / Café Website", desc: "Menus, reservations, and stunning food showcases that bring diners in." },
  { icon: Buildings, title: "Real Estate Website", desc: "Listings, search, and lead capture optimised for property buyers." },
  { icon: ShoppingBag, title: "E-commerce Store", desc: "Fast, secure online stores built to maximise checkout conversion." },
  { icon: CalendarCheck, title: "Booking / Appointment", desc: "Automated booking systems that work 24/7 for your clients." },
  { icon: RocketLaunch, title: "Landing Pages for Ads", desc: "High-converting pages tuned for Google & Meta ad campaigns." },
  { icon: UserCircle, title: "Portfolio Websites", desc: "Premium personal sites that get you noticed by clients & employers." },
  { icon: ArrowsClockwise, title: "Website Redesign", desc: "Transform outdated websites into modern, mobile-ready powerhouses." },
];

const Services = () => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.from(".service-card", {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={root} className="relative py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-primary/80 mb-4">
            Services
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Premium Websites,
            <br />
            <span className="text-gradient">Built for Results</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Every website I build is designed to look incredible and convert visitors into paying
            customers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {services.map(({ icon: Icon, title, desc }, i) => (
            <article
              key={title}
              className={`service-card group glass border-glow rounded-3xl p-6 md:p-7 flex flex-col gap-4 transition-all duration-500 hover:-translate-y-2 hover:shadow-glow-primary ${
                i === 0 ? "lg:row-span-2 lg:col-span-2 lg:p-10" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow-soft">
                  <Icon size={22} weight="duotone" />
                </div>
                <ArrowUpRight
                  size={20}
                  className="text-muted-foreground opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                />
              </div>

              <div className="flex-1">
                <h3 className={`font-display font-semibold ${i === 0 ? "text-2xl md:text-3xl" : "text-lg md:text-xl"}`}>
                  {title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-glow transition-colors"
              >
                Get Quote
                <ArrowUpRight size={16} weight="bold" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
