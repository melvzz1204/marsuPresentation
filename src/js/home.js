/* ==========================================
   1. Authentication Handler (Index Safe Guard)
   ========================================== */
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const feedbackMessage = document.getElementById("feedbackMessage");
const loginCard = document.getElementById("loginCard");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    feedbackMessage.className = "message";
    feedbackMessage.textContent = "";
    if (loginCard) loginCard.style.animation = "none";

    if (username === "pdpz" && password === "pdpz") {
      feedbackMessage.classList.add("success");
      feedbackMessage.textContent = "Login successful! Redirecting...";
      if (loginCard) loginCard.style.borderColor = "var(--success-color)";

      setTimeout(() => {
        window.location.href = "/home.html";
      }, 1200);
    }
  });
}

/* ==========================================
   2. Infinite Flat Horizontal Marquee System
   ========================================== */
$(document).ready(function() {
  // Absolute paths mapping directly to your public assets directory for clean presentation execution
  const screenshotImages = [
    '/src/assets/carousell/Screenshots_fix/Accomplishments-Rankings.png',
    '/src/assets/carousell/Screenshots_fix/Achievements-Board_Examination_Metrics.png',
    '/src/assets/carousell/Screenshots_fix/Budget_Util-BUR.png',
    '/src/assets/carousell/Screenshots_fix/Dashboard.png',
    '/src/assets/carousell/Screenshots_fix/Enrollment-Enrollment_Growth.png',
    '/src/assets/carousell/Screenshots_fix/Enrollment-Enrollment_Trends.png',
    '/src/assets/carousell/Screenshots_fix/High_Ed-Employability_of_Graduates.png',
    '/src/assets/carousell/Screenshots_fix/Higher_Ed-Detailed_Status.png',
    '/src/assets/carousell/Screenshots_fix/Higher_Ed-Institutional_Accreditation.png',
    '/src/assets/carousell/Screenshots_fix/Login-Loading_Screen.png',
    '/src/assets/carousell/Screenshots_fix/Login-Modal.png',
    '/src/assets/carousell/Screenshots_fix/Research.png' 
  ];

  const totalItems = screenshotImages.length;

  $('.stage').each(function() {
    const $stage = $(this);
    const $ring = $stage.find('.ring');
    const isTopStage = $stage.hasClass('stage-top');

    // 1. Clear out existing static layout items inside the track container
    $ring.empty();

    // 2. Populate the image sources array across the structural slider track elements
    for (let i = 0; i < totalItems; i++) {
      const $imgDiv = $('<div class="img"></div>').css('background-image', `url("${screenshotImages[i]}")`);
      $ring.append($imgDiv);
    }

    // 3. Duplicate items to create a perfectly seamless loop wrap
    const $originalCards = $ring.children();
    $ring.append($originalCards.clone());

    // Calculate precise container tracking offsets updated to match: (Width: 380px + Gap: 45px)
    const cardSpacingWidth = 380 + 45; 
    const totalTravelDistance = cardSpacingWidth * totalItems;

    // 4. Fire up the independent linear sliding marquee tracks
    let marqueeTween;
    const standardDuration = 82; // Balanced speed value to keep wide elements scrolling cleanly

    if (isTopStage) {
      // Upper Track Layout: Continuous loop sliding from Left to Right
      gsap.set($ring, { x: -totalTravelDistance });
      marqueeTween = gsap.to($ring, {
        x: 0,
        duration: standardDuration, 
        ease: 'none',
        repeat: -1
      });
    } else {
      // Bottom Track Layout: Continuous loop sliding from Right to Left
      gsap.set($ring, { x: 0 });
      marqueeTween = gsap.to($ring, {
        x: -totalTravelDistance,
        duration: standardDuration,
        ease: 'none',
        repeat: -1
      });
    }

    // ==========================================
    // 3. Flat Card Focus Hover Effects
    // ==========================================
    // A slight delay ensures cloned items are ready in DOM context before targeting hooks
    setTimeout(() => {
      const $allImages = $ring.find('.img');

      $allImages.on('mouseenter', (e) => {
        // Pause the horizontal moving row when a viewer hovers over a dashboard element
        marqueeTween.pause();
        
        let current = e.currentTarget;
        gsap.to($allImages, { 
          opacity: (i, t) => (t == current) ? 1 : 0.3, 
          scale: (i, t) => (t == current) ? 1.04 : 0.96, 
          ease: 'power2.out', 
          duration: 0.3 
        });
      });

      $allImages.on('mouseleave', () => {
        // Resume the marquee track movement seamlessly when leaving the card bounding bounds
        marqueeTween.play();
        
        gsap.to($allImages, { 
          opacity: 1, 
          scale: 1, 
          ease: 'power2.inOut', 
          duration: 0.3 
        });
      });
    }, 50);
  });
});