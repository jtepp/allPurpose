Support page for App Store Connect `Support URL` usage.

Files:

- index.html — entry (React via CDN)
- app.jsx — small React app for support
- styles.css — page styles
- logo.svg — simple SVG logo

Deployment:

- Copy the `app-store-support` folder to your web host (e.g., `https://yourdomain.com/support/`).
- In App Store Connect, set the Support URL to the published URL, e.g. `https://yourdomain.com/support/`.

Notes:

- Update `mailto:support@yourdomain.com` in `app.jsx` to your real support address.
- Add `privacy.html` and `terms.html` in your site root if required by App Store Connect.
