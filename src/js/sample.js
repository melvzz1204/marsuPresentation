// Expanded to 12 members to match your 12 images!
const teamMembers = [
  {
    name: "Global Recognition Matrix",
    role: "Sustainability & Innovation Rankings",
  }, // 1.png
  { name: "Board Examination Metrics", role: "Passing Efficiency Analysis" }, // 2.png
  { name: "Budget Utilization Rate", role: "Fiscal Accountability Matrix" }, // 3.png
  { name: "Presidential Dashboard", role: "Organizational Data Overview" }, // 4.png
  { name: "Multi-Year Enrollment", role: "System Registration Trace" }, // 5.png
  { name: "Campus Enrollment Trends", role: "Registrar Program Demographics" }, // 6.png
  { name: "Employability of Graduates", role: "Tracer Study Matrix" }, // 7.png
  { name: "Detailed Program Registry", role: "Accreditation Status List" }, // 8.png
  { name: "Institutional Accreditation", role: "Academic Programs Overview" }, // 9.png
  { name: "System Initialization", role: "Access Verification Loading" }, // 10.png
  { name: "Operations Framework", role: "Strategic Implementation" }, // 11.png (Placeholder)
  { name: "Performance Summary", role: "Annual Review Report" }, // 12.png (Placeholder)
];

const cards = document.querySelectorAll(".card");
const dots = document.querySelectorAll(".dot");
const memberName = document.querySelector(".member-name");
const memberRole = document.querySelector(".member-role");
const upArrows = document.querySelectorAll(".nav-arrow.up");
const downArrows = document.querySelectorAll(".nav-arrow.down");

let currentIndex = 0;
let isAnimating = false;
let autoSlideInterval;
let isMouseOverCard = false; // Changed tracker strictly for image card hover presence

// Reduced from 800ms to 400ms to allow much faster user clicking without getting "stuck"
const ANIMATION_LOCK_DURATION = 400;

function updateCarousel(newIndex, isFirstLoad = false) {
  if (isAnimating) return;

  const targetIndex = (newIndex + cards.length) % cards.length;

  // Prevent running the animation if the user clicks the dot of the slide they are already on
  if (!isFirstLoad && targetIndex === currentIndex) return;

  isAnimating = true;
  currentIndex = targetIndex;

  cards.forEach((card, i) => {
    const offset = (i - currentIndex + cards.length) % cards.length;

    card.classList.remove(
      "center",
      "up-1",
      "up-2",
      "down-1",
      "down-2",
      "hidden",
    );

    if (offset === 0) {
      card.classList.add("center");
    } else if (offset === 1) {
      card.classList.add("down-1");
    } else if (offset === 2) {
      card.classList.add("down-2");
    } else if (offset === cards.length - 1) {
      card.classList.add("up-1");
    } else if (offset === cards.length - 2) {
      card.classList.add("up-2");
    } else {
      card.classList.add("hidden");
    }
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });

  memberName.style.opacity = "0";
  memberRole.style.opacity = "0";

  // Faster text transition
  setTimeout(() => {
    const member = teamMembers[currentIndex] || {
      name: `Dashboard ${currentIndex + 1}`,
      role: "System Data",
    };
    memberName.textContent = member.name;
    memberRole.textContent = member.role;
    memberName.style.opacity = "1";
    memberRole.style.opacity = "1";
  }, 200);

  // Unlock the carousel faster so it feels highly responsive to user clicks
  setTimeout(() => {
    isAnimating = false;
  }, ANIMATION_LOCK_DURATION);
}

// --- Auto-Slide Logic ---
function startAutoSlide() {
  stopAutoSlide();
  // Only execute cycle if the mouse pointer is NOT hovering over an image card
  if (!isMouseOverCard) {
    autoSlideInterval = setInterval(() => {
      updateCarousel(currentIndex + 1);
    }, 3500); // Gives slightly more reading time (3.5s) per slide
  }
}

function stopAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }
}

// Intercepts deliberate human navigation actions
function handleUserAction(actionFunction) {
  stopAutoSlide();
  actionFunction();
  // Respects card hover state; will not kick-start a loop if the cursor is remaining on the image
  startAutoSlide();
}

// --- Event Listeners ---
upArrows.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    handleUserAction(() => updateCarousel(currentIndex - 1));
  });
});

downArrows.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    handleUserAction(() => updateCarousel(currentIndex + 1));
  });
});

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    handleUserAction(() => updateCarousel(i));
  });
});

/* --- UPDATED: Combined Card Click & Hover Listeners --- */
cards.forEach((card, i) => {
  // Navigation on click
  card.addEventListener("click", () => {
    handleUserAction(() => updateCarousel(i));
  });

  // Pauses carousel only when mouse is explicitly on top of this image card
  card.addEventListener("mouseenter", () => {
    isMouseOverCard = true;
    stopAutoSlide();
  });

  // Resumes carousel cycle as soon as mouse moves off this image card
  card.addEventListener("mouseleave", () => {
    isMouseOverCard = false;
    startAutoSlide();
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    handleUserAction(() => updateCarousel(currentIndex - 1));
  } else if (e.key === "ArrowDown") {
    handleUserAction(() => updateCarousel(currentIndex + 1));
  }
});

// --- Touch Swipe Support ---
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenY;
});

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenY;
  handleUserAction(handleSwipe);
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      updateCarousel(currentIndex + 1);
    } else {
      updateCarousel(currentIndex - 1);
    }
  }
}

// --- Launch Initialization ---

// Passing 'true' prevents the animation lock from firing on the very first page load
updateCarousel(0, true);
startAutoSlide();
