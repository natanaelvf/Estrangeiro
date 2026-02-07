// Main Application Entry Point
// Somos Todxs Estrangeirxs

import { SubmissionManager } from "./managers/submission-manager.js";
import { renderSubmissions, initRenderer } from "./renderers/media-renderer.js";
import { fileToDataURL } from "./utils/helpers.js";

// Initialize manager
const submissionManager = new SubmissionManager();
initRenderer(submissionManager);

// ===== FILTERS =====
function initFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const sortBy = btn.dataset.sort;
      const pageType = document.body.dataset.pageType;
      renderSubmissions(pageType === "home" ? null : pageType, sortBy);
    });
  });
}

// ===== MOBILE NAVIGATION =====
function initMobileNav() {
  const toggle = document.getElementById("navToggle");
  const sidebar = document.getElementById("sidebar");

  if (toggle && sidebar) {
    toggle.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });

    // Close sidebar when clicking outside
    document.addEventListener("click", (e) => {
      if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
        sidebar.classList.remove("active");
      }
    });
  }
}

// ===== FORM HANDLING =====
function initSubmissionForm() {
  const form = document.getElementById("submissionForm");
  if (!form) return;

  const typeSelect = document.getElementById("mediaType");
  const fileInput = document.getElementById("fileInput");
  const linkInput = document.getElementById("linkInput");
  const textInput = document.getElementById("textContent");
  const fileGroup = document.getElementById("fileGroup");
  const linkGroup = document.getElementById("linkGroup");
  const textGroup = document.getElementById("textGroup");

  // Handle media type change
  typeSelect.addEventListener("change", () => {
    const type = typeSelect.value;

    fileGroup.style.display = type !== "text" ? "block" : "none";
    linkGroup.style.display = type !== "text" ? "block" : "none";
    textGroup.style.display = type === "text" ? "block" : "none";

    // Update file input accept attribute
    if (type === "video") {
      fileInput.accept = "video/*";
    } else if (type === "music") {
      fileInput.accept = "audio/*";
    } else if (type === "picture") {
      fileInput.accept = "image/*";
    }
  });

  // Handle form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const type = typeSelect.value;
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const creator = document.getElementById("creator").value.trim();

    let content = "";
    let contentType = "";

    if (type === "text") {
      content = textInput.value.trim();
      contentType = "text";
    } else {
      const link = linkInput.value.trim();
      const file = fileInput.files[0];

      if (link) {
        content = link;
        contentType = "link";
      } else if (file) {
        content = await fileToDataURL(file);
        contentType = "file";
      } else {
        alert("Please provide either a file or a link");
        return;
      }
    }

    if (!title || !description || !content) {
      alert("Please fill in all required fields");
      return;
    }

    const submission = {
      type,
      title,
      description,
      creator,
      content,
      contentType,
    };

    submissionManager.addSubmission(submission);

    // Show success message
    alert("Submission successful! Thank you for sharing your story.");

    // Redirect to appropriate page
    const redirectPages = {
      video: "videos.html",
      music: "music.html",
      picture: "pictures.html",
      text: "text.html",
    };

    window.location.href = redirectPages[type] || "index.html";
  });
}

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initFilters();
  initSubmissionForm();

  // Render content based on page type
  const pageType = document.body.dataset.pageType;
  if (pageType && document.getElementById("mediaGrid")) {
    const sortBy =
      document.querySelector(".filter-btn.active")?.dataset.sort || "recent";
    renderSubmissions(pageType === "home" ? null : pageType, sortBy);
  }

  // Set active nav link
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});
