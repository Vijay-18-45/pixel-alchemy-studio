import { useEffect, useRef } from "react";
import type LenisType from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Smooth scrolling using Lenis on desktop, synced with GSAP ScrollTrigger.
 *
 * - On touch/coarse-pointer devices we deliberately skip Lenis so the
 *   browser's native momentum scrolling stays buttery smooth.
 * - Respects `prefers-reduced-motion`.
 * - Uses a single light `lerp` (no `duration`) which is the recommended
 *   high-performance Lenis config.
 */
export function useLenis() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    // Touch devices have excellent native scroll. Lenis on touch causes
    // perceived lag because it overrides the browser's momentum physics.
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)")
      .matches;
    if (isTouch) {
      // Still let ScrollTrigger work with the native scroll.
      ScrollTrigger.refresh();
      return;
    }

    let lenis: LenisType | undefined;
    let cleanup: (() => void) | undefined;

    (async () => {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({
        // A single lerp value gives the smoothest, lowest-latency feel.
        // Higher = snappier, lower = more glide. 0.12 is a sweet spot.
        lerp: 0.12,
        smoothWheel: true,
        wheelMultiplier: 1,
        // Disable Lenis touch handling — fall back to native scroll on
        // any device that does fire touch events on a hybrid laptop.
        syncTouch: false,
      });

      // Drive Lenis from GSAP's ticker so they share one rAF loop.
      const onTick = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      lenis.on("scroll", ScrollTrigger.update);
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
