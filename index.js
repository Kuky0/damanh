document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container");
  const cardGroup = document.querySelector(".card-group");
  const card = document.querySelector(".card");
  const envelope = document.querySelector(".envelope");
  let flipped = false;
  let isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  // smooth hover animation (card rises gently)
  function animateTop(element, target, duration) {
    let start = null;
    const initial = parseInt(getComputedStyle(element).top) || 0;
    const distance = target - initial;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percent = Math.min(progress / duration, 1);
      element.style.top = initial + distance * percent + "px";
      if (percent < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  // Hover up/down effect for desktop
  if (!isTouchDevice) {
    container.addEventListener("mouseenter", function () {
      if (!flipped) animateTop(cardGroup, -90, 600);
    });

    container.addEventListener("mouseleave", function () {
      if (!flipped) animateTop(cardGroup, 0, 600);
    });
  } else {
    // On touch devices, tap the envelope to animate up if not flipped
    envelope.addEventListener("touchstart", function (e) {
      if (!flipped) {
        animateTop(cardGroup, -90, 600);
        // Optional: prevent double tap zoom
        e.preventDefault();
      }
    });
    // Optionally, tap outside the card to bring it back down if not flipped
    document.body.addEventListener("touchstart", function (e) {
      if (!flipped && !envelope.contains(e.target) && cardGroup.style.top !== "0px") {
        animateTop(cardGroup, 0, 600);
      }
    });
  }

  // Click flip effect
  card.addEventListener("click", () => {
    if (!flipped) {
      // Move card group out of envelope
      cardGroup.style.transition = "top 0.6s ease, transform 1s ease";
      cardGroup.style.top = "-200px"; // moves upward

      // After rising, flip card
      setTimeout(() => {
        card.classList.add("flipped");
      }, 600);

      flipped = true;
    } else {
      // Flip back
      card.classList.remove("flipped");

      // Bring card group back down
      cardGroup.style.transition = "top 0.6s ease, transform 1s ease";
      cardGroup.style.top = "10px";

      flipped = false;
    }
  });
});