# Rent Nest — Frontend

A full-featured property rental platform built with Next.js 16. Connects landlords, tenants, and admins through role-based dashboards, property listings, rental requests, and Stripe-powered payments.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui + Radix UI
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts
- **Image Carousel:** Embla Carousel
- **Notifications:** Sonner
- **Auth:** JWT (access + refresh tokens via httpOnly cookies)
- **Package Manager:** pnpm

---

## Features

### Public

- Browse and search properties with filters
- Property detail pages with image gallery, amenities, specs, and reviews
- Advanced property search modal

### Auth

- Register and login with JWT-based authentication
- Automatic token refresh via middleware
- Role-based redirect on login (Tenant / Landlord / Admin)

### Tenant Dashboard

- View active rentals
- Submit and track rental applications
- Make payments via Stripe (success + cancel handling)
- Leave reviews on completed rentals
- Manage profile

### Landlord Dashboard

- Create and edit property listings
- Manage incoming rental requests
- Overview analytics

### Admin Dashboard

- Platform-wide management

---

## Project Structure

```
app/
├── (authGroup)/          # Login, Register
├── (dashboardGroup)/
│   ├── admin-dashboard/
│   ├── landlord-dashboard/
│   └── tenant-dashboard/
└── (publicGroup)/        # Home, Properties, Explore

components/ui/shared/     # Navbar, Footer, Container, etc.
lib/                      # Types, utilities, fetch helpers
service/                  # getMe, logout, refreshToken
utils/                    # JWT helpers
proxy.ts                  # Middleware: auth guard + role-based routing
```

---

````

###  Configure environment


```env
BACKEND_API_URL=https://your-backend-url.com
NEXT_PUBLIC_BACKEND_API_URL=https://your-backend-url.com
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
````

## Scripts

| Command      | Description              |
| ------------ | ------------------------ |
| `pnpm dev`   | Start development server |
| `pnpm build` | Production build         |
| `pnpm start` | Start production server  |
| `pnpm lint`  | Run ESLint               |

---

## Environment Variables

| Variable                      | Description                         |
| ----------------------------- | ----------------------------------- |
| `BACKEND_API_URL`             | Backend base URL (server-side)      |
| `NEXT_PUBLIC_BACKEND_API_URL` | Backend base URL (client-side)      |
| `JWT_ACCESS_SECRET`           | Secret for verifying access tokens  |
| `JWT_REFRESH_SECRET`          | Secret for verifying refresh tokens |

---
