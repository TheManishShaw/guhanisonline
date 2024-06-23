export default function getScrollAnimation() {
  return {
    offscreen: {
      y: 100,
      opacity: 0,
    },
    onscreen: ({ duration = 2 } = {}) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration,
      },
    }),
  };
}

export const fadeInFromBottomAnimation = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0, transition: { duration: 1 } },
  transition: { duration: 1 },
};
