import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

export default function registerSplitWordsEffect() {
  gsap.registerEffect({
    name: "splitWords",
    extendTimeline: true,
    defaults: {
      y: -100,
      opacity: 0,
      rotation: "random(-30, 30)",
      duration: 2,
      ease: "back",
      stagger: 0.15,
    },
    effect: (targets, config) => {
      const split = new SplitText(targets, { type: "lines" });
      const tl = gsap.timeline();

      tl.from(split.lines, {
        y: config.y,
        opacity: config.opacity,
        rotation: config.rotation,
        duration: config.duration,
        ease: config.ease,
        stagger: config.stagger,
        onComplete: () => {
          gsap.set(el, { clearProps: "all" });
        },
      });

      return tl;
    },
  });
}
