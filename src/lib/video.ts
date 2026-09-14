/**
 * Starts buffering a muted, looping background video about one screen before it scrolls into view, and keeps it
 * playing only while it is near the viewport, so it is already moving when the reader arrives.
 */
export function autoplayWhenNear(video: HTMLVideoElement) {
  video.muted = true;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        video.preload = "auto";
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    },
    { rootMargin: "100% 0px" },
  );
  observer.observe(video);
}
