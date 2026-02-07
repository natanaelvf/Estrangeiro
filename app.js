// Somos Todxs Estrangeirxs - Application Logic

// ===== DATA MANAGEMENT =====
class SubmissionManager {
  constructor() {
    this.storageKey = "estrangeiro_submissions";
    this.submissions = this.loadSubmissions();
  }

  loadSubmissions() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  saveSubmissions() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.submissions));
  }

  addSubmission(submission) {
    const newSubmission = {
      id: this.generateId(),
      ...submission,
      timestamp: Date.now(),
      views: 0,
    };
    this.submissions.unshift(newSubmission);
    this.saveSubmissions();
    return newSubmission;
  }

  getSubmissions(type = null, sortBy = "recent") {
    let filtered = type
      ? this.submissions.filter((s) => s.type === type)
      : this.submissions;

    if (sortBy === "popular") {
      filtered.sort((a, b) => b.views - a.views);
    } else {
      filtered.sort((a, b) => b.timestamp - a.timestamp);
    }

    return filtered;
  }

  getSubmissionById(id) {
    return this.submissions.find((s) => s.id === id);
  }

  incrementViews(id) {
    const submission = this.getSubmissionById(id);
    if (submission) {
      submission.views++;
      this.saveSubmissions();
    }
  }

  deleteSubmission(id) {
    this.submissions = this.submissions.filter((s) => s.id !== id);
    this.saveSubmissions();
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

// Initialize manager
const submissionManager = new SubmissionManager();

// ===== MEDIA EMBEDDING =====
function getEmbedCode(url, type) {
  if (!url) return null;

  // YouTube
  const youtubeMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/,
  );
  if (youtubeMatch) {
    return `<iframe src="https://www.youtube.com/embed/${youtubeMatch[1]}" frameborder="0" allowfullscreen></iframe>`;
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `<iframe src="https://player.vimeo.com/video/${vimeoMatch[1]}" frameborder="0" allowfullscreen></iframe>`;
  }

  // Spotify
  const spotifyMatch = url.match(
    /spotify\.com\/(track|album|playlist)\/([a-zA-Z0-9]+)/,
  );
  if (spotifyMatch) {
    return `<iframe src="https://open.spotify.com/embed/${spotifyMatch[1]}/${spotifyMatch[2]}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
  }

  // SoundCloud
  if (url.includes("soundcloud.com")) {
    return `<iframe width="100%" height="200" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff8c42&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"></iframe>`;
  }

  // Direct image link
  if (type === "picture" && url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
    return `<img src="${url}" alt="Submitted image">`;
  }

  // Direct audio link
  if (type === "music" && url.match(/\.(mp3|wav|ogg)$/i)) {
    return `<audio controls><source src="${url}"></audio>`;
  }

  // Direct video link
  if (type === "video" && url.match(/\.(mp4|webm|ogg)$/i)) {
    return `<video controls><source src="${url}"></video>`;
  }

  return null;
}

// ===== MEDIA TYPE ICONS =====
function getMediaTypeIcon(type) {
  const icons = {
    video: "fa-video",
    music: "fa-music",
    picture: "fa-image",
    text: "fa-file-lines",
  };
  return icons[type] || "fa-circle";
}

function getMediaTypePage(type) {
  const pages = {
    video: "videos.html",
    music: "music.html",
    picture: "pictures.html",
    text: "text.html",
  };
  return pages[type] || "index.html";
}

// ===== RENDERING =====
function renderMediaCard(submission, showType = true) {
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
      // Check if this is a carousel post
      const hasCarousel =
        submission.carouselImages && submission.carouselImages.length > 0;
      const carouselIndicator = hasCarousel
        ? '<div class="carousel-indicator"><i class="fa-solid fa-images"></i></div>'
        : "";
      mediaContent = `<div class="card-media">${carouselIndicator}<img src="${submission.content}" alt="${escapeHtml(submission.title)}"></div>`;
    } else if (submission.type === "video") {
      mediaContent = `<div class="card-media"><video controls><source src="${submission.content}"></video></div>`;
    } else if (submission.type === "music") {
      mediaContent = `<div class="card-media"><audio controls><source src="${submission.content}"></audio></div>`;
    }
  }

  const icon = getMediaTypeIcon(submission.type);
  const typeLabel = showType
    ? `<a href="${getMediaTypePage(submission.type)}" class="card-type"><i class="fa-solid ${icon}"></i>${submission.type}</a>`
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

function updateViewCount(id) {
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

function renderSubmissions(type = null, sortBy = "recent") {
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

// ===== TEXT MODAL =====
function showTextModal(submission) {
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

  // Add modal styles
  const style = document.createElement("style");
  style.textContent = `
    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2000;
    }
    .modal.active {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .modal-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(5px);
    }
    .modal-dialog {
      position: relative;
      background: var(--dark-bg);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: var(--spacing-lg);
      max-width: 800px;
      max-height: 80vh;
      overflow-y: auto;
      z-index: 1;
      margin: var(--spacing-md);
    }
    .modal-title {
      margin-bottom: var(--spacing-sm);
      padding-right: var(--spacing-xl);
    }
    .modal-meta {
      color: var(--muted-text);
      margin-bottom: var(--spacing-md);
      padding-bottom: var(--spacing-md);
      border-bottom: 1px solid var(--border-color);
    }
    .modal-content-text {
      white-space: pre-wrap;
      line-height: 1.8;
      color: var(--light-text);
    }
  `;
  document.head.appendChild(style);

  // Close handlers
  modal
    .querySelector(".modal-overlay")
    .addEventListener("click", closeTextModal);

  document.body.appendChild(modal);
  return modal;
}

function closeTextModal() {
  const modal = document.getElementById("textModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// ===== CAROUSEL MODAL (Instagram-style) =====
let currentCarouselIndex = 0;
let currentCarouselImages = [];

function showCarouselModal(submission) {
  const modal =
    document.getElementById("carouselModal") || createCarouselModal();

  currentCarouselImages = submission.carouselImages || [];
  currentCarouselIndex = 0;

  const title = modal.querySelector(".carousel-modal-title");
  const meta = modal.querySelector(".carousel-modal-meta");

  title.textContent = submission.title;

  const creatorText = submission.creator ? `by ${submission.creator}` : "";
  const dateText = new Date(submission.timestamp).toLocaleDateString();
  meta.innerHTML = `${creatorText} ${creatorText && "•"} ${dateText}`;

  updateCarouselImage();
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function createCarouselModal() {
  const modal = document.createElement("div");
  modal.id = "carouselModal";
  modal.className = "modal carousel-modal";
  modal.innerHTML = `
    <div class="modal-overlay"></div>
    <div class="carousel-modal-dialog">
      <h2 class="carousel-modal-title"></h2>
      <div class="carousel-modal-meta"></div>
      
      <div class="carousel-container">
        <button class="carousel-btn carousel-prev" aria-label="Previous image">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        
        <div class="carousel-image-container">
          <img src="" alt="Carousel image" class="carousel-image">
        </div>
        
        <button class="carousel-btn carousel-next" aria-label="Next image">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
      
      <div class="carousel-indicators"></div>
    </div>
  `;

  // Add carousel styles
  const style = document.createElement("style");
  style.textContent = `
    .carousel-modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2000;
    }
    
    .carousel-modal.active {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .carousel-modal .modal-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(5px);
      z-index: 0;
    }
    
    .carousel-modal-dialog {
      position: relative;
      background: #ffffff;
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: var(--spacing-lg);
      max-width: 900px;
      max-height: 90vh;
      overflow-y: auto;
      z-index: 1;
      margin: var(--spacing-md);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    }
    
    .carousel-modal-title {
      margin-bottom: var(--spacing-sm);
      padding-right: var(--spacing-xl);
      font-size: 1.5rem;
    }
    
    .carousel-modal-meta {
      color: var(--muted-text);
      margin-bottom: var(--spacing-md);
      padding-bottom: var(--spacing-md);
      border-bottom: 1px solid var(--border-color);
      font-size: 0.9rem;
    }
    
    .carousel-container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-md);
    }
    
    .carousel-image-container {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--lighter-bg);
      border-radius: 8px;
      overflow: hidden;
      min-height: 400px;
      max-height: 450px;
    }
    
    .carousel-image {
      max-width: 100%;
      max-height: 450px;
      width: auto;
      height: auto;
      object-fit: contain;
      border-radius: 8px;
      transition: opacity var(--transition-fast);
    }
    
    .carousel-image.loading {
      opacity: 0.5;
    }
    
    .carousel-btn {
      background: var(--primary-orange);
      border: none;
      color: white;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      cursor: pointer;
      transition: all var(--transition-fast);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      flex-shrink: 0;
    }
    
    .carousel-btn:hover {
      background: var(--secondary-orange);
      transform: scale(1.1);
    }
    
    .carousel-btn:disabled {
      background: var(--border-color);
      cursor: not-allowed;
      opacity: 0.5;
    }
    
    .carousel-btn:disabled:hover {
      transform: scale(1);
    }
    
    .carousel-indicators {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      padding: var(--spacing-sm) 0;
    }
    
    .carousel-indicator-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--border-color);
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    
    .carousel-indicator-dot.active {
      background: var(--primary-orange);
      width: 24px;
      border-radius: 4px;
    }
    
    .carousel-indicator-dot:hover {
      background: var(--accent-orange);
    }
    
    .carousel-indicator {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    
    @media (max-width: 768px) {
      .carousel-modal-dialog {
        padding: var(--spacing-md);
        margin: var(--spacing-sm);
      }
      
      .carousel-btn {
        width: 36px;
        height: 36px;
        font-size: 1rem;
      }
      
      .carousel-image-container {
        min-height: 300px;
        max-height: 400px;
      }
      
      .carousel-image {
        max-height: 400px;
      }
    }
  `;
  document.head.appendChild(style);

  // Event listeners
  const prevBtn = modal.querySelector(".carousel-prev");
  const nextBtn = modal.querySelector(".carousel-next");

  prevBtn.addEventListener("click", () => navigateCarousel(-1));
  nextBtn.addEventListener("click", () => navigateCarousel(1));

  // Close handlers
  modal
    .querySelector(".modal-overlay")
    .addEventListener("click", closeCarouselModal);

  // Keyboard navigation
  document.addEventListener("keydown", handleCarouselKeyboard);

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  const imageContainer = modal.querySelector(".carousel-image-container");
  imageContainer.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  imageContainer.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
      navigateCarousel(1); // Swipe left - next
    } else if (touchEndX - touchStartX > swipeThreshold) {
      navigateCarousel(-1); // Swipe right - prev
    }
  }

  document.body.appendChild(modal);
  return modal;
}

function navigateCarousel(direction) {
  currentCarouselIndex += direction;

  // Loop around
  if (currentCarouselIndex < 0) {
    currentCarouselIndex = currentCarouselImages.length - 1;
  } else if (currentCarouselIndex >= currentCarouselImages.length) {
    currentCarouselIndex = 0;
  }

  updateCarouselImage();
}

function updateCarouselImage() {
  const modal = document.getElementById("carouselModal");
  if (!modal) return;

  const img = modal.querySelector(".carousel-image");
  const prevBtn = modal.querySelector(".carousel-prev");
  const nextBtn = modal.querySelector(".carousel-next");
  const indicatorsContainer = modal.querySelector(".carousel-indicators");

  // Update image
  img.classList.add("loading");
  img.src = currentCarouselImages[currentCarouselIndex];
  img.onload = () => img.classList.remove("loading");

  // Update buttons (always enabled for looping)
  prevBtn.disabled = false;
  nextBtn.disabled = false;

  // Update indicators
  indicatorsContainer.innerHTML = "";
  currentCarouselImages.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = `carousel-indicator-dot ${index === currentCarouselIndex ? "active" : ""}`;
    dot.addEventListener("click", () => {
      currentCarouselIndex = index;
      updateCarouselImage();
    });
    indicatorsContainer.appendChild(dot);
  });
}

function handleCarouselKeyboard(e) {
  const modal = document.getElementById("carouselModal");
  if (!modal || !modal.classList.contains("active")) return;

  if (e.key === "ArrowLeft") {
    navigateCarousel(-1);
  } else if (e.key === "ArrowRight") {
    navigateCarousel(1);
  } else if (e.key === "Escape") {
    closeCarouselModal();
  }
}

function closeCarouselModal() {
  const modal = document.getElementById("carouselModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    currentCarouselImages = [];
    currentCarouselIndex = 0;
  }
}

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

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ===== UTILITIES =====
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
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
