// Component templates - embedded directly to avoid CORS issues
const COMPONENTS = {
  navToggle: `
    <!-- Mobile Navigation Toggle -->
    <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation">
      ☰
    </button>
  `,

  nav: function () {
    const currentPath = window.location.pathname;
    const isInPagesFolder = currentPath.includes("/pages/");
    const prefix = isInPagesFolder ? "" : "pages/";
    const homeLink = isInPagesFolder ? "../index.html" : "index.html";

    return `
      <!-- Sidebar Navigation -->
      <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
          <a href="${homeLink}" class="logo">Somos Todxs Estrangeirxs</a>
          <p class="tagline">We Are All Foreigners</p>
        </div>

        <nav>
          <ul class="nav-menu">
            <li><a href="${homeLink}">Home</a></li>
            <li><a href="${prefix}videos.html">Videos</a></li>
            <li><a href="${prefix}music.html">Music</a></li>
            <li><a href="${prefix}pictures.html">Pictures</a></li>
            <li><a href="${prefix}text.html">Writing</a></li>
            <li>
              <a href="${prefix}submit.html" class="btn-primary" style="margin-top: 2rem"
                >Submit Your Story</a
              >
            </li>
          </ul>
        </nav>
      </aside>
    `;
  },

  footer: `
    <footer class="footer">
      <p>
        Uma iniciativa da Secção de Escrita e Leitura (SESLA) - Associação
        Académica de Coimbra
      </p>
    </footer>
  `,
};

// Load components into their containers
function loadComponent(elementId, componentKey) {
  const element = document.getElementById(elementId);
  if (element && COMPONENTS[componentKey]) {
    const component = COMPONENTS[componentKey];
    element.innerHTML =
      typeof component === "function" ? component() : component;
  }
}

// Load all components when DOM is ready
function loadAllComponents() {
  // Load navigation toggle
  loadComponent("navToggleContainer", "navToggle");

  // Load sidebar navigation
  loadComponent("navContainer", "nav");

  // Load footer
  loadComponent("footerContainer", "footer");

  // Re-initialize navigation after components are loaded
  if (typeof initMobileNav === "function") {
    initMobileNav();
  }

  // Set active nav link after navigation is loaded
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}

// Call this before other initializations
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadAllComponents);
} else {
  loadAllComponents();
}
