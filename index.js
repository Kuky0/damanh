document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container");
  const cardGroup = document.querySelector(".card-group");
  const card = document.querySelector(".card");

  let flipped = false;
  let opened = false;

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

  const supportsHover = window.matchMedia("(hover: hover)").matches;

  if (supportsHover) {
    // Desktop hover
    container.addEventListener("mouseenter", function () {
      if (!flipped && !opened) animateTop(cardGroup, -90, 600);
    });

    container.addEventListener("mouseleave", function () {
      if (!flipped && !opened) animateTop(cardGroup, 0, 600);
    });
  } else {
    // Touch devices — tap container (envelope area) to open
    container.addEventListener("click", () => {
      if (!opened) {
        cardGroup.style.transition = "top 0.6s ease";
        cardGroup.style.top = "-200px";
        opened = true;
      }
    });
  }

  // Flip card
  card.addEventListener("click", (event) => {
    if (!supportsHover && !opened) return; // block flip until opened on touch

    if (!flipped) {
      card.classList.add("flipped");
      flipped = true;
    } else {
      card.classList.remove("flipped");
      flipped = false;
    }

    // Prevent card click from bubbling up and reopening
    event.stopPropagation();
  });
});
