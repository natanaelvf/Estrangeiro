document.addEventListener("DOMContentLoaded", () => {
  const svg = document.getElementById("mobius-svg");
  const svgPath = document.getElementById("mobius-curve");

  // ── 1. Load submissions ──────────────────────────────────────────
  let submissions = [];
  try {
    const data = localStorage.getItem("estrangeiro_submissions");
    if (data) submissions = JSON.parse(data);
  } catch (e) {
    console.error("Could not parse submissions", e);
  }

  if (!submissions || submissions.length === 0) {
    submissions = [
      { id: "text-carolina-fidalgo-1", title: "Cães Brancos, Cães Pretos" },
      { id: "text-delano-valentim-1", title: "Dona Tânia" },
      { id: "text-delano-valentim-2", title: "Lá" },
      { id: "text-eugenio-luis-1", title: "Sinais de fumo" },
      { id: "text-natanael-ferreira-1", title: "Vida" },
      { id: "chosen-video-1", title: "Irish Travellers" },
      { id: "chosen-video-2", title: "Island of my Dreams" },
      { id: "chosen-video-3", title: "Balada de um Batráquio" },
      { id: "text-vera-araujo-1", title: "Tod@s somos estrangeir@s em algum lugar" },
    ];
  }

  // ── 2. Generate a random convex blob path ────────────────────────
  const cx = 500, cy = 300;
  const NUM_POINTS = 12;
  const BASE_RADIUS = 180;
  const VARIATION = 40; // ± variation for organic feel

  function generateBlobPoints() {
    const points = [];
    for (let i = 0; i < NUM_POINTS; i++) {
      const angle = (2 * Math.PI * i) / NUM_POINTS;
      const r = BASE_RADIUS + (Math.random() - 0.5) * 2 * VARIATION;
      points.push({
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
      });
    }
    return points;
  }

  function pointsToSmoothPath(pts) {
    // Catmull-Rom → cubic bezier for a closed smooth shape
    const n = pts.length;
    let d = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)} `;
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n];
      const p1 = pts[i];
      const p2 = pts[(i + 1) % n];
      const p3 = pts[(i + 2) % n];

      // Convert Catmull-Rom to cubic Bezier control points
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += `C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)} `;
    }
    d += "Z";
    return d;
  }

  const blobPoints = generateBlobPoints();
  const blobPath = pointsToSmoothPath(blobPoints);
  svgPath.setAttribute("d", blobPath);

  // ── 3. Create individually clickable titles on the path ──────────
  const textGroup = document.getElementById("mobius-text-group");
  // Clear existing content
  textGroup.innerHTML = "";

  const separator = " • ";
  // Build title entries with their submission data
  const titleEntries = [];
  submissions.forEach((sub) => {
    titleEntries.push({ text: sub.title, id: sub.id, isSep: false });
    titleEntries.push({ text: separator, id: null, isSep: true });
  });

  // Repeat enough times to fill the path
  const repeatedEntries = [];
  for (let rep = 0; rep < 4; rep++) {
    repeatedEntries.push(...titleEntries);
  }

  // Create a <text> element with individual <textPath><tspan> elements
  const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
  textEl.classList.add("mobius-text");

  const textPathEl = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
  textPathEl.id = "mobius-text-path";
  textPathEl.setAttribute("href", "#mobius-curve");
  textPathEl.setAttribute("startOffset", "0%");

  repeatedEntries.forEach((entry) => {
    const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    tspan.textContent = entry.text;
    if (!entry.isSep && entry.id) {
      tspan.classList.add("title-link");
      tspan.dataset.submissionId = entry.id;
      // Click handler → navigate to classic.html with hash
      tspan.addEventListener("click", (e) => {
        e.stopPropagation();
        window.location.href = `classic.html#submission-${entry.id}`;
      });
      // Hover effects
      tspan.addEventListener("mouseenter", () => {
        tspan.style.fill = "#8b4513";
        tspan.style.textDecoration = "underline";
      });
      tspan.addEventListener("mouseleave", () => {
        tspan.style.fill = "";
        tspan.style.textDecoration = "";
      });
    }
    textPathEl.appendChild(tspan);
  });

  textEl.appendChild(textPathEl);
  textGroup.appendChild(textEl);

  // ── 4. Animation (with pause/play) ───────────────────────────────
  let offset = 0;
  let isPaused = false;
  let animFrameId = null;

  function animateText() {
    if (!isPaused) {
      offset -= 0.04;
      if (offset <= -100) offset = 0;
      textPathEl.setAttribute("startOffset", `${offset}%`);
    }
    animFrameId = requestAnimationFrame(animateText);
  }
  animateText();

  // Pause/Play button
  const pauseBtn = document.getElementById("pause-btn");
  if (pauseBtn) {
    pauseBtn.addEventListener("click", () => {
      isPaused = !isPaused;
      const icon = pauseBtn.querySelector("i");
      const label = pauseBtn.querySelector("span");
      if (isPaused) {
        icon.className = "fa-solid fa-play";
        label.textContent = "Play";
      } else {
        icon.className = "fa-solid fa-pause";
        label.textContent = "Pause";
      }
    });
  }

  // ── 5. Draggable & Distortable Physics ───────────────────────────
  let isDragging = false;
  let dragStartTime = 0;

  // Store the original blob points and create dynamic copies
  const basePoints = blobPoints.map((p) => ({ ...p }));
  const currPoints = blobPoints.map((p) => ({ ...p }));
  const targetPoints = blobPoints.map((p) => ({ ...p }));

  function updatePath() {
    svgPath.setAttribute("d", pointsToSmoothPath(currPoints));
  }

  function physicsLoop() {
    for (let i = 0; i < currPoints.length; i++) {
      if (!isDragging) {
        targetPoints[i].x = basePoints[i].x;
        targetPoints[i].y = basePoints[i].y;
      }
      const lerp = 0.08;
      currPoints[i].x += (targetPoints[i].x - currPoints[i].x) * lerp;
      currPoints[i].y += (targetPoints[i].y - currPoints[i].y) * lerp;
    }
    updatePath();
    requestAnimationFrame(physicsLoop);
  }
  physicsLoop();

  function getMousePos(e) {
    const rect = svg.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const scaleX = 1000 / rect.width;
    const scaleY = 600 / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  }

  function startDrag(e) {
    isDragging = true;
    dragStartTime = Date.now();
    svg.style.cursor = "grabbing";
    updateTarget(e);
  }

  function doDrag(e) {
    if (!isDragging) return;
    e.preventDefault();
    updateTarget(e);
  }

  function endDrag() {
    isDragging = false;
    svg.style.cursor = "default";
  }

  function updateTarget(e) {
    const pos = getMousePos(e);
    // Push nearby blob points outward from mouse
    for (let i = 0; i < basePoints.length; i++) {
      const dx = basePoints[i].x - pos.x;
      const dy = basePoints[i].y - pos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - dist / 250);
      targetPoints[i].x = basePoints[i].x + (pos.x - cx) * influence * 0.4;
      targetPoints[i].y = basePoints[i].y + (pos.y - cy) * influence * 0.4;
    }
  }

  svg.addEventListener("mousedown", startDrag);
  window.addEventListener("mousemove", doDrag);
  window.addEventListener("mouseup", endDrag);
  svg.addEventListener("touchstart", startDrag, { passive: false });
  window.addEventListener("touchmove", doDrag, { passive: false });
  window.addEventListener("touchend", endDrag);

  // ── 6. Background Bubbles ────────────────────────────────────────
  createBubbles();
});

function createBubbles() {
  const container = document.getElementById("bubbles-container");
  if (!container) return;

  const BUBBLE_COUNT = 25;
  // Subtle paler and darker variants of #fcf6f5
  const bubbleColors = [
    "rgba(255, 252, 250, 0.6)",   // slightly paler
    "rgba(255, 250, 248, 0.5)",   // paler
    "rgba(245, 235, 232, 0.4)",   // slightly darker
    "rgba(240, 228, 225, 0.35)",  // darker
    "rgba(250, 244, 242, 0.5)",   // mid-pale
    "rgba(235, 222, 218, 0.3)",   // darker accent
  ];

  for (let i = 0; i < BUBBLE_COUNT; i++) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    const size = 30 + Math.random() * 120;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
    const duration = 15 + Math.random() * 25;
    const delay = Math.random() * -30;

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${x}%`;
    bubble.style.top = `${y}%`;
    bubble.style.backgroundColor = color;
    bubble.style.animationDuration = `${duration}s`;
    bubble.style.animationDelay = `${delay}s`;

    container.appendChild(bubble);
  }
}
