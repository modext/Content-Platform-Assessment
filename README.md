# Content Platform Assessment

A content platform built with the Next.js App Router. It fetches, filters, and creates
content against the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/), behind
a signed-session login.

## Setup instructions

1. Clone the repo and install dependencies:
   - `git clone <your-repo-url>`
   - `cd Content-Platform-Assessment`
   - `npm install`
2. Copy the environment file: `cp .env.example .env.local`.
   - `NEXT_PUBLIC_API_BASE_URL` is optional and defaults to `https://jsonplaceholder.typicode.com`.
   - `AUTH_SECRET` is required in production — it's the HMAC key used to sign session cookies, and must be at least 32 characters. In development it falls back to a built-in dev-only value.
3. Start the app with `npm run dev` and open `http://localhost:3000`.
4. Sign in with the demo account. JSONPlaceholder has no real authentication, so the app checks the submitted password against one shared mock value and looks up a matching user by email:
   - Email: any JSONPlaceholder user email, e.g. `Sincere@april.biz`
   - Password: `password`
5. Other useful scripts: `npm run build` (production build), `npm run start` (run that build), `npm run lint` (ESLint), and `npm run test` (Vitest).

## Technology choices and reasoning

- **Next.js 16, App Router** — chosen for Server Components, nested layouts, route-level loading and error boundaries, and its middleware convention (`proxy.ts`) for route protection close to the edge.
- **TypeScript** — typed API contracts, auth session shapes, and safer refactors across a feature-based codebase.
- **Tailwind CSS 4** — utility-first styling that keeps a small set of shared UI components consistent without a separate CSS abstraction layer.
- **TanStack Query** — owns all server state (posts, users, comments). It gives query key factories, server-side prefetch with client hydration, and a retry policy I can tune per error type, instead of hand-rolling caching and loading states.
- **Zustand, not Context** — owns the one piece of client UI state that matters here: the signed-in user, mirrored for the header and nav. Zustand's selector-based subscriptions avoid the re-render-everything problem Context has for state that changes over a session's lifetime.
- **Axios** — a single HTTP client with one response interceptor, so every request goes through the same normalized error handling instead of each call site parsing its own failures.
- **ESLint, Prettier, Husky, lint-staged** — enforced formatting and linting on every commit, so reviewers see clean diffs rather than churn from style fixes.
- **Vitest** — faster and simpler to configure than Jest for an ESM/TypeScript project, and it reuses the app's own path aliases.

## Architecture overview

The codebase follows a feature-based layout. Each domain — posts, users, comments, auth,
dashboard, albums — owns its own types, API functions, query configuration, and
components. Shared infrastructure lives in `lib/`, `config/`, and `components/`.

- `src/app/` holds the routes, split into a public `(auth)/login` group and a
  `(protected)` group for `dashboard`, `posts`, and `users`. The protected layout runs a
  server-side session check once and renders the shared app shell around every route
  inside it.
- `src/features/` has one folder per domain. A change to posts, for example, only ever
  touches `features/posts/` — its API calls, query options, hooks, and UI all live
  together instead of being spread across generic `hooks/`, `api/`, and `components/`
  folders.
- `src/lib/` holds cross-cutting infrastructure: the Axios client, the API error
  normalizer, and the TanStack Query client factory.
- `src/proxy.ts` is Next.js 16's replacement for `middleware.ts` — it redirects
  unauthenticated visitors away from protected routes and signed-in users away from
  `/login`.

State ownership is split deliberately:

- Remote data (posts, users, comments) is owned by TanStack Query.
- The signed-in user, for client UI like the header, is mirrored into a Zustand store.
- Session truth itself lives only in a signed, httpOnly cookie — Zustand is a read-through
  copy of it, not an independent source.
- Search, author filtering, and pagination on the posts list live in the URL's search
  params, not in component state, so the server can prefetch the correctly filtered data
  before the client ever mounts.

## Key implementation details

- **API layer** — `src/lib/axios.ts` is a single Axios instance with an env-driven base
  URL and a response interceptor. `src/lib/api-error.ts` converts every failure into a
  typed `ApiError` with a `kind` and a user-safe message, so nothing downstream ever
  handles a raw Axios error.
- **TanStack Query setup** — a query key factory (`lib/query-keys.ts`) generates
  consistent keys per feature; `queryOptions()` helpers are shared verbatim between
  server-side prefetch and client hooks, so hydration never mismatches; the query client
  skips retries on most 4xx errors but retries 5xx, network, and timeout failures.
- **Authentication** — login is checked against JSONPlaceholder's `/users` endpoint with a
  shared mock password. On success, a session token is HMAC-signed and stored in an
  httpOnly, `sameSite: lax` cookie with an 8-hour expiry. Verification uses a
  timing-safe comparison to avoid leaking signature information through response timing.
- **Route protection** — `proxy.ts` redirects at the edge before rendering starts, and the
  protected layout independently re-checks the session server-side, so route protection
  doesn't rely on a single layer.
- **Posts** — the list is server-prefetched and hydrated on the client; the detail page
  fetches the post, its author, and its comments concurrently once the post's `userId` is
  known; creating a post updates every open, matching list query optimistically, then
  rolls back on failure or reconciles with the real post on success.
- **Avatars** — JSONPlaceholder's own photo URLs point at a placeholder host that no
  longer serves images, so `features/albums` resolves each user's first album photo and
  maps it to a stable, working image URL instead.

## Known limitations

- Post creation is optimistic on the client, but JSONPlaceholder doesn't persist writes —
  refreshing the page will not show a post you just created.
- Pagination is done client-side, since JSONPlaceholder doesn't support server-side
  paging.
- Test coverage currently covers the auth store only; the middleware, session signing, and
  the mutation rollback path are the next things worth testing.

## Deployment

The app is a standard Next.js project and runs anywhere that supports Node.js 18+.

Before deploying, run through this checklist: `npm run lint`, then `npm test`, then
`npm run build`, and optionally `npm run start` as a local smoke test on
`http://localhost:3000`.

Two environment variables matter in production:

- `NEXT_PUBLIC_API_BASE_URL` is optional and defaults to JSONPlaceholder.
- `AUTH_SECRET` is required — at least 32 characters, used to sign session cookies. Set it
  in your host's environment settings (for example, Vercel project → Settings →
  Environment Variables). Never commit `.env.local`.
