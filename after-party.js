/* ------------------------------
   AFTER PARTY ACTIVATION
------------------------------ */

const afterPartyButton =
  document.getElementById(
    "afterPartyButton"
  );

const capybaraContainer =
  document.getElementById(
    "capybaraContainer"
  );


afterPartyButton.addEventListener(
  "click",
  () => {

    capybaraContainer.classList.add(
      "show"
    );


    afterPartyButton.textContent =
      "AFTER PARTY ACTIVATEDDDDDD HHAHAHAHAHAHHAHAHA";

  }
);
