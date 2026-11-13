import "./scss/main.scss";
import { initializeTheme } from "./theme.js";

initializeTheme();

const modal = document.querySelector("#demo-modal");
const toast = document.querySelector("#toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("toast--visible");
  window.setTimeout(() => toast.classList.remove("toast--visible"), 2600);
}

document.querySelector("#open-modal")?.addEventListener("click", () => modal.showModal());
document.querySelector("#close-modal")?.addEventListener("click", () => modal.close());
document.querySelector("#cancel-modal")?.addEventListener("click", () => modal.close());
document.querySelector("#confirm-modal")?.addEventListener("click", () => {
  modal.close();
  showToast("Action confirmed successfully.");
});

document.querySelector("#demo-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const message = document.querySelector("#form-message");

  if (!form.reportValidity()) return;
  message.textContent = "Form submitted successfully.";
  message.classList.add("form-message--success");
  form.reset();
});

document.querySelectorAll(".alert__close").forEach((button) => {
  button.addEventListener("click", () => button.closest(".alert")?.remove());
});

document.querySelector("#component-search")?.addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();
  document.querySelectorAll(".content-section").forEach((section) => {
    const searchableText = section.textContent.toLowerCase();
    section.hidden = query !== "" && !searchableText.includes(query);
  });
});

document.querySelectorAll(".sidebar__link").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".sidebar__link").forEach((item) => item.classList.remove("is-active"));
    link.classList.add("is-active");
  });
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    document.querySelector("#component-search")?.focus();
  }
});