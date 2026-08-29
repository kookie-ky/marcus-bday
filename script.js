const startButton = document.getElementById("startButton");

const equalizer = document.getElementById("equalizer");

const progressBar = document.getElementById("progressBar");

const songTitle = document.getElementById("songTitle");

const artistName = document.getElementById("artistName");

const albumArt = document.getElementById("albumArt");

const tracks = document.querySelectorAll(".track");


let progress = 0;

let playing = false;

let progressInterval;


/* ------------------------------
   PLAY BUTTON
------------------------------ */

startButton.addEventListener("click", () => {

  if (playing) return;

  playing = true;

  startButton.textContent = "🎵 PLAYING...";

  equalizer.classList.add("playing");

  progressInterval = setInterval(() => {

    progress += 1;

    progressBar.style.width = progress + "%";


    if (progress >= 100) {

      clearInterval(progressInterval);

      startButton.textContent = "🎤 MAKE A WISH";

    }

  }, 100);

});


/* ------------------------------
   TRACKLIST
------------------------------ */

tracks.forEach((track) => {

  track.addEventListener("click", () => {

    const title = track.dataset.title;

    const artist = track.dataset.artist;


    /* Remove active state */

    tracks.forEach((item) => {

      item.classList.remove("active");

    });


    /* Activate clicked track */

    track.classList.add("active");


    /* Change current song */

    songTitle.textContent = title;

    artistName.textContent = artist;


    /* Animate album */

    albumArt.classList.remove("active");

    void albumArt.offsetWidth;

    albumArt.classList.add("active");


    /* Start equalizer */

    equalizer.classList.add("playing");


    /* Change button */

    startButton.textContent = "🎵 SELECTED";


    /* Reset progress */

    progress = 0;

    progressBar.style.width = "0%";

  });

});
