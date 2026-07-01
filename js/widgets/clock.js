const day = document.getElementById("day");
const date = document.getElementById("date");
const time = document.getElementById("time");

function updateDay() {
  day.textContent = new Date().toLocaleDateString("en-GB", { weekday: "long" });
}

function updateDate() {
  date.textContent =
    new Date()
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
      .toUpperCase() + ".";
}

function updateTime() {
  time.textContent =
    "- " +
    new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }) +
    " -";
}

function updateClock() {
  updateDay();
  updateDate();
  updateTime();
}

updateClock();
setInterval(updateClock, 1000);
