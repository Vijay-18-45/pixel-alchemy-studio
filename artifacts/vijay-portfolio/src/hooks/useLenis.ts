import { useEffect, useRef } from "react";
import type LenisType from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Buttery-smooth scrolling using Lenis, synced with GSAP ScrollTrigger so
 * scroll-triggered animations fire at the right moment. Respects
 * prefers-reduced-motion.
 */
export function useLenis() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let lenis: LenisType | undefined;
    let cleanup: (() => void) | undefined;

    (async () => {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({
        // Higher duration + custom easing = premium, agency-grade feel
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        lerp: 0.085,
      });

      // Drive Lenis from GSAP's ticker so it shares a single rAF loop with
      // ScrollTrigger — this prevents jitter and missed triggers.
      const onTick = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      // Notify ScrollTrigger on every Lenis scroll so its progress stays in
      // perfect sync with the smoothed scroll position.
      lenis.on("scroll", ScrollTrigger.update);

      // Recompute trigger positions after layout is fully painted.
      ScrollTrigger.refresh();

      cleanup = () => {
        gsap.ticker.remove(onTick);
        lenis?.destroy();
      };
    })();

    return () => {
      cleanup?.();
    };
  }, []);
}
