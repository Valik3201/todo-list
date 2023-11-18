// Function to toggle between light and dark themes
function toggleTheme() {
  const body = document.body;
  const currentTheme = body.classList.contains("dark-theme") ? "dark" : "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  // Remove the current theme class and add the new theme class
  body.classList.remove(`${currentTheme}-theme`);
  body.classList.add(`${newTheme}-theme`);

  // Save the selected theme to localStorage
  localStorage.setItem("theme", newTheme);
}

// Function to set the theme based on localStorage or default to light theme
function setTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  const body = document.body;

  // Add the saved theme class to the body
  body.classList.add(`${savedTheme}-theme`);
}

// Set the initial theme when the page loads
setTheme();

// Add click event listener to the theme switcher element
const themeSwitcher = document.querySelector(".header--theme");
themeSwitcher.addEventListener("click", toggleTheme);
