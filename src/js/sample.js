// Expanded to 12 members to match your 12 images!
const teamMembers = [
  { name: "Presidential Dashboard", role: "Organizational Data Overview" },
  { name: "Board Examination Metrics", role: "Passing Efficiency Analysis" },
  { name: "Budget Utilization Rate", role: "Fiscal Accountability Matrix" },
  {
    name: "Global Recognition Matrix",
    role: "Sustainability & Innovation Rankings",
  },
  { name: "Campus Enrollment Trends", role: "Registrar Program Demographics" },
  { name: "Multi-Year Enrollment", role: "System Registration Trace" },
  { name: "Employability of Graduates", role: "Tracer Study Matrix" },
  { name: "Academic Programs Overview", role: "Institutional Accreditation" },
  { name: "Detailed Program Registry", role: "Accreditation Status List" },
  { name: "Performance Summary", role: "Annual Review Report" },
  { name: "Operations Framework", role: "Strategic Implementation" },
  { name: "System Initialization", role: "Access Verification Loading" },
];

const cards = document.querySelectorAll(".card");
const dots = document.querySelectorAll(".dot");
const memberName = document.querySelector(".member-name");
const memberRole = document.querySelector(".member-role");

let currentIndex = 0;
let isAnimating = false;
let autoSlideInterval;
let isMouseOverCard = false;

const ANIMATION_LOCK_DURATION = 400;

function updateCarousel(newIndex, isFirstLoad = false) {
  if (isAnimating) return;

  const targetIndex = (newIndex + cards.length) % cards.length;

  if (!isFirstLoad && targetIndex === currentIndex) return;

  isAnimating = true;
  currentIndex = targetIndex;

  cards.forEach((card, i) => {
    const offset = (i - currentIndex + cards.length) % cards.length;

    // Clean out all positional classes
    card.classList.remove(
      "center",
      "left-1",
      "left-2",
      "right-1",
      "right-2",
      "hidden",
    );

    // Map positional offsets horizontally instead of vertically
    if (offset === 0) {
      card.classList.add("center");
    } else if (offset === 1) {
      card.classList.add("right-1"); // Next card on the right
    } else if (offset === 2) {
      card.classList.add("right-2"); // Far right card
    } else if (offset === cards.length - 1) {
      card.classList.add("left-1"); // Previous card on the left
    } else if (offset === cards.length - 2) {
      card.classList.add("left-2"); // Far left card
    } else {
      card.classList.add("hidden");
    }
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });

  memberName.style.opacity = "0";
  memberRole.style.opacity = "0";

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

  setTimeout(() => {
    isAnimating = false;
  }, ANIMATION_LOCK_DURATION);
}

// --- Auto-Slide Logic ---
function startAutoSlide() {
  stopAutoSlide();
  if (!isMouseOverCard) {
    autoSlideInterval = setInterval(() => {
      updateCarousel(currentIndex + 1);
    }, 3500);
  }
}

function stopAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }
}

function handleUserAction(actionFunction) {
  stopAutoSlide();
  actionFunction();
  startAutoSlide();
}

// --- Event Listeners ---
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    handleUserAction(() => updateCarousel(i));
  });
});

cards.forEach((card, i) => {
  card.addEventListener("click", () => {
    handleUserAction(() => updateCarousel(i));
  });

  card.addEventListener("mouseenter", () => {
    isMouseOverCard = true;
    stopAutoSlide();
  });

  card.addEventListener("mouseleave", () => {
    isMouseOverCard = false;
    startAutoSlide();
  });
});

// Changed from Up/Down arrows to Left/Right arrows
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    handleUserAction(() => updateCarousel(currentIndex - 1));
  } else if (e.key === "ArrowRight") {
    handleUserAction(() => updateCarousel(currentIndex + 1));
  }
});

// --- Touch Swipe Support (Updated to Horizontal screenX) ---
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX; // Track horizontal touch position
});

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleUserAction(handleSwipe);
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      updateCarousel(currentIndex + 1); // Swiped left, go to next card
    } else {
      updateCarousel(currentIndex - 1); // Swiped right, go to previous card
    }
  }
}

// --- Launch Initialization ---
updateCarousel(0, true);
startAutoSlide();
