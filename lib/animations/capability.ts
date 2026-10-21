/**
 * Feature-based motion budget. Returns a multiplier (0–1) for 3D depth and
 * rotation. Based on viewport width and coarse capability hints, never on
 * user-agent strings. Call inside a gsap.matchMedia() callback so it is
 * re-evaluated whenever the breakpoint changes.
 */
export function motionScale(): number {
  if (typeof window === "undefined") return 1;
  const w = window.innerWidth;
  let k = w >= 1440 ? 1 : w >= 1024 ? 0.7 : 0.5;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  const lowCpu = (nav.hardwareConcurrency ?? 8) <= 2;
  const lowMem = (nav.deviceMemory ?? 8) <= 2;
  if (lowCpu || lowMem || nav.connection?.saveData) k *= 0.6;
  return k;
}
