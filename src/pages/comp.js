// js/load-components.js

// Define your ordered list of pages exactly as they appear in your folder URL
// Dynamically generates ["page1.html", "page2.html", ..., "page34.html"]
const pageSequence = [
  "page1.html",
  "page2.html",
  "page3.html",
  "page4.html",
  "page5.html",
  "page6.html",
  "page7.html",
  "page8.html",
  "page9.html",
  "page10.html",
  "page11.html",
  "page12.html",
  "page13.html",
  "page14.html",
  "page15.html",
  "page16.html",
  "page17.html",
  "page18.html",
  "page19.html",
  "page20.html",
  "page21.html",
  "page22.html",
  "page23.html",
  "page24.html",
  "page25.html",
  "page26.html",
  "page27.html",
  "page28.html",
  "page29.html",
  "page30.html",
  "page31.html",
  "page32.html",
  "page33.html",
  "page34.html",
];

// --- ULTRA-SAFE TRANSITION SYSTEM (Layout-Protective) ---
// Uses a cinematic overlay curtain reveal to prevent altering element layouts, transforms, or positions
(function injectSafeTransitions() {
  const style = document.createElement("style");
  style.textContent = `
    /* Create a non-destructive viewport mask layer */
    .premium-transition-curtain {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: radial-gradient(circle, #4A0E17 0%, #2A080C 100%);
      z-index: 99999;
      pointer-events: none;
      opacity: 1;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      animation: smoothRevealSwipe 0.85s cubic-bezier(0.25, 1, 0.5, 1) forwards;
    }

    @keyframes smoothRevealSwipe {
      0% {
        opacity: 1;
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      }
      30% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
      }
    }
  `;
  document.head.appendChild(style);

  // Inject the transition element immediately into the body window
  window.addEventListener("DOMContentLoaded", () => {
    const curtain = document.createElement("div");
    curtain.className = "premium-transition-curtain";
    document.body.appendChild(curtain);
  });
})();

function loadComponent(elementId, fileUrl, callback = null) {
  fetch(fileUrl)
    .then((response) => {
      if (!response.ok) throw new Error(`Failed to load ${fileUrl}`);
      return response.text();
    })
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
      if (callback) callback(); // Run setup logic after HTML is mounted
    })
    .catch((error) => console.error("Error loading component:", error));
}

function setupArrowNavigation() {
  // Get the current file name from the URL (defaults to page1.html if blank)
  let currentFile = window.location.pathname.split("/").pop();
  if (currentFile === "" || currentFile === "index.html") {
    currentFile = "page1.html";
  }

  // Find where we are in the list
  const currentIndex = pageSequence.indexOf(currentFile);
  if (currentIndex === -1) return; // Exit if current page isn't in our array

  const prevBtn = document.getElementById("prev-page-btn");
  const nextBtn = document.getElementById("next-page-btn");

  // Configure Previous Button
  if (currentIndex > 0) {
    prevBtn.href = pageSequence[currentIndex - 1];
    prevBtn.classList.remove("disabled");
  }

  // Configure Next Button
  if (currentIndex < pageSequence.length - 1) {
    nextBtn.href = pageSequence[currentIndex + 1];
    nextBtn.classList.remove("disabled");
  }
}

// Global Keyboard Slide Navigation Controller
document.addEventListener("keydown", (event) => {
  const prevBtn = document.getElementById("prev-page-btn");
  const nextBtn = document.getElementById("next-page-btn");

  // Handles Left Arrow (37)
  if (event.key === "ArrowLeft" || event.keyCode === 37) {
    if (
      prevBtn &&
      !prevBtn.classList.contains("disabled") &&
      prevBtn.getAttribute("href") !== "#"
    ) {
      window.location.href = prevBtn.href;
    }
  }
  // Handles Right Arrow (39)
  else if (event.key === "ArrowRight" || event.keyCode === 39) {
    if (
      nextBtn &&
      !nextBtn.classList.contains("disabled") &&
      nextBtn.getAttribute("href") !== "#"
    ) {
      window.location.href = nextBtn.href;
    }
  }
});

// Run everything on DOM Load
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header-placeholder", "header.html");
  loadComponent("footer-placeholder", "footer.html");

  // Load the navigation arrows and setup links immediately after
  loadComponent("nav-placeholder", "page-nav.html", setupArrowNavigation);
});
