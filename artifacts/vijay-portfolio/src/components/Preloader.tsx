import { useEffect, useState } from "react";
import { gsap } from "gsap";

interface Props {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: Props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? 200 : 500;
    const start = performance.now();

    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else finish();
    };
    raf = requestAnimationFrame(tick);

    const finish = () => {
      const tl = gsap.timeline({
        onComplete: () => onComplete(),
      });
      tl.to(".preloader-bar", { opacity: 0, duration: 0.4, ease: "power2.out" })
        .to(
          ".preloader-content",
          { scale: 0.95, opacity: 0, duration: 0.6, ease: "power3.inOut" },
          "<0.1"
        )
        .to(
          ".preloader",
          { opacity: 0, duration: 0.6, ease: "power2.inOut" },
          "<0.1"
        );
    };

    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <div
      className="preloader fixed inset-0 z-[100] flex items-center justify-center bg-background"
      style={{ backgroundImage: "var(--gradient-mesh)" }}
    >
      <div className="absolute inset-0 grid-glow opacity-40" />
      <div className="preloader-content relative z-10 flex flex-col items-center px-6 text-center">
        <h1 className="font-display text-4xl md:text-6xl font-bold text-gradient pulse-glow">
          Vijay Bhemavarapu
        </h1>
        <p className="mt-4 text-sm md:text-base text-muted-foreground tracking-wide">
          Building Premium Websites for Businesses
        </p>

        <div className="preloader-bar mt-12 w-64 md:w-96">
          <div className="h-[2px] w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-gradient-primary transition-[width] duration-100 ease-out"
              style={{ width: `${progress}%`, boxShadow: "var(--glow-primary)" }}
            />
          </div>
          <div className="mt-3 flex justify-between text-xs font-mono text-muted-foreground">
            <span>LOADING</span>
            <span className="text-foreground">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
