import { useEffect, useRef, useState } from "react";
import { Star } from "@phosphor-icons/react";

const testimonials = [
  {
    quote: "Vijay delivered our restaurant website in under two weeks. Bookings doubled in the first month — it looks absolutely premium.",
    name: "Priya Sharma",
    role: "Owner, Spice Route Café",
  },
  {
    quote: "Professional, fast, and incredibly easy to work with. Our business looks completely different now — clients take us seriously.",
    name: "Rahul Mehta",
    role: "Founder, Mehta Realty",
  },
  {
    quote: "Helped us get more customers than we ever expected. The booking system alone is saving us hours every week.",
    name: "Dr. Anjali Rao",
    role: "Skin & Wellness Clinic",
  },
  {
    quote: "Beautiful design, fast loading, and the SEO work has us ranking on page one. Best investment we made this year.",
    name: "Karthik Iyer",
    role: "Director, Iyer Constructions",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused]);

  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-primary/80 mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Loved by <span className="text-gradient">Business Owners</span>
          </h2>
        </div>

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative h-[280px] md:h-[240px]">
            {testimonials.map((t, i) => (
              <article
                key={t.name}
                className={`absolute inset-0 glass-strong border-glow rounded-3xl p-8 md:p-12 flex flex-col justify-center transition-all duration-700 ${
                  i === index
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={18} weight="fill" className="text-primary" />
                  ))}
                </div>
                <p className="font-display text-lg md:text-2xl leading-relaxed text-foreground">
                  "{t.quote}"
                </p>
                <div className="mt-6">
                  <div className="font-semibold text-foreground">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </article>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-gradient-primary" : "w-1.5 bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
