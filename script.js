const container = document.getElementById("container");
let activeCube = null;
let offsetX = 0;
let offsetY = 0;

container.addEventListener("mousedown", (e) => {
    if (!e.target.classList.contains("cube")) return;

    activeCube = e.target;
    activeCube.classList.add("dragging");

    // switch to absolute for dragging
    const rect = activeCube.getBoundingClientRect();
    const contRect = container.getBoundingClientRect();

    activeCube.style.position = "absolute";
    activeCube.style.left = rect.left - contRect.left + "px";
    activeCube.style.top = rect.top - contRect.top + "px";

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
});

document.addEventListener("mousemove", (e) => {
    if (!activeCube) return;

    const contRect = container.getBoundingClientRect();
    const cubeRect = activeCube.getBoundingClientRect();

    // calculate new position
    let newLeft = e.clientX - contRect.left - offsetX;
    let newTop = e.clientY - contRect.top - offsetY;

    // boundaries
    if (newLeft < 0) newLeft = 0;
    if (newTop < 0) newTop = 0;
    if (newLeft + cubeRect.width > contRect.width)
        newLeft = contRect.width - cubeRect.width;
    if (newTop + cubeRect.height > contRect.height)
        newTop = contRect.height - cubeRect.height;

    activeCube.style.left = newLeft + "px";
    activeCube.style.top = newTop + "px";
});

document.addEventListener("mouseup", () => {
    if (activeCube) {
        activeCube.classList.remove("dragging");
        activeCube = null;
    }
});
