// Execute when the DOM is fully loaded
window.addEventListener("load", () => {
  initScrollProgress();
  if (isFirstVisit()) {
    showInitialAnimation();
  }
  setupBalloonClick();
  setupCouponClose();
  setupCouponCopy();
});

// Update scroll progress bar on window scroll
window.addEventListener("scroll", updateScrollProgress);

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
  document.getElementById("myBar").style.width = `${scrolled}%`;
}

// Check if this is the user's first visit using cookies
function isFirstVisit() {
  const firstVisit = document.cookie
    .split(";")
    .some((item) => item.trim().startsWith("firstVisit="));
  if (!firstVisit) {
    // Set the cookie to expire in one month
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);
    document.cookie = `firstVisit=true; expires=${expiryDate.toUTCString()}; path=/`;
    return true;
  }
  return false;
}

// Show the initial animation
function showInitialAnimation() {
  const balloon = document.getElementById("balloon");
  balloon.classList.add("balloon-fly");
}

// Setup balloon click event
function setupBalloonClick() {
  const balloon = document.getElementById("balloon");
  balloon.addEventListener("click", () => {
    balloon.style.display = "none";
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
  closeButton.addEventListener("click", () => {
    document.getElementById("coupon").style.display = "none";
  });
}

// Setup coupon code copy functionality
function setupCouponCopy() {
  const codeElement = document.getElementById("code");
  codeElement.addEventListener("click", () => {
    const textToCopy = codeElement.textContent;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        // Visual feedback
        codeElement.style.backgroundColor = "#4a90e2";
        codeElement.style.color = "white";
        setTimeout(() => {
          codeElement.style.backgroundColor = "";
          codeElement.style.color = "";
        }, 200);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  });
}
