const container = document.querySelector(".items");
const cubes = document.querySelectorAll(".item");

let active = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach((cube, index) => {

  // convert inline items into absolutely positioned draggable elements
  cube.style.position = "absolute";

  // initial left positions based on original layout spacing
  cube.style.left = index * 220 + "px"; 
  cube.style.top = "100px";

  cube.addEventListener("mousedown", (e) => {
    active = cube;

    offsetX = e.clientX - cube.offsetLeft;
    offsetY = e.clientY - cube.offsetTop;

    cube.style.zIndex = 9999;

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
  if (active) active.style.zIndex = 1;

  active = null;
  document.removeEventListener("mousemove", moveCube);
  document.removeEventListener("mouseup", stopCube);
}
