document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container");
  const cardGroup = document.querySelector(".card-group");
  const card = document.querySelector(".card");
  let flipped = false;
  let isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  function animateTop(element, target, duration) {
    let start = null;
    const initial = parseInt(getComputedStyle(element).top) || 0;
    const distance = target - initial;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percent = Math.min(progress / duration, 1);
      element.style.top = initial + distance * percent + "px";
      if (percent < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  // Hover effect only for desktop
  if (!isTouchDevice) {
    container.addEventListener("mouseenter", function () {
      if (!flipped) animateTop(cardGroup, -90, 600);
    });
    container.addEventListener("mouseleave", function () {
      if (!flipped) animateTop(cardGroup, 0, 600);
    });
  }

  // On both desktop + touch: tap/click the card to open
  card.addEventListener(isTouchDevice ? "touchstart" : "click", (e) => {
    e.preventDefault(); // prevents double-tap zoom on iPhone
    if (!flipped) {
      // Move card group out of envelope
      cardGroup.style.transition = "top 0.6s ease, transform 1s ease";
      cardGroup.style.top = "-200px";

      // After rising, flip card
      setTimeout(() => {
        card.classList.add("flipped");
      }, 600);

      flipped = true;
    } else {
      // Flip back
      card.classList.remove("flipped");
      cardGroup.style.transition = "top 0.6s ease, transform 1s ease";
      cardGroup.style.top = "0px";
      flipped = false;
    }
  });
});
