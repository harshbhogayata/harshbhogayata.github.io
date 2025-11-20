# Codebase Audit & TODO List

This document outlines the findings from a comprehensive audit of the "Cyber Dashboard" portfolio codebase. It serves as a roadmap for future fixes, refactoring, and enhancements.

## 🚨 Critical Fixes & Consistency

- [ ] **Navigation Path Logic (`js/main.js`)**:
    - The current `loadNavigation()` function relies on simple string matching (`/pages/`, `/tools/`) to determine the root path (`./`, `../`, `../../`).
    - **Risk**: This is fragile. If the site is hosted in a subdirectory (e.g., `github.io/portfolio/`), the path calculation might fail.
    - **Fix**: Implement a more robust base URL detection or use absolute paths if the domain is fixed.

- [ ] **Homepage Header Redundancy (`index.html`)**:
    - `index.html` has a "Top Bar" (System Online / Clock) inside the dashboard hero.
    - `main.js` *also* injects a fixed top navigation bar.
    - **Action**: Verify if both are desired. The fixed nav is good for navigation, but the "System Online" bar might feel redundant or should be integrated into the dashboard design more seamlessly.

- [ ] **Duplicate Clock Logic**:
    - `index.html` has an inline script for the clock.
    - `js/main.js` also has `initClock()` logic.
    - **Fix**: Remove the inline script from `index.html` and rely on `main.js` to handle the clock site-wide (ensure `initClock` targets the correct element ID).

- [ ] **"View Source" Links**:
    - In `pages/projects.html`, the "View Source" buttons currently point to the generic GitHub profile (`github.com/harshbhogayata`).
    - **Action**: If specific repositories exist for these tools, update the links. If not, consider changing the text to "View Profile" or creating Gists/Repos for them.

## 🧹 Code Quality & Refactoring

- [ ] **Externalize Inline Scripts**:
    - `index.html`: Typewriter effect and Clock.
    - `pages/tools/*.html`: Each tool has logic in a `<script>` tag at the bottom.
    - **Action**: Move tool-specific logic into separate files (e.g., `js/tools/password-checker.js`) or a unified `tools.js` to keep HTML clean and separate concerns.

- [ ] **CSS Organization**:
    - `css/style.css` is relatively small but contains everything.
    - **Action**: As the site grows, consider splitting into `components.css` (cards, buttons) and `layout.css`. (Low priority for now).

- [ ] **Hardcoded Content in JS**:
    - `loadNavigation` and `loadFooter` contain large HTML strings.
    - **Action**: This is fine for a static site without a framework, but ensure any changes to nav structure are updated here.

## 🎨 UI/UX Improvements

- [ ] **Resume Print Styling (`pages/resume.html`)**:
    - The "PDF" button calls `window.print()`.
    - **Action**: Ensure `@media print` styles are perfect. Hide the "PDF" button and the main navigation/footer during printing. (Currently `print:shadow-none` is used, but check nav/footer visibility).

- [ ] **404 Page Navigation**:
    - `404.html` is in the root.
    - **Action**: Ensure the "Return_Home()" button works correctly regardless of which subdirectory the user was in when they hit the 404 (though `../index.html` suggests it expects to be one level deep? Wait, `404.html` is in root, so link should be `index.html`, not `../index.html`. **Check this**).
    - *Audit Finding*: `404.html` has `<a href="../index.html">`. If `404.html` is served at the root, this link is broken. It should be `index.html`.

- [ ] **Mobile Menu Accessibility**:
    - **Action**: Add `aria-label="Toggle Menu"` to the mobile menu button in `main.js` for better accessibility.

- [ ] **Favicon**:
    - **Action**: No favicon is currently linked in `<head>`. Add a standard favicon.

## 🚀 Future Features

- [ ] **Blog Pagination/Filtering**:
    - `pages/blog/index.html` lists all posts.
    - **Future**: Add tag filtering (e.g., `#network-security`) as the blog grows.

- [ ] **Terminal Enhancements (`js/terminal.js`)**:
    - Currently has basic commands (`help`, `about`, etc.).
    - **Idea**: Add a `matrix` command for a falling code effect, or `scan` to simulate a port scan output.

- [ ] **Tool Expansion**:
    - **Idea**: Add a "Whois Lookup" tool (requires API) or a "Local Storage Viewer" for debugging.

## 🔍 SEO & Meta

- [ ] **Sitemap & Robots**:
    - `sitemap.xml` uses `https://harshbhogayata.com/`.
    - **Action**: Confirm this is the final production domain.

- [ ] **Meta Descriptions**:
    - Ensure every page has a unique, descriptive `meta description` tag.
