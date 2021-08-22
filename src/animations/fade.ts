const easing = [0.6, -0.05, 0.01, 0.99];

export const fade = {
  initial: {
    opacity: 0,
    transition: {
      ease: easing
    }
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 2,
      ease: easing
    }
  }
};

export const fadeLeft = {
  initial: {
    x: -80,
    opacity: 0,
    transition: {
      ease: easing
    }
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: easing
    }
  }
}
