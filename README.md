# Literary Honors

Marketing site for the Literary Honors Book Awards. The site currently has
static public pages, with a Core PHP + MySQL submission backend being added
for Namecheap Stellar hosting.

Live: https://quatexpro78-cmyk.github.io/literary-Honor/

## PHP backend setup (Namecheap Stellar)

The production site uses Core PHP 8.1+ and MySQL; it does not require Node,
Composer, SSH, or cPanel Terminal access.

1. In cPanel, create a MySQL database and database user, then assign the user
   full privileges to that database.
2. In phpMyAdmin, import `database/schema.sql`. If your cPanel database name
   has a prefix, replace `literary_honors` in the first two SQL statements with
   that exact database name before importing.
3. Copy `.env.example` to `.env`, enter the cPanel database credentials and
   Todd's notification email, then upload `.env` through File Manager. Never
   commit this file to Git.
4. Keep the project files in `public_html`. The included `.htaccess` blocks
   direct web access to `.env` and enables basic security headers.

The submission form creates a payment-pending record and sends the author to
Stripe Checkout. Add Stripe **test** keys to `.env` before testing it. In the
Stripe dashboard, add `https://literaryhonor.com/api/stripe-webhook.php` as a
`checkout.session.completed` webhook endpoint, then save the test signing
secret as `STRIPE_WEBHOOK_SECRET`. The webhook—not the browser redirect—is
what marks a paid entry as submitted for review.

For safe sandbox testing set `MAIL_PROVIDER=log`: no external email is sent,
but each message is recorded in PHP's error log and the `email_logs` table.
For production, create a Resend account, verify `literaryhonor.com`, then set
`MAIL_PROVIDER=resend`, `RESEND_API_KEY`, `MAIL_FROM_EMAIL`, and
`TODD_NOTIFICATION_EMAIL` in `.env`.

## First admin account

After importing the schema and uploading `.env`, browse to `/admin/setup.php`.
Enter the one-time `ADMIN_SETUP_KEY` stored in `.env` and set Todd's account
password. The setup page automatically becomes unavailable once an admin
exists; Todd then signs in at `/admin/login.php`.

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
