# Pham Le Nam Giang — Personal Portfolio

A responsive, single-page portfolio built with plain HTML, CSS, and JavaScript. No build step or backend is required.

## Run locally

1. Download and extract this folder.
2. Open `index.html` in a browser, or use a local static server (recommended for consistent file loading).
   - VS Code: use the Live Server extension.
   - Python: run `python -m http.server 8000` from this directory, then visit `http://localhost:8000`.

## Add your photos

Place your own image files in `public/images/` using these exact filenames:

- `profile.jpg`
- `fpt-event-01.jpg`
- `fpt-event-02.jpg`
- `quest-event-01.jpg`
- `quest-poster-01.jpg`
- `volunteer-media-01.jpg`
- `blood-donation-01.jpg`

The site checks whether each image exists. If it does, it appears with `object-fit: cover`; if it does not, the designed “Photo Coming Soon” placeholder remains. You can add more images by adding filenames to the relevant project's `images` array in `script.js`.

## Add your CV

Place your PDF at `public/cv/cv.pdf`. The Download CV buttons point to that path. If your CV has a different filename, update the `href` on both buttons in `index.html`.

## Deploy

### Netlify
Drag the extracted project folder into Netlify's manual deploy area, or connect the repository.

### Vercel
Import the repository and use the default static deployment settings. No build command is needed; the output directory is the project root.

### GitHub Pages
Push the files to a repository, then enable Pages for the branch and root directory.

## Customize

- Content and structure: `index.html`
- Colors, spacing, and responsive layout: `style.css` (`:root` variables near the top)
- Navigation, image loading, project details, and interactions: `script.js`

## Notes

- The website intentionally includes no stock, generated, or downloaded photos.
- Google Fonts is used for Inter; system fallbacks are included.
- The CV PDF is not included because no CV file was provided with this request. Add it at `public/cv/cv.pdf` before publishing.
