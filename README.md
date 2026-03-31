# E-Commerce Frontend Assessment

A modern e-commerce landing page built with Next.js 15+ (App Router) and Server Actions.

## 🚀 Tech Stack

- **Next.js 16** (App Router)
- **React 19** with Server Components
- **Server Actions** for all API calls
- **TypeScript**
- **Tailwind CSS v4**

## 📦 Project Structure

```
frontend-assessment/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (Century Gothic font)
│   ├── page.tsx                  # Home page (composes all sections)
│   ├── error.tsx                 # Route-level error boundary
│   ├── global-error.tsx          # Global error boundary
│   ├── not-found.tsx             # 404 page
│   └── globals.css               # Global styles
├── features/                     # Feature-based modules
│   ├── products/
│   │   ├── actions/products.ts   # Server Actions for product API calls
│   │   ├── components/           # BestDeals, NewArrivals
│   │   └── types/products.ts     # Product, Rating types
│   └── categories/
│       ├── actions/categories.ts # Server Action for categories API
│       ├── components/           # CategoriesSection, CategoryNav
│       └── types/categories.ts   # Category type
├── components/                   # Shared UI components
│   ├── shared/                   # Navbar, Footer, Toolbar, ErrorAlert, LoadingSkeleton
│   ├── home/                     # HeroSection
│   └── product/                  # ProductCard
├── lib/                          # Utilities
│   ├── error-handler.ts          # Centralized error handling with logging
│   └── constants.ts              # API config, error config
├── types/                        # Global type definitions
│   └── error.ts                  # AppError, ErrorCode, ErrorSeverity
├── constants/                    # App-wide constants
│   └── global-constants.ts       # Menu items, footer sections
└── public/                       # Static assets (images, icons, fonts)
```

## 🏗️ Architecture

### Server Components vs Client Components

**Server Components (Default):**

- `page.tsx`, `Navbar`, `Toolbar`, `HeroSection`, `Footer`, `NewArrivals` — all render on the server
- No `"use client"` directive needed
- Better performance, smaller client bundle

**Client Components (Only when needed):**

- `BestDeals` — interactive category filtering with `useState`/`useEffect`
- `CategoryNav` — click handler for tab selection
- `SearchBar` — dropdown state
- `CategoriesSection` — Swiper carousel interactivity
- `ProductCard` — image error handling state
- `ErrorAlert` — dismiss/retry handlers

### Server Actions Pattern

All API calls are centralized in feature-specific `actions/` files with `"use server"` directive:

```typescript
// ✅ Correct: Server Action with "use server" directive
// features/products/actions/products.ts
"use server";
export async function getAllProducts() { ... }

// ✅ Correct: Called from Client Component via server action
const products = await getProductsByCategory(categoryName);

// ❌ Wrong: Direct fetch in Client Component
const response = await fetch("/api/products");
```

### Error Handling Architecture

The app uses a layered error handling system:

1. **Server Actions** — throw errors on API failures (no silent swallowing)
2. **Client Components** — catch errors via `handleError()` from `lib/error-handler.ts`, display `ErrorAlert` with retry
3. **Server Components** — use try/catch for data fetching, render inline error UI
4. **Error Boundaries** — `error.tsx` (route-level) and `global-error.tsx` (app-level) catch unhandled errors
5. **Loading States** — `LoadingSkeleton` components and React `Suspense` boundaries

## 🏃 How to Run

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application locally.

## 🌐 Live Demo

[https://frontend-developer-assignment-betaf.vercel.app/](https://frontend-developer-assignment-betaf.vercel.app/)

## 🌐 API Endpoints Used

| Endpoint             | URL                                                                              |
| -------------------- | -------------------------------------------------------------------------------- |
| All Products         | `https://mm-assesment-server.vercel.app/api/v1/products`                         |
| Categories           | `https://mm-assesment-server.vercel.app/api/v1/products/categories`              |
| Products by Category | `https://mm-assesment-server.vercel.app/api/v1/products/category/{categoryName}` |
| Single Product       | `https://mm-assesment-server.vercel.app/api/v1/products/{id}`                    |

## 📐 Features Implemented

- ✅ Responsive landing page matching Figma design
- ✅ Hero section with CTA
- ✅ Category showcase carousel (Swiper)
- ✅ New arrivals product grid with loading skeletons
- ✅ Best deals with category filtering, loading & error states
- ✅ Product cards with images, pricing, and ratings
- ✅ Server Actions for all API interactions (`"use server"`)
- ✅ Image optimization with Next.js Image
- ✅ TypeScript for type safety
- ✅ Comprehensive error handling (ErrorAlert, error boundaries, Suspense)
- ✅ Next.js built-in caching with `revalidate`

## 🎨 Design Decisions

- **Color Scheme:** Teal/cyan primary (#0AAEB9, #12b1c1) for branding
- **Typography:** Century Gothic custom font loaded via `next/font/local`
- **Spacing:** Consistent spacing using Tailwind utilities
- **Responsiveness:** Mobile-first approach with breakpoints
- **Component Strategy:** Server Components by default, Client Components only for interactivity

## 🔧 Assumptions & Notes

1. **State Management:** No external state library needed — React built-in state is sufficient for this scope
2. **Caching:** Server Actions use Next.js built-in caching (`revalidate: 3600s` for products, `1800s` for category-specific)
3. **Error Handling:** Layered approach — server actions throw, components catch and show UI feedback
4. **Loading States:** Skeleton loaders via `LoadingSkeleton` component and React `Suspense`
5. **Font:** Century Gothic loaded as local font files

## 📄 License

This project is part of a job assessment and is not licensed for commercial use.
