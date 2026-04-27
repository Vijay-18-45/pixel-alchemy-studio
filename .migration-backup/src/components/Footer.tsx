import { GithubLogo, LinkedinLogo, InstagramLogo, WhatsappLogo } from "@phosphor-icons/react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const Footer = () => {
  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative pt-20 pb-10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-x-0 -top-20 h-96 bg-gradient-aurora opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="absolute block h-1 w-1 rounded-full bg-primary/50"
            style={{
              top: `${(i * 37) % 100}%`,
              left: `${(i * 61) % 100}%`,
              boxShadow: "0 0 8px hsl(var(--primary))",
              animation: `float ${7 + (i % 4)}s ease-in-out ${i * 0.4}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="glass-strong border-glow rounded-3xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <a href="#home" onClick={(e) => handleClick(e, "#home")} className="font-display text-2xl font-bold text-gradient">
                Vijay Bhemavarapu
              </a>
              <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                Premium business websites built to convert visitors into paying customers.
              </p>
            </div>

            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleClick(e, l.href)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground text-center sm:text-left">
              © 2026 Vijay Bhemavarapu — Premium Websites for Businesses
            </p>
            <div className="flex gap-2">
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
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground hover:text-primary hover:bg-white/5 transition-colors"
                >
                  <Icon size={16} weight="duotone" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
