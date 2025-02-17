export const headerVarient = {
  hidden: {
    y: -100,
    opacity: 0.7,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
      delay: 0.5,
      duration: 1,
    },
  },
};

export const slideIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === "left" ? "-150%" : direction === "right" ? "150%" : 0,
    y: direction === "up" ? "100%" : direction === "down" ? "-100%" : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: {
      type,
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

export const staggerContainer = (staggerChildren, delayChildren) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const textVariant = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      ease: "easeIn",
    },
  },
};

export const fadeIn = (direction, type, delay, duration) => ({
  hidden: {
    opacity: 0,
    x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
    y: direction === "up" ? -100 : direction === "down" ? 100 : 0,
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type,
      delay: parseFloat(delay),
      duration,
      ease: "easeInOut",
    },
  },
});

export const zoomIn = (delay, duration) => ({
  hidden: {
    scale: 0,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "tween",
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

export const rotate = (angle, delay, duration) => ({
  hidden: {
    rotate: angle,
    opacity: 0,
  },
  show: {
    rotate: 0,
    opacity: 1,
    transition: {
      type: "tween",
      delay,
      duration,
      ease: "easeInOut",
    },
  },
});

export const bounce = {
  hidden: { y: -30, opacity: 0 },
  show: {
    y: [0, -15, 0], // Multi-step keyframes
    opacity: 1,
    transition: {
      type: "tween", // Use tween for multiple keyframes
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

export const flip = {
  hidden: { rotateX: 90, opacity: 0 },
  show: {
    rotateX: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export const skew = {
  hidden: { skewX: -10, opacity: 0 },
  show: {
    skewX: 0,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

export const scale = {
  hidden: { scale: 0.8, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
};

export const wobble = {
  hidden: { rotate: -5, opacity: 0 },
  show: {
    rotate: [0, 10, -10, 10, -10, 0],
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

export const pulse = {
  hidden: { scale: 0.9, opacity: 0 },
  show: {
    scale: [1, 1.05, 1],
    opacity: 1,
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

export const swing = {
  hidden: { rotate: -10, opacity: 0 },
  show: {
    rotate: [0, 15, -15, 10, -10, 5, -5, 0],
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

export const footerVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 140,
    },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      delay: 0.5,
    },
  },
};

export const staggerChildren = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.6,
    },
  },
};

export const getMenuStyles = (menuOpened) => {
  if (document.documentElement.clientWidth <= 991) {
    return { right: !menuOpened && "-100%" };
  }
};
