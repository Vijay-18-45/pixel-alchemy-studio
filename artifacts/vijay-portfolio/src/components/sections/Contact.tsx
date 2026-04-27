import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  EnvelopeSimple,
  Phone,
  PaperPlaneTilt,
  WhatsappLogo,
  GithubLogo,
  LinkedinLogo,
  InstagramLogo,
} from "@phosphor-icons/react";
import { toast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const root = useRef<HTMLDivElement>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      // Heading column flies in from the left with rotation
      gsap.from(".contact-heading > *", {
        x: -260,
        y: (i) => (i % 2 === 0 ? -60 : 60),
        rotate: -6,
        scale: 0.85,
        opacity: 0,
        filter: "blur(12px)",
        duration: 2.2,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
        clearProps: "transform,filter",
      });

      // Form fields cascade in from the right and converge
      gsap.from(".contact-input", {
        x: 240,
        y: (i) => (i % 2 === 0 ? -40 : 40),
        scale: 0.85,
        rotate: 4,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1.9,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: ".contact-form", start: "top 80%" },
        clearProps: "transform,filter",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Message sent ✨",
        description: "Thanks! Vijay will get back to you within 24 hours.",
      });
      (e.target as HTMLFormElement).reset();
      setSubmitting(false);
    }, 800);
  };

  return (
    <section id="contact" ref={root} className="relative py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Heading + info */}
          <div className="lg:col-span-2 contact-heading">
            <span className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-primary/80 mb-4">
              Get In Touch
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Let's Build Your
              <br />
              <span className="text-gradient">Business Website</span>
            </h2>
            <p className="mt-5 text-muted-foreground max-w-md">
              Tell me about your business — I'll send back ideas, a timeline, and a clear quote
              within 24 hours.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href="mailto:vijayjosephchinni367@gmail.com"
                className="flex items-center gap-3 group"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl glass border-glow text-primary group-hover:shadow-glow-soft transition-shadow">
                  <EnvelopeSimple size={18} weight="duotone" />
                </span>
                <div>
                  <div className="text-xs text-muted-foreground">Email</div>
                  <div className="text-sm text-foreground">vijayjosephchinni367@gmail.com</div>
                </div>
              </a>
              <a href="tel:8367592895" className="flex items-center gap-3 group">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl glass border-glow text-primary group-hover:shadow-glow-soft transition-shadow">
                  <Phone size={18} weight="duotone" />
                </span>
                <div>
                  <div className="text-xs text-muted-foreground">Phone</div>
                  <div className="text-sm text-foreground">+91 83675 92895</div>
                </div>
              </a>
            </div>

            <div className="mt-8 flex gap-3">
              {[
                { Icon: GithubLogo, href: "https://github.com", label: "GitHub" },
                { Icon: LinkedinLogo, href: "https://linkedin.com", label: "LinkedIn" },
                { Icon: InstagramLogo, href: "https://instagram.com", label: "Instagram" },
                { Icon: WhatsappLogo, href: "https://wa.me/918367592895", label: "WhatsApp" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl glass border-glow text-muted-foreground hover:text-primary hover:shadow-glow-soft transition-all"
                >
                  <Icon size={18} weight="duotone" />
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={onSubmit}
            className="contact-form lg:col-span-3 glass-strong border-glow rounded-3xl p-6 md:p-10 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field name="name" label="Name" placeholder="Your name" />
              <Field name="business" label="Business Name" placeholder="Your business" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field name="email" label="Email" type="email" placeholder="you@email.com" />
              <Field name="phone" label="Mobile Number" type="tel" placeholder="+91 ..." />
            </div>
            <div className="contact-input">
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Tell me about your business and what you need..."
                className="w-full rounded-2xl bg-input/60 border border-border focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="btn-premium btn-lg flex-1 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <PaperPlaneTilt size={18} weight="fill" />
                {submitting ? "Sending..." : "Send Message"}
              </button>
              <a
                href="https://wa.me/918367592895"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-premium btn-lg"
              >
                <WhatsappLogo size={18} weight="fill" className="text-secondary" />
                WhatsApp DM Us
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const Field = ({
  name,
  label,
  type = "text",
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}) => (
  <div className="contact-input">
    <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
    <input
      name={name}
      type={type}
      required
      placeholder={placeholder}
      className="w-full rounded-2xl bg-input/60 border border-border focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all"
    />
  </div>
);

export default Contact;
