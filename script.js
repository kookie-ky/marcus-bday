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

const currentTime =
  document.getElementById("currentTime");

const duration =
  document.getElementById("duration");

const audioPlayer =
  document.getElementById("audioPlayer");



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



tracks.forEach((track) => {

  track.addEventListener("click", () => {

    const title =
      track.dataset.title;

    const artist =
      track.dataset.artist;

    const audioFile =
      track.dataset.audio;


    audioPlayer.pause();



    tracks.forEach((item) => {

      item.classList.remove("active");

    });

    track.classList.add("active");


    songTitle.textContent =
      title;

    artistName.textContent =
      artist;


    albumArt.classList.remove("active");

    void albumArt.offsetWidth;

    albumArt.classList.add("active");


    audioPlayer.src =
      audioFile;


    progressBar.style.width =
      "0%";


    audioPlayer.play();


    startButton.textContent =
      " PLAYING...";

    equalizer.classList.add("playing");


    wishArea.classList.add("hidden");

  });

});


audioPlayer.addEventListener("timeupdate", () => {

  if (!audioPlayer.duration) return;


  const percentage =
    (audioPlayer.currentTime /
      audioPlayer.duration) * 100;


  progressBar.style.width =
    percentage + "%";


  const minutes =
    Math.floor(
      audioPlayer.currentTime / 60
    );

  const seconds =
    Math.floor(
      audioPlayer.currentTime % 60
    );


  currentTime.textContent =
    minutes + ":" +
    String(seconds).padStart(2, "0");

});


audioPlayer.addEventListener("loadedmetadata", () => {

  const minutes =
    Math.floor(
      audioPlayer.duration / 60
    );

  const seconds =
    Math.floor(
      audioPlayer.duration % 60
    );


  duration.textContent =
    minutes + ":" +
    String(seconds).padStart(2, "0");

});


audioPlayer.addEventListener("ended", () => {

  equalizer.classList.remove("playing");

  progressBar.style.width =
    "100%";

  startButton.textContent =
    "MAKE A WISHHHHH";

  wishArea.classList.remove("hidden");

});


let audioContext;

let analyser;

let microphone;

let microphoneStream;

let listening = false;


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


  if (volume > 0.12) {

    wishReceived();

    return;

  }


  requestAnimationFrame(detectBlow);

}


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

  window.open(
    "letter.html",
    "_blank"
  );

}, 1200);

}


