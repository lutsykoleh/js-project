// Execute when the DOM is fully loaded
window.onload = function () {
  initScrollProgress();
  animateBalloon();
  setupBalloonClick();
  setupCouponClose();
  setupCouponCopy();
};

// Update scroll progress bar
window.onscroll = function () {
  updateScrollProgress();
};

// Initialize and update scroll progress bar
function initScrollProgress() {
  updateScrollProgress();
}

function updateScrollProgress() {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}

// Animate balloon
function animateBalloon() {
  setTimeout(function () {
    const balloon = document.getElementById("balloon");
    balloon.classList.add("balloon-fly");
  }, 500);
}

// Setup balloon click event
function setupBalloonClick() {
  const balloon = document.getElementById("balloon");
  balloon.addEventListener("click", function () {
    this.style.display = "none";
    showCoupon();
  });
}

// Show coupon
function showCoupon() {
  const coupon = document.getElementById("coupon");
  const discountElement = document.getElementById("discount");
  const codeElement = document.getElementById("code");

  const discount = Math.floor(Math.random() * 21) + 5;
  const code = Math.random().toString(36).substring(2, 10).toUpperCase();

  discountElement.textContent = discount;
  codeElement.textContent = code;

  coupon.style.display = "block";

  // Ensure the coupon is rendered before adding the animation class
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      coupon.classList.add("coupon-fall");
    });
  });
}

// Setup coupon close button
function setupCouponClose() {
  const closeButton = document.getElementById("closeCoupon");
  closeButton.addEventListener("click", function () {
    document.getElementById("coupon").style.display = "none";
  });
}

// Setup coupon code copy functionality
function setupCouponCopy() {
  const codeElement = document.getElementById("code");
  codeElement.addEventListener("click", function () {
    const tempInput = document.createElement("input");
    tempInput.value = this.textContent;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    // Visual feedback
    this.style.backgroundColor = "#4a90e2";
    this.style.color = "white";
    setTimeout(() => {
      this.style.backgroundColor = "";
      this.style.color = "";
    }, 200);
  });
}
