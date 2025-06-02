import { SplitText } from "gsap/SplitText";
import { gsap } from "gsap";

export const registerAllEffects = () => {
  gsap.registerPlugin(SplitText);

  const modules = import.meta.glob("./effects/*.js", { eager: true });
  Object.values(modules).forEach((mod) => {
    if (typeof mod.default === "function") {
      mod.default();
    }
  });
};
