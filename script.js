let items = document.querySelector(".items");
let item = document.querySelectorAll(".item");

let dragged = null;

// Make items draggable
item.forEach(itm => {
    itm.setAttribute("draggable", "true");

    itm.addEventListener("dragstart", e => {
        dragged = itm;
        e.dataTransfer.effectAllowed = "move";
    });

    itm.addEventListener("dragover", e => {
        e.preventDefault();  // allow drop
    });

    itm.addEventListener("drop", e => {
        e.preventDefault();
        if (dragged && dragged !== itm) {
            items.insertBefore(dragged, itm);
        }
    });
});
