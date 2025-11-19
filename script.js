const container = document.querySelector(".items");
const cubes = document.querySelectorAll(".item");

let active = null;
let startX = 0;
let startY = 0;

cubes.forEach((cube, index) => {
  cube.style.position = "absolute";
  cube.style.left = index * 220 + "px";
  cube.style.top = "100px";

  cube.addEventListener("dragstart", e => e.preventDefault());

  cube.addEventListener("mousedown", (e) => {
    active = cube;

    const rect = cube.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  });
});

function onMove(e) {
  if (!active) return;

  const rect = container.getBoundingClientRect();

  let x = e.clientX - rect.left - startX;
  let y = e.clientY - rect.top - startY;

  x = Math.max(0, Math.min(x, rect.width - active.offsetWidth));
  y = Math.max(0, Math.min(y, rect.height - active.offsetHeight));

  active.style.left = x + "px";
  active.style.top = y + "px";
}

function onUp() {
  active = null;
  document.removeEventListener("mousemove", onMove);
  document.removeEventListener("mouseup", onUp);
}
