/* ------------------------------
   OPEN ENVELOPE
------------------------------ */

const envelope =
  document.getElementById("envelope");

const openEnvelopeButton =
  document.getElementById("openEnvelopeButton");

const afterPartyButton =
  document.getElementById("afterPartyButton");


function openLetter() {

  envelope.classList.add("open");

  openEnvelopeButton.textContent =
    "FOR YOU ♡";


  setTimeout(() => {

    afterPartyButton.classList.remove("hidden");

  }, 1000);

}


openEnvelopeButton.addEventListener(
  "click",
  openLetter
);


envelope.addEventListener(
  "click",
  openLetter
);


afterPartyButton.addEventListener(
  "click",
  () => {

    window.open(
      "after-party.html",
      "_blank"
    );

  }
);
