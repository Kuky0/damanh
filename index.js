document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container");
  const card = document.querySelector(".card");

  // Helper function to animate 'top' smoothly
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

  container.addEventListener("mouseenter", function () {
    animateTop(card, -90, 600); // 600ms similar to "slow"
  });

  container.addEventListener("mouseleave", function () {
    animateTop(card, 0, 600);
  });
});

