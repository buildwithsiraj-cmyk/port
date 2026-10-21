/**
 * Global Motion System Tokens
 * Defines reusable easing curves, durations, and spring physics
 * aligned with the dark technical aesthetic.
 */

// Timing in milliseconds and seconds
export const DURATION = {
  fast: 0.18,       // 180ms - micro-interactions, buttons, icons, hover
  standard: 0.28,   // 280ms - menus, tabs, cards, dropdowns
  entrance: 0.55,   // 550ms - section reveals, modal entries
  stagger: 0.08,    // 80ms  - list item delays
} as const;

// Cubic bezier easings
export const EASING = {
  smooth: [0.22, 1, 0.36, 1] as const,       // Smooth deceleration (ease-out)
  energetic: [0.16, 1, 0.3, 1] as const,     // Swift response for interactive elements
  sharp: [0.4, 0, 0.2, 1] as const,          // Standard material ease
  spring: { type: "spring", stiffness: 350, damping: 28 } as const,
  gentleSpring: { type: "spring", stiffness: 220, damping: 22 } as const,
} as const;

// Transition helper builder for Framer Motion
export function transition(
  type: keyof typeof DURATION = "standard",
  delay = 0,
  isReduced = false
) {
  if (isReduced) {
    return { duration: 0.01, delay: 0 };
  }
  return {
    duration: DURATION[type],
    delay,
    ease: EASING.smooth,
  };
}
