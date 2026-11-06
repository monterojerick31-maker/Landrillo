# Ladrillo Beans — Website Source

A responsive, editorial-style business website built around the real food photographs supplied in `beanslandrillo.zip`.

## What is included

- Responsive homepage with mobile navigation
- Menu catalogue with category filters and live search
- Enquiry list: customers select items, copy an enquiry message, then continue to the business Facebook page
- Catering / promotional feature, brand story, social and contact sections
- Content stored in JSON (`public/data/site.json`, `public/data/menu.json` and `public/data/reviews.json`)\n- Verified customer reviews stay hidden until actual review text is entered through the CMS
- Decap CMS admin interface scaffold at `/admin/` for editing site text, menu items and uploaded images
- Original photo crops taken from the uploaded business screenshots
- No made-up prices, reviews, address, phone number, email or opening hours

## Important notes about the business details

The uploaded screenshots identify the page as **Ladrillo Beans** and show party trays, catering food, laksa, ramen, breakfast selections, cakes, coffee and sides. The Facebook page could not be read automatically during creation, so details not visible in the supplied screenshots have deliberately been left blank. Confirm the exact product names, current prices, address, contact details, opening hours, delivery coverage and order policies before publishing.

The website uses a temporary text-based LB mark. Replace it with the original logo when supplied.

## Preview locally

This is a static website; it does not require React, a database or a build step.

1. Extract the ZIP.
2. Open a terminal in the extracted folder.
3. Run `python -m http.server 8080` (Python installed) or use any static web server.
4. Visit `http://localhost:8080`.

Do not open `index.html` directly as a `file://` URL; the menu and site content are loaded from JSON using `fetch`.

## Publish the website

### Simple static hosting (recommended for first launch)

1. Create a GitHub repository and upload the contents of this folder.
2. Create a Netlify account and import that GitHub repository.
3. Set the publish directory to `.` and leave the build command empty.
4. Deploy. Connect a custom domain in Netlify if you have one.
5. Test the site on Android and desktop using the deployed HTTPS URL.

The `netlify.toml` file includes basic static hosting settings. The public website works without CMS credentials.

## Set up the content manager

The admin interface is Decap CMS. It is a real Git-backed editor, not a pretend dashboard, but it needs a GitHub OAuth provider before owner login can work.

1. In `admin/config.yml`, replace `YOUR_GITHUB_USERNAME/YOUR_REPOSITORY` with the GitHub repository that contains this website.
2. Configure a GitHub OAuth App for that repository and deploy a compatible Decap CMS OAuth provider (for example, a small OAuth proxy service on a separate HTTPS endpoint).
3. Replace `YOUR-OAUTH-HOST.example.com` with the OAuth provider's host and set `auth_endpoint` to the provider's actual endpoint if different.
4. Replace `YOUR-PUBLISHED-DOMAIN.example.com` with the live website URL.
5. Give the business owner appropriate write access to the repository.
6. Visit `https://YOUR-PUBLISHED-DOMAIN.example.com/admin/` and sign in.

Do not publish GitHub client secrets in this repository or in frontend JavaScript. The OAuth provider must keep its client secret server-side. If you do not want to maintain OAuth infrastructure, use the JSON-editing workflow below instead.

### Edit content without the CMS

- Homepage and business details: edit `public/data/site.json`.
- Menu items: edit the `menu` array in `public/data/menu.json`.
- Photos: place image files in `public/images/`, then set the corresponding JSON image field to `/images/your-file.jpg`.
- Commit and push changes to GitHub; the static host will redeploy.

## Updating photos

Use clear, high-resolution original images (ideally landscape or portrait images with the food filling the frame). Upload the image to `public/images/`, then update the image path in the relevant JSON field or through the CMS media picker. Avoid uploading screenshots of Facebook posts; upload the original photo where possible.

## Orders and payments

This first release intentionally uses Facebook messaging for ordering because the supplied material does not establish a verified checkout, delivery, payment or stock workflow. The enquiry list copies selected items and opens the supplied Facebook page. It does **not** charge customers, reserve stock or create an order in a back-office system.

Before adding online payments, confirm the legal business details, payment provider, fulfilment process, shipping rates, cancellation/refund terms and privacy requirements. A Shopify / WooCommerce storefront or a custom backend can be added once those requirements are known.

## Reviews, privacy and legal pages

No customer review data was supplied, so the website does not display invented testimonials or ratings. Add a testimonials section only after real reviews are provided. Add privacy and terms pages after confirming the business's data collection and sales policies.
