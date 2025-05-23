# William Blake Bibliography Web App

## Features
- Responsive, collapsible sidebar navigation (fully expanded, mobile-friendly)
- All bibliography content auto-parsed and mapped from your original files
- Searchable navigation (instant filter)
- Academic look (fonts, colors, whitespace)

## How to Run

1. **Extract the ZIP**
2. Open terminal in the extracted folder.
3. Run:
   ```sh
   npm install
   npm run dev
   # or
   yarn install
   yarn dev
   ```
   (uses Vite, super fast dev server)
4. Open `http://localhost:5173/` (or as instructed)

## File Structure
- `src/BlakeBibliographyApp.jsx`  (Main React component)
- `src/navData.js`                (Full navigation tree, auto-parsed)
- `src/contentMap.js`             (Maps nav titles to HTML, auto-parsed)
- `src/App.jsx`                   (Wires the app)

## How it Works
- Sidebar navigation is built from `navData.js`.
- When you select or search a section, the content area loads the corresponding HTML from `contentMap.js`.
- Fully responsive (works great on phones/tablets).

---

## Built with React + Tailwind + Vite

Questions or need to re-parse for new content? Just drop your updated files here!
