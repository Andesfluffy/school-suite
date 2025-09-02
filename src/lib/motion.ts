export const motion = {
  ease: {
    out: [0.16, 1, 0.3, 1] as [number, number, number, number],
    inOut: [0.83, 0, 0.17, 1] as [number, number, number, number],
  },
  dur: {
    xs: 0.15,
    sm: 0.25,
    md: 0.6,
    lg: 0.9,
  },
  spring: {
    gentle: { type: "spring" as const, stiffness: 200, damping: 24 },
    soft: { type: "spring" as const, stiffness: 140, damping: 20 },
  },
};

