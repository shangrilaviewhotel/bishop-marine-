# Bishop Marine Academy

Dynamic website foundation for Bishop Marine Academy, Port Harcourt, Rivers State, Nigeria.

## Architecture
The project now supports two modes:

1. **Dynamic application mode** — `server.js` serves the website and exposes an API for site settings, courses, FAQs and enquiries. An admin dashboard is available at `/admin.html`.
2. **Static fallback mode** — the existing HTML/CSS/JS pages still render from `assets/data.js` if the API is unavailable. This keeps the front end resilient while the backend is being deployed.

GitHub Pages itself is a static hosting service, so the Node backend must be deployed to a server-capable host for the dynamic mode to run in production. GitHub Pages cannot run server-side Node/Python/PHP code. See GitHub's documentation: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site.

## Backend
- `server.js` — Node HTTP server and REST API.
- `GET /api/health` — health check.
- `GET /api/site` — academy settings.
- `GET /api/courses` — live course catalogue.
- `GET /api/faqs` — live FAQ data.
- `POST /api/enquiries` — stores applicant enquiries.
- `POST /api/admin/login` — admin authentication using `ADMIN_KEY`.
- `POST /api/admin/courses` — create/update a course.
- `DELETE /api/admin/courses/:slug` — remove a course.
- `GET /api/admin/enquiries` — view submitted enquiries.
- `PUT /api/admin/site` — update academy settings.

## Admin
Open `/admin.html` after the backend is deployed. Set a strong `ADMIN_KEY` environment variable first. The browser keeps the temporary admin token in session storage.

## Data
The backend uses `assets/data.js` as the initial seed. Runtime edits are stored in `data/runtime.json` and enquiries in `data/enquiries.json`. Those runtime files are intentionally ignored by Git because a production deployment should eventually use a real database such as Firestore, Supabase or PostgreSQL for durable multi-instance storage.

## Frontend
- `assets/data.js` — seed data and static fallback.
- `assets/app.js` — shared navigation, catalogue, course details and API synchronization.
- `assets/styles.css` — responsive presentation.
- `assets/admin.js` — admin dashboard client.

## Next production step
Deploy this repository to a Node-capable host and set `ADMIN_KEY`. Then connect a persistent database before accepting important applicant records. Firebase Authentication and Cloud Firestore are suitable options; Firestore should be protected with Authentication and Security Rules.
