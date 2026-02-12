// Media Renderer - Handles rendering of media cards and submissions

import { SubmissionManager } from "../managers/submission-manager.js";
import {
  escapeHtml,
  getMediaTypeIcon,
  getMediaTypePage,
  getEmbedCode,
} from "../utils/helpers.js";
import { showTextModal } from "../../components/modals/text-modal.js";
import { showCarouselModal } from "../../components/carousel/carousel.js";

let submissionManager;

export function initRenderer(manager) {
  submissionManager = manager;
}

export function renderMediaCard(submission, showType = true) {
  const card = document.createElement("article");
  card.className = "media-card fade-in";
  card.dataset.id = submission.id;

  let mediaContent = "";

  if (submission.type === "text") {
    mediaContent = `
      <div class="card-text-preview">
        <p>${escapeHtml(submission.content.substring(0, 200))}${submission.content.length > 200 ? "..." : ""}</p>
      </div>
    `;
  } else if (submission.contentType === "link") {
    const embedCode = getEmbedCode(submission.content, submission.type);
    mediaContent = `
      <div class="card-media">
        ${embedCode || `<p class="text-muted">External link: <a href="${escapeHtml(submission.content)}" target="_blank">View ${submission.type}</a></p>`}
      </div>
    `;
  } else {
    // File upload
    if (submission.type === "picture") {
      mediaContent = `<div class="card-media"><img src="${submission.content}" alt="${escapeHtml(submission.title)}"></div>`;
    } else if (submission.type === "video") {
      mediaContent = `<div class="card-media"><video controls><source src="${submission.content}"></video></div>`;
    } else if (submission.type === "music") {
      mediaContent = `<div class="card-media"><audio controls><source src="${submission.content}"></audio></div>`;
    }
  }

  const icon = getMediaTypeIcon(submission.type);
  const typeLabel = showType
    ? `<a href="${getMediaTypePage(submission.type)}" class="card-type">${submission.type}</a>`
    : "";
  const creatorText = submission.creator
    ? `<span class="card-creator">by ${escapeHtml(submission.creator)}</span>`
    : "";
  const dateText = new Date(submission.timestamp).toLocaleDateString();

  card.innerHTML = `
    ${typeLabel}
    ${mediaContent}
    <h3 class="card-title">${escapeHtml(submission.title)}</h3>
    <p class="card-description">${escapeHtml(submission.description)}</p>
    <div class="card-meta">
      <div>${creatorText} ${creatorText && "•"} ${dateText}</div>
      <div class="card-views">
        <span>👁</span>
        <span>${submission.views}</span>
      </div>
    </div>
  `;

  // Prevent card-type link from triggering card click
  const typeLink = card.querySelector(".card-type");
  if (typeLink) {
    typeLink.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  // Add click handler for text submissions to show full content
  if (submission.type === "text") {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      showTextModal(submission);
      submissionManager.incrementViews(submission.id);
      updateViewCount(submission.id);
    });
  } else if (
    submission.type === "picture" &&
    submission.carouselImages &&
    submission.carouselImages.length > 0
  ) {
    // Handle carousel images (Instagram-style)
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      showCarouselModal(submission);
      submissionManager.incrementViews(submission.id);
      updateViewCount(submission.id);
    });
  } else {
    // Increment views on interaction
    card.addEventListener("click", () => {
      submissionManager.incrementViews(submission.id);
      updateViewCount(submission.id);
    });
  }

  return card;
}

export function updateViewCount(id) {
  const card = document.querySelector(
    `[data-id="${id}"] .card-views span:last-child`,
  );
  if (card) {
    const submission = submissionManager.getSubmissionById(id);
    if (submission) {
      card.textContent = submission.views;
    }
  }
}

export function renderSubmissions(type = null, sortBy = "recent") {
  const container = document.getElementById("mediaGrid");
  if (!container) return;

  const submissions = submissionManager.getSubmissions(type, sortBy);
  container.innerHTML = "";

  if (submissions.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📭</div>
        <h3>No submissions yet</h3>
        <p>Be the first to share your story</p>
        <a href="submit.html" class="btn btn-primary mt-2">Submit Now</a>
      </div>
    `;
    return;
  }

  submissions.forEach((submission) => {
    const showType = type === null; // Only show type badge on homepage
    container.appendChild(renderMediaCard(submission, showType));
  });
}
