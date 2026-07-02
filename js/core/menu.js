const contextMenu = document.getElementById("custom-context-menu");
const resetConfirmPopup = document.getElementById("reset-confirm-popup");
const editModeItem = document.getElementById("edit-mode-item");

let isEditModeActive = false;

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  showContextMenu(e.clientX, e.clientY);
});

document.addEventListener("click", (e) => {
  if (!contextMenu.contains(e.target)) {
    contextMenu.classList.remove("show");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    contextMenu.classList.remove("show");
    if (!resetConfirmPopup.classList.contains("hidden")) {
      closeResetConfirm();
    }
  }
});

function showContextMenu(x, y) {
  contextMenu.style.left = x + "px";
  contextMenu.style.top = y + "px";
  contextMenu.classList.add("show");
}

document.addEventListener("click", (e) => {
  if (!contextMenu.contains(e.target)) {
    contextMenu.classList.remove("show");
  }
});

function toggleEditMode() {
  contextMenu.classList.remove("show");
  isEditModeActive = !isEditModeActive;

  if (isEditModeActive) {
    editModeItem.textContent = "DISABLE EDIT";
  } else {
    editModeItem.textContent = "ENABLE EDIT";
  }

  const event = new KeyboardEvent("keydown", {
    key: "e",
    code: "KeyE",
    keyCode: 69,
    which: 69,
    ctrlKey: true,
    altKey: true,
    bubbles: true,
  });
  document.dispatchEvent(event);
}

function refreshHUD() {
  contextMenu.classList.remove("show");

  const widgets = document.querySelectorAll(
    ".container, .todo-wrapper, .calendar-wrapper",
  );
  widgets.forEach((w) => {
    w.style.opacity = "0";
  });

  setTimeout(() => {
    location.reload();
  }, 300);
}

function openResetConfirm() {
  contextMenu.classList.remove("show");
  resetConfirmPopup.classList.remove("hidden");
}

function closeResetConfirm() {
  resetConfirmPopup.classList.add("hidden");
}

function confirmReset() {
  localStorage.clear();

  const widgets = document.querySelectorAll(
    ".container, .todo-wrapper, .calendar-wrapper",
  );
  widgets.forEach((w) => {
    w.style.opacity = "0";
  });

  closeResetConfirm();

  setTimeout(() => {
    location.reload();
  }, 300);
}

function exitApp() {
  contextMenu.classList.remove("show");

  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    if (typeof Neutralino !== "undefined") {
      try {
        Neutralino.app.exit();
      } catch (err) {
        console.log("Cannot exit via Neutralino:", err);
        window.close();
      }
    } else {
      window.close();
    }
  }, 500);
}

document.addEventListener("editModeToggled", (e) => {
  isEditModeActive = e.detail.isActive;
  if (isEditModeActive) {
    editModeItem.textContent = "DISABLE EDIT";
  } else {
    editModeItem.textContent = "ENABLE EDIT";
  }
});
