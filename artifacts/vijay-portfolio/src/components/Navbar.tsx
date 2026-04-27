import { useEffect, useState } from "react";
import { List, X, ArrowRight } from "@phosphor-icons/react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const handleClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div
          className={`container mx-auto flex items-center justify-between rounded-full px-5 md:px-7 transition-all duration-500 ${
            scrolled ? "glass-strong py-2.5 max-w-5xl" : "py-3"
          }`}
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleClick("#home");
            }}
            className="font-display text-base md:text-lg font-bold text-gradient"
          >
            Vijay.B
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(l.href);
                }}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleClick("#contact");
            }}
            className="hidden md:inline-flex btn-premium btn-sm"
          >
            Hire Me
            <ArrowRight size={14} weight="bold" className="btn-arrow" />
          </a>

          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <List size={24} weight="bold" />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-all duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-background/95 backdrop-blur-2xl"
          style={{ backgroundImage: "var(--gradient-mesh)" }}
        />
        <button
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="absolute top-6 right-6 z-10 p-2 text-foreground"
        >
          <X size={28} weight="bold" />
        </button>
        <nav className="relative z-10 flex h-full flex-col items-center justify-center gap-6">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => {
                e.preventDefault();
                handleClick(l.href);
              }}
              className="font-display text-3xl font-semibold text-foreground hover:text-gradient transition-all"
              style={{
                transform: open ? "translateY(0)" : "translateY(20px)",
                opacity: open ? 1 : 0,
                transition: `transform 0.5s ease ${i * 70}ms, opacity 0.5s ease ${i * 70}ms`,
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleClick("#contact");
            }}
            className="mt-4 btn-premium btn-lg"
          >
            Hire Me
          </a>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
