// Helper Utilities

export function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

export function getMediaTypeIcon(type) {
  const icons = {
    video: "fa-video",
    music: "fa-music",
    picture: "fa-image",
    text: "fa-file-lines",
  };
  return icons[type] || "fa-circle";
}

export function getMediaTypePage(type) {
  const currentPath = window.location.pathname;
  const isInPagesFolder = currentPath.includes("/pages/");
  const prefix = isInPagesFolder ? "" : "pages/";

  const pages = {
    video: `${prefix}videos.html`,
    music: `${prefix}music.html`,
    picture: `${prefix}pictures.html`,
    text: `${prefix}text.html`,
  };
  return pages[type] || "index.html";
}

export function getEmbedCode(url, type) {
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

export function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
