/* ------------------------------
   OPEN ENVELOPE
------------------------------ */

const envelope =
  document.getElementById("envelope");

const openEnvelopeButton =
  document.getElementById("openEnvelopeButton");


function openLetter() {

  envelope.classList.add("open");

  openEnvelopeButton.textContent =
    "FOR YOU ♡";


  setTimeout(() => {

    window.open(
      "after-party.html",
      "_blank"
    );

  }, 1800);

}


openEnvelopeButton.addEventListener(
  "click",
  openLetter
);


envelope.addEventListener(
  "click",
  openLetter
);
