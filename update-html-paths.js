// Update Script - Run this to update all page HTML imports
// This script can be used to batch update the remaining HTML files

const fs = require("fs");
const path = require("path");

const pages = [
  "E:/Estrangeiro/pages/pictures.html",
  "E:/Estrangeiro/pages/videos.html",
  "E:/Estrangeiro/pages/music.html",
  "E:/Estrangeiro/pages/text.html",
  "E:/Estrangeiro/pages/submit.html",
];

pages.forEach((page) => {
  let content = fs.readFileSync(page, "utf8");

  // Update CSS imports
  content = content.replace(
    '<link rel="stylesheet" href="style.css" />',
    '<link rel="stylesheet" href="../styles/main.css" />\n    <link rel="stylesheet" href="../components/modals/text-modal.css" />\n    <link rel="stylesheet" href="../components/carousel/carousel.css" />',
  );

  // Update JS imports
  content = content.replace(
    '<script src="components.js"></script>',
    '<script src="../components.js"></script>',
  );
  content = content.replace(
    '<script src="sample-data.js"></script>',
    '<script src="../js/data/sample-data.js"></script>',
  );
  content = content.replace(
    '<script src="app.js"></script>',
    '<script type="module" src="../js/app.js"></script>',
  );

  // Update navigation links
  content = content.replace(/href="index\.html"/g, 'href="../index.html"');
  content = content.replace(/href="pictures\.html"/g, 'href="pictures.html"');
  content = content.replace(/href="videos\.html"/g, 'href="videos.html"');
  content = content.replace(/href="music\.html"/g, 'href="music.html"');
  content = content.replace(/href="text\.html"/g, 'href="text.html"');
  content = content.replace(/href="submit\.html"/g, 'href="submit.html"');

  fs.writeFileSync(page, content);
  console.log(`Updated: ${page}`);
});

console.log("✅ All page HTML files updated!");
