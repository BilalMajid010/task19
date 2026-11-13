const STORAGE_KEY = "forma-theme";
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const icon = document.querySelector("#theme-icon");
  const toggle = document.querySelector("#theme-toggle");

  if (icon) icon.textContent = theme === "dark" ? "☀" : "☾";
  if (toggle) {
    const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
    toggle.setAttribute("aria-label", label);
    toggle.setAttribute("title", label);
  }
}

export function getPreferredTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  return savedTheme || (mediaQuery.matches ? "dark" : "light");
}

export function initializeTheme() {
  applyTheme(getPreferredTheme());

  document.querySelector("#theme-toggle")?.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  });

  document.querySelector("#system-theme")?.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    applyTheme(mediaQuery.matches ? "dark" : "light");
    showToast("Using your system theme preference.");
  });

  mediaQuery.addEventListener("change", (event) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(event.matches ? "dark" : "light");
    }
  });
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("toast--visible");
  window.setTimeout(() => toast.classList.remove("toast--visible"), 2600);
}