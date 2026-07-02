const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const feedbackMessage = document.getElementById("feedbackMessage");
const loginCard = document.getElementById("loginCard");

// 2. Authentication Handler
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  // Clear previous message states
  feedbackMessage.className = "message";
  feedbackMessage.textContent = "";
  loginCard.style.animation = "none";

  // Strict Validation Match
  if (username === "pdpz" && password === "pdpz") {
    feedbackMessage.classList.add("success");
    feedbackMessage.textContent = "Login successful! Redirecting...";
    loginCard.style.borderColor = "var(--success-color)";

    // Clean redirect hand-off
    setTimeout(() => {
      window.location.href = "/home.html";
    }, 1200);
  }
});
