const container = document.querySelector(".items");
const cubes = document.querySelectorAll(".item");

let isDragging = false;
let activeCube = null;
let offsetX = 0;
let offsetY = 0;

// When user clicks a cube
cubes.forEach(cube => {
  cube.addEventListener("mousedown", (e) => {
    isDragging = true;
    activeCube = cube;

    // bring cube above others
    cube.style.position = "absolute";
    cube.style.zIndex = 999;

    const rect = cube.getBoundingClientRect();

    // store mouse offset inside cube
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });
});

// While mouse moves → move cube
document.addEventListener("mousemove", (e) => {
  if (!isDragging || !activeCube) return;

  const containerRect = container.getBoundingClientRect();
  const cubeRect = activeCube.getBoundingClientRect();

  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop  = e.clientY - containerRect.top - offsetY;

  // boundary left
  if (newLeft < 0) newLeft = 0;

  // boundary top
  if (newTop < 0) newTop = 0;

  // boundary right
  if (newLeft + cubeRect.width > containerRect.width)
    newLeft = containerRect.width - cubeRect.width;

  // boundary bottom
  if (newTop + cubeRect.height > containerRect.height)
    newTop = containerRect.height - cubeRect.height;

  activeCube.style.left = newLeft + "px";
  activeCube.style.top = newTop + "px";
});

// When user releases mouse
document.addEventListener("mouseup", () => {
  isDragging = false;
  activeCube = null;
});
