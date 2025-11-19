// ======= Drag / Pointer-based implementation (replace existing JS) =======
const container = document.querySelector(".items");
const cubes = Array.from(document.querySelectorAll(".item"));

// ensure container is positioned (should be already in your CSS, but safe to set)
if (getComputedStyle(container).position === "static") {
  container.style.position = "relative";
}

let active = null;
let offsetX = 0;
let offsetY = 0;
let activePointerId = null;

// convert inline items into absolutely positioned draggable elements
cubes.forEach((cube, index) => {

  // Prevent native HTML5 drag interactions which conflict with our custom drag
  cube.addEventListener("dragstart", (ev) => ev.preventDefault());

  // absolute positioning so we can freely move elements inside container
  cube.style.position = "absolute";

  // initial left positions based on original layout spacing
  cube.style.left = index * 220 + "px";
  cube.style.top  = "100px";

  // show grab cursor
  cube.style.cursor = "grab";

  // pointer down to start drag (works for mouse + touch + pen)
  cube.addEventListener("pointerdown", (e) => {
    // only left button or primary pointer should start drag
    if (e.button && e.button !== 0) return;

    active = cube;
    activePointerId = e.pointerId;

    // compute offset between pointer and element top-left
    const elRect = active.getBoundingClientRect();
    offsetX = e.clientX - elRect.left;
    offsetY = e.clientY - elRect.top;

    // raise z-index so dragged item sits on top
    active.style.zIndex = 9999;
    active.style.cursor = "grabbing";

    // capture the pointer so we continue receiving pointermove events
    active.setPointerCapture(activePointerId);

    // attach move/up handlers to the container (or document)
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("pointercancel", onPointerUp);

    // prevent text/image selection during drag
    e.preventDefault();
  });
});

function onPointerMove(e) {
  if (!active || e.pointerId !== activePointerId) return;

  const rect = container.getBoundingClientRect();

  // compute new position relative to container
  let x = e.clientX - rect.left - offsetX;
  let y = e.clientY - rect.top - offsetY;

  // clamp to container bounds
  x = Math.max(0, Math.min(x, rect.width - active.offsetWidth));
  y = Math.max(0, Math.min(y, rect.height - active.offsetHeight));

  active.style.left = x + "px";
  active.style.top = y + "px";
}

function onPointerUp(e) {
  if (!active || e.pointerId !== activePointerId) return;

  // release pointer capture
  try {
    active.releasePointerCapture(activePointerId);
  } catch (err) {
    // ignore if not captured
  }

  // reset styles
  active.style.zIndex = "";
  active.style.cursor = "grab";

  // cleanup
  active = null;
  activePointerId = null;
  document.removeEventListener("pointermove", onPointerMove);
  document.removeEventListener("pointerup", onPointerUp);
  document.removeEventListener("pointercancel", onPointerUp);
}
