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

/* ENVELOPE */

const envelopeSection =
  document.getElementById("envelopeSection");

const envelope =
  document.getElementById("envelope");

const openEnvelopeButton =
  document.getElementById("openEnvelopeButton");

/* AFTER PARTY */

const afterPartySection =
  document.getElementById("afterPartySection");

const afterPartyButton =
  document.getElementById("afterPartyButton");

const capybaraContainer =
  document.getElementById("capybaraContainer");

const audioPlayer =
  document.getElementById("audioPlayer");


/* ------------------------------
   PLAY BUTTON
------------------------------ */

startButton.addEventListener("click", () => {

  if (!audioPlayer.src) {

    startButton.textContent =
      " PICK A TRACK FIRST";

    return;

  }


  if (audioPlayer.paused) {

    audioPlayer.play();

    startButton.textContent =
      " PLAYING...";

    equalizer.classList.add("playing");

  } else {

    audioPlayer.pause();

    startButton.textContent =
      "▶ PAUSED";

    equalizer.classList.remove("playing");

  }

});


/* ------------------------------
   TRACKLIST
------------------------------ */

tracks.forEach((track) => {

  track.addEventListener("click", () => {

    const title =
      track.dataset.title;

    const artist =
      track.dataset.artist;

    const audioFile =
      track.dataset.audio;


    /* Stop current song */

    audioPlayer.pause();


    /* Select track */

    tracks.forEach((item) => {

      item.classList.remove("active");

    });

    track.classList.add("active");


    /* Update song information */

    songTitle.textContent =
      title;

    artistName.textContent =
      artist;


    /* Animate album art */

    albumArt.classList.remove("active");

    void albumArt.offsetWidth;

    albumArt.classList.add("active");


    /* Load selected audio */

    audioPlayer.src =
      audioFile;


    /* Reset progress */

    progressBar.style.width =
      "0%";


    /* Start playing */

    audioPlayer.play();


    /* Update UI */

    startButton.textContent =
      " PLAYING...";

    equalizer.classList.add("playing");


    /* Hide wish area */

    wishArea.classList.add("hidden");

  });

});

/* ------------------------------
   REAL AUDIO PROGRESS
------------------------------ */

audioPlayer.addEventListener("timeupdate", () => {

  if (!audioPlayer.duration) return;


  const percentage =
    (audioPlayer.currentTime /
      audioPlayer.duration) * 100;


  progressBar.style.width =
    percentage + "%";

});


audioPlayer.addEventListener("ended", () => {

  equalizer.classList.remove("playing");

  startButton.textContent =
    " MAKE A WISHHHH";

  wishArea.classList.remove("hidden");

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


    micButton.textContent = "LISTENING.....";

    micStatus.textContent =
      "Say your wish to the mic";

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
    " WISH RECEIVED ";


  micButton.textContent =
    "✓ WISH SENT HIHI";


  wishText.innerHTML =
    "Look up the envelopeeee<br>" +
    "";


  equalizer.classList.add("playing");


  setTimeout(() => {

    envelopeSection.classList.remove("hidden");

    envelopeSection.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }, 1200);

}

/* ------------------------------
   OPEN ENVELOPE
------------------------------ */

openEnvelopeButton.addEventListener("click", () => {

  envelope.classList.add("open");

  openEnvelopeButton.textContent =
    "FOR YOU ♡";


  setTimeout(() => {

    afterPartySection.classList.remove("hidden");

    afterPartySection.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }, 1800);

});

envelope.addEventListener("click", () => {

  envelope.classList.add("open");

  openEnvelopeButton.textContent =
    "OPEN IT";


  setTimeout(() => {

    afterPartySection.classList.remove("hidden");

    afterPartySection.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }, 1800);

});

/* ------------------------------
   AFTER PARTY ACTIVATION
------------------------------ */

afterPartyButton.addEventListener("click", () => {

  capybaraContainer.classList.add("show");

  afterPartyButton.textContent =
    "AFTER PARTY ACTIVATED";

  equalizer.classList.add("playing");

});
