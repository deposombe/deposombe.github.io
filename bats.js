const trigger = document.querySelector(".bats");
const calm = matchMedia("(prefers-reduced-motion: reduce)");
const canvas = document.createElement("canvas");
canvas.className = "bat-canvas";
canvas.setAttribute("aria-hidden", "true");
document.body.append(canvas);
const fire = confetti.create(canvas, { resize: false });
const shapes = new Map();

function batShape(scale) {
  if (!shapes.has(scale)) shapes.set(scale, confetti.shapeFromText({ text: "🦇", scalar: scale }));
  return shapes.get(scale);
}

trigger?.addEventListener("click", () => {
  const dpr = Math.min(Math.ceil(devicePixelRatio || 1), 3);
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;

  const scale = 3 * dpr;
  const box = trigger.getBoundingClientRect();
  fire({
    shapes: [batShape(scale)],
    scalar: scale,
    particleCount: calm.matches ? 8 : 36,
    angle: 90,
    spread: calm.matches ? 50 : 90,
    startVelocity: (calm.matches ? 22 : 46) * dpr,
    gravity: 0.9 * dpr,
    drift: 0,
    flat: true,
    ticks: calm.matches ? 120 : 220,
    origin: {
      x: (box.left + box.width / 2) / innerWidth,
      y: (box.top + box.height / 2) / innerHeight,
    },
  });
});
