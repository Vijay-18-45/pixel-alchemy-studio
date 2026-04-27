import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, TrendUp, Storefront, Sparkle, MagnifyingGlass } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: ShieldCheck, num: 92, suffix: "%", label: "Build Trust", desc: "of users judge a business by its website." },
  { icon: TrendUp, num: 3, suffix: "x", label: "Get More Leads", desc: "more leads with a conversion-tuned site." },
  { icon: Storefront, num: 24, suffix: "/7", label: "Sales Machine", desc: "your website never sleeps or takes a break." },
  { icon: Sparkle, num: 75, suffix: "%", label: "Better Brand Image", desc: "of customers trust modern-looking brands." },
  { icon: MagnifyingGlass, num: 88, suffix: "%", label: "Google Visibility", desc: "of buyers research online before purchase." },
];

const Counter = ({ to, suffix }: { to: number; suffix: string }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVal(to);
      return;
    }
    if (!ref.current) return;
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: to,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      onUpdate: () => setVal(Math.round(obj.v)),
    });
    return () => {
      tween.kill();
    };
  }, [to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
};

const WhyWebsite = () => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      // Heading falls from above
      gsap.from(".why-heading > *", {
        y: -50,
        opacity: 0,
        duration: 1.0,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
        clearProps: "transform,opacity",
      });

      // Stat cards fade-up and converge from center
      gsap.from(".why-stat", {
        y: 60,
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        stagger: { each: 0.1, from: "center" },
        ease: "power3.out",
        scrollTrigger: { trigger: ".why-grid", start: "top 80%" },
        clearProps: "transform,opacity",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="why-heading text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-primary/80 mb-4">
            Why Now
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Your Customers
            <br />
            <span className="text-gradient">Search Online First</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            In 2026, no website means no business. Here's what a premium site actually does for you.
          </p>
        </div>

        <div className="why-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map(({ icon: Icon, num, suffix, label, desc }) => (
            <div
              key={label}
              className="why-stat glass border-glow rounded-3xl p-6 flex flex-col items-start gap-3 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="inline-flex items-center justify-center h-11 w-11 rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow-soft">
                <Icon size={20} weight="duotone" />
              </div>
              <div className="font-display text-3xl md:text-4xl font-bold text-gradient">
                <Counter to={num} suffix={suffix} />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{label}</div>
                <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyWebsite;
