const startButton = document.getElementById("startButton");
const equalizer = document.getElementById("equalizer");
const progressBar = document.querySelector(".progress-bar");

let progress = 0;
let playing = false;

startButton.addEventListener("click", () => {

  if (playing) return;

  playing = true;

  startButton.textContent = "🎵 PLAYING...";
  equalizer.classList.add("playing");

  const interval = setInterval(() => {

    progress += 1;

    progressBar.style.width = progress + "%";

    if (progress >= 100) {

      clearInterval(interval);

      startButton.textContent = "🎤 MAKE A WISH";

    }

  }, 100);

});
