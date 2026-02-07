// Carousel Component - Instagram-style image carousel

let currentCarouselIndex = 0;
let currentCarouselImages = [];

export function showCarouselModal(submission) {
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

export function closeCarouselModal() {
  const modal = document.getElementById("carouselModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    currentCarouselImages = [];
    currentCarouselIndex = 0;
  }
}
