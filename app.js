
const home = document.querySelector("#home");
const session = document.querySelector("#session");
const complete = document.querySelector("#complete");

const timerDisplay = document.querySelector("#timer");
const statusDisplay = document.querySelector("#status");
const titleDisplay = document.querySelector("#sessionTitle");
const countDisplay = document.querySelector("#count");

let totalSeconds = 180;
let remainingSeconds = totalSeconds;
let interval = null;
let completedSessions = 0;

function showScreen(screen) {
  home.hidden = screen !== home;
  session.hidden = screen !== session;
  complete.hidden = screen !== complete;
}

function renderTimer() {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  timerDisplay.textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function stopTimer() {
  clearInterval(interval);
  interval = null;
}

function finishSession() {
  stopTimer();
  remainingSeconds = 0;
  renderTimer();

  completedSessions++;
  countDisplay.textContent = completedSessions;
  showScreen(complete);
  document.querySelector("#again").focus();
}

function startTimer() {
  if (interval !== null || remainingSeconds <= 0) return;

  statusDisplay.textContent = "Session in progress.";
  interval = setInterval(() => {
    remainingSeconds--;
    renderTimer();

    if (remainingSeconds <= 0) {
      finishSession();
    }
  }, 1000);
}

function resetTimer() {
  stopTimer();
  remainingSeconds = totalSeconds;
  renderTimer();
  statusDisplay.textContent = "Ready when you are.";
}

document.querySelectorAll(".routine").forEach(button => {
  button.addEventListener("click", () => {
    const minutes = Number(button.dataset.minutes);

    totalSeconds = minutes * 60;
    remainingSeconds = totalSeconds;

    titleDisplay.textContent =
      button.querySelector("h2").textContent;

    renderTimer();
    statusDisplay.textContent = "Ready when you are.";
    showScreen(session);
    document.querySelector("#start").focus();
  });
});

document.querySelector("#start").addEventListener("click", startTimer);

document.querySelector("#pause").addEventListener("click", () => {
  stopTimer();
  statusDisplay.textContent = "Paused.";
});

document.querySelector("#restart").addEventListener("click", resetTimer);

document.querySelector("#homeButton").addEventListener("click", () => {
  stopTimer();
  showScreen(home);
  document.querySelector(".routine").focus();
});

document.querySelector("#again").addEventListener("click", () => {
  showScreen(home);
  document.querySelector(".routine").focus();
});

renderTimer();
