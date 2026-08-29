const startButton = document.getElementById("startButton");

const equalizer = document.getElementById("equalizer");

const progressBar = document.getElementById("progressBar");

const songTitle = document.getElementById("songTitle");

const artistName = document.getElementById("artistName");

const albumArt = document.getElementById("albumArt");

const tracks = document.querySelectorAll(".track");

const wishArea = document.getElementById("wishArea");

const micButton = document.getElementById("micButton");

const micStatus = document.getElementById("micStatus");

const wishText = document.getElementById("wishText");


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

      wishArea.classList.remove("hidden");

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


    tracks.forEach((item) => {

      item.classList.remove("active");

    });


    track.classList.add("active");


    songTitle.textContent = title;

    artistName.textContent = artist;


    albumArt.classList.remove("active");

    void albumArt.offsetWidth;

    albumArt.classList.add("active");


    equalizer.classList.add("playing");


    startButton.textContent = "🎵 SELECTED";


    progress = 0;

    progressBar.style.width = "0%";


    wishArea.classList.add("hidden");

    playing = false;

  });

});


/* ------------------------------
   MICROPHONE
------------------------------ */

let audioContext;

let analyser;

let microphone;

let microphoneStream;

let listening = false;


/* Start microphone */

micButton.addEventListener("click", async () => {

  if (listening) return;


  try {

    microphoneStream =
      await navigator.mediaDevices.getUserMedia({
        audio: true
      });


    audioContext =
      new (window.AudioContext ||
      window.webkitAudioContext)();


    analyser =
      audioContext.createAnalyser();


    analyser.fftSize = 1024;

    analyser.smoothingTimeConstant = 0.8;


    microphone =
      audioContext.createMediaStreamSource(
        microphoneStream
      );


    microphone.connect(analyser);


    listening = true;


    micButton.textContent = "🎤 I'M LISTENING...";

    micStatus.textContent =
      "Make your wish... then blow into the mic 💨";

    micStatus.classList.add("listening");


    detectBlow();


  } catch (error) {

    console.error(error);


    micStatus.textContent =
      "I couldn't access your microphone 😭";


    micButton.textContent =
      "🎤 TRY AGAIN";

  }

});


/* ------------------------------
   DETECT BLOW
------------------------------ */

function detectBlow() {

  if (!listening) return;


  const data =
    new Uint8Array(
      analyser.fftSize
    );


  analyser.getByteTimeDomainData(data);


  let sum = 0;


  for (let i = 0; i < data.length; i++) {

    const value =
      (data[i] - 128) / 128;

    sum += value * value;

  }


  const volume =
    Math.sqrt(sum / data.length);


  /*
    A blow usually creates
    a sustained burst of sound.

    This threshold keeps normal
    silence from triggering it.
  */

  if (volume > 0.12) {

    wishReceived();

    return;

  }


  requestAnimationFrame(detectBlow);

}


/* ------------------------------
   WISH RECEIVED
------------------------------ */

function wishReceived() {

  listening = false;


  if (microphoneStream) {

    microphoneStream
      .getTracks()
      .forEach((track) => {
        track.stop();
      });

  }


  if (audioContext) {

    audioContext.close();

  }


  micStatus.classList.remove("listening");

  micStatus.classList.add("success");


  micStatus.textContent =
    "✨ WISH RECEIVED ✨";


  micButton.textContent =
    "✓ WISH SENT";


  wishText.innerHTML =
    "Your wish has been sent...<br>" +
    "and I think something just appeared for you. 👀";


  equalizer.classList.add("playing");

}
