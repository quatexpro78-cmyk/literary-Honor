# Literary Honors

Static marketing site for the Literary Honors Book Awards, deployed with
GitHub Pages from `main`.

Live: https://quatexpro78-cmyk.github.io/literary-Honor/

## Structure

```
index.html              Homepage (must stay at the root for GitHub Pages)
pages/                  Every other page
  about.html
  awards.html
  categories.html
  judging.html
  literary-archive.html
  submit.html
  winners.html
assets/
  css/                  One stylesheet per page, plus the shared style.css
  js/                   Page scripts and their *-data.js content files
  images/               All artwork
```

## How paths work

`index.html` sits at the site root while the other pages sit one level
down, so scripts cannot hard-code a path and have it resolve correctly on
both. Pages under `pages/` declare their depth on the root element:

```html
<html lang="en" data-base="../">
```

`assets/js/site-paths.js` reads that and exposes `sitePath()`, which any
script uses when it builds a URL:

```js
image.src = sitePath("assets/images/h-a-1.png");
```

Paths written directly in HTML and CSS are ordinary relative paths and need
no helper — CSS `url()` resolves against the stylesheet, not the page.

## Content

Page copy that is rendered by JavaScript lives in the `*-data.js` files
(`categories-data.js`, `awards-data.js`, `winners-data.js`, `about-data.js`),
so wording and listings can be edited without touching the render code.

## Local preview

Open `index.html` directly in a browser, or serve the folder:

```
python -m http.server 8000
```
