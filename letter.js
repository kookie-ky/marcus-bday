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

}


openEnvelopeButton.addEventListener(
  "click",
  openLetter
);


envelope.addEventListener(
  "click",
  openLetter
);
