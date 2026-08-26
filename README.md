# Content Platform Assessment

A content platform built with Next.js App Router that fetches and displays data from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/). The focus is deliberate architecture, clear state ownership, and a commit history that shows how the application matured in stages.

## Tech Stack

| Layer        | Choice                               | Why                                                                                                          |
| ------------ | ------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| Framework    | Next.js 16 (App Router)              | Server Components, nested layouts, route-level loading/error boundaries, and `proxy.ts` for route protection |
| Language     | TypeScript                           | Typed API contracts, auth session models, and safer refactors                                                |
| Styling      | Tailwind CSS 4                       | Utility-first styling with a small set of shared UI components                                               |
| Server state | TanStack Query v5                    | Remote data caching, query key factories, and server prefetch + client hydration                             |
| Client state | Zustand                              | Authentication UI state without Context API                                                                  |
| HTTP         | Axios                                | Shared transport layer with normalized errors                                                                |
| Quality      | ESLint, Prettier, Husky, lint-staged | Enforced formatting and linting on every commit                                                              |

## Getting Started

### Prerequisites

- Node.js 18+ (20+ recommended)
- npm

### Installation

```bash
git clone <your-repo-url>
cd Content-Platform-Assessment
npm install
```

### Environment

Copy the example environment file and adjust values if needed:

```bash
cp .env.example .env.local
```

| Variable                   | Required        | Description                                                                  |
| -------------------------- | --------------- | ---------------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | No              | JSONPlaceholder base URL. Defaults to `https://jsonplaceholder.typicode.com` |
| `AUTH_SECRET`              | Production only | HMAC secret for signed session cookies (minimum 32 characters)               |

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo Sign-In

JSONPlaceholder has no real authentication. The app validates credentials against the `/users` endpoint with a shared mock password:

- **Email:** any JSONPlaceholder user email (e.g. `Sincere@april.biz`)
- **Password:** `password`

### Quality Checks

```bash
npm run lint
npm run build
```

## Architecture Overview

The codebase follows a feature-based layout. Each domain (`posts`, `users`, `comments`, `auth`) owns its types, API functions, and query configuration. Shared infrastructure lives in `lib/` and `config/`.

```text
src/
├── app/
│   ├── (auth)/login/           Public auth routes
│   ├── (protected)/            Auth-guarded routes
│   │   ├── dashboard/
│   │   └── posts/              List + dynamic detail routes
│   ├── layout.tsx              Root layout + QueryClientProvider
│   └── providers.tsx
├── components/
│   ├── layout/                 App shell and header
│   └── ui/                     Button, card, skeleton
├── config/
│   └── env.ts                  Environment helpers
├── features/
│   ├── auth/                   Zustand store, session, server actions
│   ├── posts/                  Posts API, queries, UI, server prefetch
│   ├── users/                  Users API and queries
│   └── comments/               Comments API and queries
├── lib/
│   ├── axios.ts                HTTP client
│   ├── api-error.ts            Normalized error handling
│   └── query-client.ts         TanStack Query factory
└── proxy.ts                    Route protection and redirects
```

### State Ownership

```text
Remote data     → TanStack Query (posts, users, comments)
Client auth UI  → Zustand (mirrors session for header and forms)
Session truth   → Signed httpOnly cookie
Route guard     → proxy.ts + protected layout session check
URL filters     → (planned) search params, not global client state
```

### Request Flow — Posts List

1. Server prefetches posts via TanStack Query (`prefetchPostsList`)
2. Cache is dehydrated and sent to the client inside `HydrationBoundary`
3. Client `usePosts()` reads hydrated data and owns refetch/caching afterward

### Request Flow — Post Detail

1. Server validates the route param and calls `getPostDetail(postId)`
2. Post, author, and comments are fetched concurrently with `Promise.all`
3. A 404 from JSONPlaceholder triggers the route `not-found.tsx` boundary

### Request Flow — Authentication

1. Login form submits to a Server Action
2. Credentials are validated against JSONPlaceholder users
3. A signed session cookie is set; Zustand is hydrated on protected routes
4. `proxy.ts` redirects unauthenticated users to `/login` and authenticated users away from `/login`

## Key Implementation Details

### API Layer

- `src/lib/axios.ts` — single Axios instance with env-driven base URL and a response interceptor
- `src/lib/api-error.ts` — converts Axios failures into a typed `ApiError` with user-safe messages
- Feature APIs (`features/*/api.ts`) — thin functions over JSONPlaceholder endpoints

### TanStack Query

- Query key factories per feature (`postKeys`, `userKeys`, `commentKeys`)
- `queryOptions` helpers for reuse in server prefetch and client hooks
- Posts list uses server prefetch + client hydration; detail pages use server-side concurrent fetching

### Authentication

- Mock login against JSONPlaceholder `/users`
- HMAC-signed session tokens in an httpOnly cookie
- `features/auth/dal.ts` exposes `getSession()` for server components
- Protected layout hydrates Zustand so the header reflects the signed-in user

### Routing and Protection

- `(auth)` and `(protected)` route groups separate public and private surfaces
- `proxy.ts` protects `/dashboard` and `/posts` routes
- Invalid post IDs and missing posts use `notFound()` with a dedicated `not-found.tsx`

## What's Implemented

- [x] Project scaffold with ESLint, Prettier, and Husky
- [x] Feature-based folder architecture
- [x] Axios client with typed JSONPlaceholder services
- [x] TanStack Query provider, query keys, and posts prefetch/hydration
- [x] Zustand auth store with mock login and signed cookie sessions
- [x] Route protection via `proxy.ts`
- [x] Posts list (server prefetch + client cache)
- [x] Post detail with author and comments
- [x] Route-level loading and error boundaries for posts

## Planned Next

- URL-driven post search, filtering, and pagination
- Post creation with TanStack Query mutations
- Users listing and profile pages
- Dashboard metrics composed from existing queries
- Tests, UX polish, and deployment preparation

## Submission Notes

- Add `stephenwayar` as a GitHub collaborator before submission
- Commit in small, meaningful steps — reviewers inspect commit history
- Expand this README again once mutations, users, and dashboard work land
