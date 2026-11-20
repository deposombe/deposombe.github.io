document.querySelectorAll(".shots").forEach((shots) => {
  const strip = shots.querySelector(".shots-strip");
  const dots = [...shots.querySelectorAll(".shots-dots button")];
  const mark = () => {
    const current = Math.round(strip.scrollLeft / (strip.scrollWidth / dots.length));
    dots.forEach((dot, i) => dot.setAttribute("aria-pressed", i === current));
  };
  dots.forEach((dot, i) => dot.addEventListener("click", () => {
    strip.scrollTo({ left: strip.children[i].offsetLeft - strip.offsetLeft, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }));
  strip.addEventListener("scroll", mark, { passive: true });
  mark();
});
