# Somos Todxs Estrangeirxs

An art installation website exploring the universal experience of being foreign, feeling displaced, and the many forms of otherness.

## About

"Somos Todxs Estrangeirxs" (We Are All Foreigners) is an initiative by SESLA (Secção de Escrita e Leitura) from the Associação Académica de Coimbra. This website serves as a platform for collecting and displaying artistic and academic works that explore the theme of being foreign — a feeling that goes beyond simply crossing borders.

The theme encompasses:

- Solitude within society
- Feelings of estrangement and inadequacy
- Experiences of rejection from all forms of prejudice
- Identity displacement and belonging

## Features

- **Multi-media Submissions**: Support for videos, music, pictures, and written texts
- **External Link Integration**: Embed content from YouTube, Vimeo, Spotify, SoundCloud, and more
- **File Uploads**: Direct upload support for all media types
- **Categorized Views**: Dedicated pages for each media type
- **Sorting & Filtering**: View submissions by recent or popular
- **Responsive Design**: Works beautifully on all devices
- **Art Installation Aesthetic**: Orange-themed design with smooth animations

## Technology Stack

- **HTML5**: Semantic markup for accessibility
- **CSS3**: Custom properties, Grid, Flexbox, and animations
- **Vanilla JavaScript**: No dependencies, pure ES6+
- **localStorage**: Client-side data persistence

## Getting Started

1. Open `index.html` in a modern web browser
2. Explore existing submissions or navigate to different media categories
3. Click "Submit Your Story" to contribute your own work
4. Fill out the form with your submission details
5. Choose between file upload or external link (for videos, music, images)
6. Your submission will be saved locally and displayed on the site

## File Structure

```
Estrangeiro/
├── index.html          # Homepage with all submissions
├── videos.html         # Video submissions page
├── music.html          # Music submissions page
├── pictures.html       # Picture submissions page
├── text.html           # Written submissions page
├── submit.html         # Submission form
├── style.css           # Complete styling and design system
├── app.js              # Application logic and data management
└── README.md           # This file
```

## Data Storage

This implementation uses browser `localStorage` for data persistence. This means:

- ✅ No server required - runs entirely in the browser
- ✅ Perfect for demos, art installations, or personal use
- ✅ Fast and responsive
- ⚠️ Data is stored locally per browser/device
- ⚠️ Submissions are not shared between different users/browsers
- ⚠️ Clearing browser data will remove submissions

### For Production Use

To make submissions accessible to all visitors, you would need to:

1. Set up a backend server (Node.js, Python, PHP, etc.)
2. Create a database (MongoDB, PostgreSQL, MySQL, etc.)
3. Implement API endpoints for CRUD operations
4. Replace localStorage calls with API requests
5. Add file upload storage (cloud storage like AWS S3, Cloudinary, etc.)

## Browser Compatibility

Works on all modern browsers:

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

Requires JavaScript enabled.

## Customization

### Colors

Edit CSS custom properties in `style.css`:

```css
:root {
  --primary-orange: #ff8c42;
  --secondary-orange: #ff6b35;
  --accent-orange: #f4a259;
  /* ... */
}
```

### Typography

Change Google Fonts import in `style.css`:

```css
@import url("https://fonts.googleapis.com/css2?family=YourFont&display=swap");
```

## Contributing

Submissions are welcome from anyone, regardless of age, language, or nationality. The theme explores universal feelings of displacement and otherness.

## License

This is an art installation project for educational and cultural purposes.

## Credits

- **Initiative**: SESLA (Secção de Escrita e Leitura)
- **Organization**: Associação Académica de Coimbra (AAC)
- **Design**: Custom orange-themed art installation aesthetic
- **Development**: Clean, accessible, modern web technologies

---

**Todos podem participar e são bem-vindos, independentemente de idade, idioma ou nacionalidade.**

_Everyone can participate and is welcome, regardless of age, language, or nationality._
