const container = document.querySelector(".items");
const cubes = document.querySelectorAll(".item");

let active = null;
let offsetX = 0;
let offsetY = 0;

// disable default HTML drag behavior
cubes.forEach(cube => cube.addEventListener("dragstart", e => e.preventDefault()));

cubes.forEach(cube => {
  cube.style.position = "absolute";

  cube.addEventListener("mousedown", (e) => {
    active = cube;

    offsetX = e.clientX - cube.offsetLeft;
    offsetY = e.clientY - cube.offsetTop;

    document.addEventListener("mousemove", moveCube);
    document.addEventListener("mouseup", stopCube);
  });
});

function moveCube(e) {
  if (!active) return;

  const rect = container.getBoundingClientRect();

  let x = e.clientX - rect.left - offsetX;
  let y = e.clientY - rect.top - offsetY;

  // boundaries
  x = Math.max(0, Math.min(x, rect.width - active.offsetWidth));
  y = Math.max(0, Math.min(y, rect.height - active.offsetHeight));

  active.style.left = x + "px";
  active.style.top = y + "px";
}

function stopCube() {
  active = null;
  document.removeEventListener("mousemove", moveCube);
  document.removeEventListener("mouseup", stopCube);
}
