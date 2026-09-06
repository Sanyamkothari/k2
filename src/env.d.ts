/// <reference types="astro/client" />
interface Window {
  /** The Lenis smooth-scroll instance, exposed so islands can pause it while a dialog is open. */
  __lenis?: { stop: () => void; start: () => void } | null;
}
