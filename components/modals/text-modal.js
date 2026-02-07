// Text Modal Component

import { escapeHtml } from "../../js/utils/helpers.js";

export function showTextModal(submission) {
  const modal = document.getElementById("textModal") || createTextModal();
  const title = modal.querySelector(".modal-title");
  const content = modal.querySelector(".modal-content-text");
  const meta = modal.querySelector(".modal-meta");

  title.textContent = submission.title;
  content.textContent = submission.content;

  const creatorText = submission.creator ? `by ${submission.creator}` : "";
  const dateText = new Date(submission.timestamp).toLocaleDateString();
  meta.innerHTML = `${creatorText} ${creatorText && "•"} ${dateText}`;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function createTextModal() {
  const modal = document.createElement("div");
  modal.id = "textModal";
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-overlay"></div>
    <div class="modal-dialog">
      <h2 class="modal-title"></h2>
      <div class="modal-meta"></div>
      <div class="modal-content-text"></div>
    </div>
  `;

  // Close handlers
  modal
    .querySelector(".modal-overlay")
    .addEventListener("click", closeTextModal);

  document.body.appendChild(modal);
  return modal;
}

export function closeTextModal() {
  const modal = document.getElementById("textModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}
