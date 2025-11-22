const container = document.getElementById("items");
const cubes = document.querySelectorAll(".cube");

let active = null;
let startX = 0;
let startY = 0;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;

cubes.forEach(cube => {
  cube.addEventListener("mousedown", (e) => {

    active = cube;
    const rect = cube.getBoundingClientRect();
    const contRect = container.getBoundingClientRect();

    startX = e.clientX;
    startY = e.clientY;

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    // Position absolute on drag start
    cube.style.position = "absolute";
    cube.style.left = rect.left - contRect.left + "px";
    cube.style.top = rect.top - contRect.top + "px";

    cube.classList.add("dragging");
    isDragging = true;
  });
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging || !active) return;

  const contRect = container.getBoundingClientRect();

  let x = e.clientX - contRect.left - offsetX;
  let y = e.clientY - contRect.top - offsetY;

  // boundaries
  if (x < 0) x = 0;
  if (y < 0) y = 0;

  if (x + active.offsetWidth > contRect.width)
    x = contRect.width - active.offsetWidth;

  if (y + active.offsetHeight > contRect.height)
    y = contRect.height - active.offsetHeight;

  active.style.left = x + "px";
  active.style.top = y + "px";
});

document.addEventListener("mouseup", () => {
  if (active) active.classList.remove("dragging");
  active = null;
  isDragging = false;
});
