// Add jornal post to existing data
// Open the browser console (F12) and paste this entire script

const jornalPost = {
  id: "jornal-post-1",
  type: "picture",
  title: "Estrangeiro - Jornal Literário",
  description:
    "Uma edição especial do jornal sobre a experiência de ser estrangeiro",
  creator: "SESLA - AAC",
  content: "assets/jornal/thumbnail.jpg",
  contentType: "file",
  timestamp: Date.now(),
  views: 12,
  carouselImages: [
    "assets/jornal/capa.jpg",
    "assets/jornal/pagina_1.jpg",
    "assets/jornal/pagina_2.jpg",
    "assets/jornal/pagina_3.jpg",
    "assets/jornal/pagina_4.jpg",
  ],
};

// Get existing data
const existingData = JSON.parse(
  localStorage.getItem("estrangeiro_submissions") || "[]",
);

// Remove old jornal post if it exists
const filtered = existingData.filter((item) => item.id !== "jornal-post-1");

// Add new jornal post at the beginning
filtered.unshift(jornalPost);

// Save back to localStorage
localStorage.setItem("estrangeiro_submissions", JSON.stringify(filtered));

console.log("✅ Jornal post added successfully!");
location.reload();
