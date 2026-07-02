document.addEventListener("DOMContentLoaded", () => {
  const editPopup = document.getElementById("edit-popup");
  const widgets = [
    { id: "container", el: document.querySelector(".container") },
    { id: "todo-wrapper", el: document.querySelector(".todo-wrapper") },
    { id: "calendar-wrapper", el: document.querySelector(".calendar-wrapper") },
  ];

  let isLocked = true;

  widgets.forEach((w) => {
    w.el.classList.add("is-locked");
  });

  document.addEventListener("keydown", async (e) => {
    if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "e") {
      e.preventDefault();
      isLocked = !isLocked;

      widgets.forEach((w) => {
        w.el.classList.toggle("is-locked", isLocked);
      });

      document.querySelectorAll(".custom-widget").forEach((w) => {
        w.classList.toggle("is-locked", isLocked);
      });

      if (editPopup) {
        editPopup.classList.toggle("show", !isLocked);
      }

      document.dispatchEvent(
        new CustomEvent("editModeToggled", {
          detail: { isActive: !isLocked },
        }),
      );

      console.log("Edit Mode Active:", !isLocked);
    }
  });

  if (!localStorage.getItem("container")) {
    const container = widgets[0].el;
    container.style.top = "1%";
    container.style.left = "50%";
    container.style.transform = "translateX(-50%)";
  }

  if (!localStorage.getItem("todo-wrapper")) {
    const todoWrapper = widgets[1].el;
    todoWrapper.style.top = "15%";
    todoWrapper.style.right = "2%";
  }

  if (!localStorage.getItem("calendar-wrapper")) {
    const todoWrapper = widgets[2].el;
    todoWrapper.style.top = "15%";
    todoWrapper.style.left = "2%";
  }

  widgets.forEach((w) => {
    const savedPos = JSON.parse(localStorage.getItem(w.id));
    if (savedPos) {
      w.el.style.top = savedPos.top;
      w.el.style.left = savedPos.left;
    }
  });

  function makeDraggable(widget) {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    const element = widget.el;

    element.onmousedown = (e) => {
      if (isLocked) return;

      if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA" ||
        e.target.tagName === "BUTTON"
      ) {
        return;
      }
      e.preventDefault();
      element.style.transition = "none";
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmousemove = dragElement;
      document.onmouseup = stopDragging;
      element.style.transform = "none";
    };

    function dragElement(e) {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      element.style.top = element.offsetTop - pos2 + "px";
      element.style.left = element.offsetLeft - pos1 + "px";
    }

    function stopDragging() {
      document.onmousemove = null;
      document.onmouseup = null;
      element.style.transition = "0.5s ease-in-out";

      const topPercent = (element.offsetTop / window.innerHeight) * 100;
      const leftPercent = (element.offsetLeft / window.innerWidth) * 100;

      localStorage.setItem(
        widget.id,
        JSON.stringify({
          top: topPercent + "%",
          left: leftPercent + "%",
        }),
      );
    }
    widget.el.style.cursor = "move";
  }

  widgets.forEach((w) => {
    setTimeout(() => {
      w.el.classList.add("is-visible");
    }, 50);
  });

  widgets.forEach((w) => makeDraggable(w));
});
// NEUTRALINO
Neutralino.init();

Neutralino.events.on("ready", async () => {
  try {
    const appData = await Neutralino.os.getEnv("APPDATA");
    console.log("APPDATA:", appData);
  } catch (err) {
    console.error(err);
  }
});
