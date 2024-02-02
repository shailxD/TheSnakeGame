const darkMode = () => {
  const darkModeToggleBtn = document.querySelector("#theme-toggle-dark");
  const lightModeToggleBtn = document.querySelector("#theme-toggle-light");
  const theme = localStorage.getItem("theme");

  // Function to toggle the theme
  const toggleTheme = () => {
    if (document.body.classList.contains("light-mode")) {
      // Switch to dark mode
      document.body.classList.remove("light-mode");
      localStorage.setItem("theme", "dark-mode");
      darkModeToggleBtn.style.display = "block";
      lightModeToggleBtn.style.display = "none";
    } else {
      // Switch to light mode
      document.body.classList.add("light-mode");
      localStorage.setItem("theme", "light-mode");
      darkModeToggleBtn.style.display = "none";
      lightModeToggleBtn.style.display = "block";
    }
  };

  // Check the saved theme and set the initial button display
  if (theme === "light-mode") {
    document.body.classList.add("light-mode");
    lightModeToggleBtn.style.display = "block";
    darkModeToggleBtn.style.display = "none";
  } else {
    darkModeToggleBtn.style.display = "block";
    lightModeToggleBtn.style.display = "none";
  }

  // Events
  darkModeToggleBtn.addEventListener("click", toggleTheme);
  lightModeToggleBtn.addEventListener("click", toggleTheme);
};

export default darkMode;
