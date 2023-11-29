/**
 * Toggles between light and dark themes, updates the theme icon, and saves the selected theme to localStorage.
 */
function toggleTheme() {
  // Get a reference to the body element
  const body = document.body;

  // Determine the current theme and the new theme
  const currentTheme = body.classList.contains("dark-theme") ? "dark" : "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  // Change the theme icon before updating the class to avoid flickering
  const themeIcon = document.getElementById("theme-icon");
  themeIcon.src =
    newTheme === "dark" ? "./assets/icon-sun.svg" : "./assets/icon-moon.svg";
  themeIcon.alt = newTheme === "dark" ? "Sun Icon" : "Moon Icon";

  // Remove the current theme class and add the new theme class
  body.classList.remove(`${currentTheme}-theme`);
  body.classList.add(`${newTheme}-theme`);

  // Save the selected theme to localStorage
  localStorage.setItem("theme", newTheme);
}

/**
 * Sets the theme based on localStorage or defaults to the light theme.
 */
function setTheme() {
  // Retrieve the saved theme from localStorage or default to light
  const savedTheme = localStorage.getItem("theme") || "light";

  // Get a reference to the body element
  const body = document.body;

  // Add the saved theme class to the body
  body.classList.add(`${savedTheme}-theme`);

  // Set the initial theme icon
  const themeIcon = document.getElementById("theme-icon");
  themeIcon.src =
    savedTheme === "dark" ? "./assets/icon-sun.svg" : "./assets/icon-moon.svg";
  themeIcon.alt = savedTheme === "dark" ? "Sun Icon" : "Moon Icon";
}

// Set the initial theme when the page loads
setTheme();

// Add click event listener to the theme switcher element
const themeSwitcher = document.querySelector(".header--theme");
themeSwitcher.addEventListener("click", toggleTheme);
