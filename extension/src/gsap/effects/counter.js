import { gsap } from "gsap";

export default function registerCounterEffect() {
  gsap.registerEffect({
    name: "counter",
    extendTimeline: true,
    defaults: {
      end: 20,
      duration: 3,
      ease: "power1",
      increment: 1,
    },
    effect: (targets, config) => {
      let tl = gsap.timeline();
      let num = targets[0].innerText.replace(/,/g, "");
      targets[0].innerText = num;

      tl.to(targets, {
        duration: config.duration,
        innerText: config.end,
        modifiers: {
          innerText: (innerText) =>
            gsap.utils
              .snap(config.increment, innerText)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        ease: config.ease,
      });

      return tl;
    },
  });
}
