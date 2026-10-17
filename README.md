# aisafesafe.me — GitHub Pages ready

Full static website source: index.html, styles.css, app.js and assets/.
No npm, Node server, build command or API credentials are needed for hosting.

## Upload and publish

1. Extract the ZIP. Upload its CONTENTS to a public GitHub repository, for example aisafesafe.
2. index.html must be directly at the repository root, alongside app.js, styles.css, assets/ and .nojekyll. Do not upload the ZIP itself or place everything inside an extra parent folder.
3. Commit the uploaded files to main.
4. Open repository Settings > Pages.
5. Source: Deploy from a branch. Branch: main. Folder: /(root). Save.
6. Wait for deployment to complete and use the Visit site link shown in Pages settings.

A project repository normally uses https://YOUR-USERNAME.github.io/REPOSITORY-NAME/.
All website asset paths are relative and support this subdirectory layout.

Official instructions:
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Your domain

Publish successfully on github.io first. Then configure aisafesafe.me using GitHub Pages Custom domain settings and GitHub's current DNS instructions. This ZIP intentionally has no CNAME file, so an unconfigured custom domain will not redirect visitors away from the working github.io address.

The A/TXT records previously supplied for ChatGPT Sites are NOT the GitHub Pages setup. Do not use those hosting A records for this deployment. Preserve your email records.

Once your final domain is active, you may add an og:url meta tag in index.html pointing to the final HTTPS URL.

## Contact form

The form prepares an email draft addressed to contact@aisafesafe.me. It does not send emails from a backend or store submissions. Configure the email address separately.

## Editing

- index.html: page content, services and company details
- styles.css: colors, spacing, typography and responsive layouts
- app.js: navigation, research dialogs, filtering, email draft and pixel graphics
- assets/: local fonts, their licenses and SVG mark

Original private documents, account credentials, Git history and hosting-specific configuration are excluded.
