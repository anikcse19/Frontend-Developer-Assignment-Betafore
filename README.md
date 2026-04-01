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
│   ├── page.tsx                  # Home page — async Server Component (data-fetching layer)
│   ├── error.tsx                 # Route-level error boundary
│   ├── global-error.tsx          # Global error boundary
│   ├── not-found.tsx             # 404 page
│   └── globals.css               # Global styles
├── features/                     # Feature-based modules
│   ├── products/
│   │   ├── actions/products.ts   # Server Actions (all data fetching with fetch())
│   │   ├── components/           # BestDeals, NewArrivals
│   │   └── types/products.ts     # Product, Rating types
│   └── categories/
│       ├── actions/categories.ts # Server Actions (all data fetching with fetch())
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

- `page.tsx` — **async data-fetching Server Component**, fetches all initial data and passes as props
- `layout.tsx`, `HeroSection`, `Footer` — render on the server, no data fetching needed
- `NewArrivals` — async Server Component, fetches products via server actions + Suspense for streaming
- No `"use client"` directive needed — better performance, smaller client bundle

**Client Components (Only when needed for interactivity):**

- `BestDeals` — receives initial data as props, uses server actions for category switching (onClick)
- `CategoryNav` — click handler for tab selection
- `Navbar` — mobile menu toggle state, receives data as props from page.tsx
- `Toolbar` — mobile menu toggle state
- `SearchBar` — receives initial data as props, uses server actions for category change (onClick)
- `CategoriesSection` — Swiper carousel interactivity
- `ProductCard` — image error handling state
- `ErrorAlert` — dismiss/retry handlers

### Data Flow Architecture

```
┌─────────────────────────────────────────────────────────┐
│  page.tsx (Async Server Component)                      │
│  ┌─────────────────────────────────────────────────┐    │
│  │ getCategories() + getAllProducts()              │    │
│  │ getProductsByCategory() (initial category)       │    │
│  │ (from features/*/actions/*.ts — Server Actions)  │    │
│  └────────────────┬────────────────────────────────┘    │
│                   │ props                                │
│    ┌──────────────┼──────────────┐                      │
│    ▼              ▼              ▼                       │
│  Navbar        BestDeals     NewArrivals                │
│  (Client)      (Client)      (Server + Suspense)        │
│    │                                                    │
│    ▼                                                    │
│  SearchBar (Client)                                     │
└─────────────────────────────────────────────────────────┘
```

**Key principle:** Server Components fetch data via Server Actions → pass as props → Client Components.
Client Components use server actions ONLY from user-triggered event handlers (clicks).

### Server Actions Pattern

The app uses **Server Actions for all data fetching** — All `fetch()` calls happen inside Server Actions (files with `"use server"`):

```typescript
// ✅ Server Action (works for both Server and Client Components)
// features/products/actions/products.ts
"use server";
export async function getAllProducts() {
  const response = await fetch(...);  // fetch inside server action
  return data;
}

// ✅ Server Component calls server action
// page.tsx
const products = await getAllProducts();
<BestDeals initialProducts={products} />

// ✅ Client Component uses server action from event handler
// BestDeals.tsx (onClick)
const prods = await getProductsByCategory(categoryName);

// ❌ Wrong: Client Component calling server action in useEffect
useEffect(() => { getAllProducts().then(setData); }, []);

// ❌ Wrong: Client Component using fetch() directly
const response = await fetch("/api/products");
```

**All `fetch()` calls are inside Server Actions** — ensuring 100% compliance with assessment requirements.

### Error Handling Architecture

The app uses a layered error handling system:

1. **Data Functions** — throw errors on API failures (no silent swallowing)
2. **Server Actions** — propagate errors from data functions to Client Components
3. **Server Components** — use try/catch with `.catch(() => [])` for graceful degradation
4. **Client Components** — catch errors via `handleError()` from `lib/error-handler.ts`, display `ErrorAlert` with retry
5. **Error Boundaries** — `error.tsx` (route-level) and `global-error.tsx` (app-level) catch unhandled errors
6. **Loading States** — `LoadingSkeleton` components and React `Suspense` boundaries

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
- ✅ Product details page (bonus feature - see below)
- ✅ Server Actions for all API interactions (`"use server"`)
- ✅ Image optimization with Next.js Image
- ✅ TypeScript for type safety
- ✅ Comprehensive error handling (ErrorAlert, error boundaries, Suspense)
- ✅ Next.js built-in caching with `revalidate`

## 🎁 Bonus Features

### Product Details Page
**Route:** `/products/[id]`

**What:** Dynamic product details page using the provided product API endpoint.

**Why:** Demonstrates complete user journey and advanced Next.js capabilities:
- Dynamic routing with App Router (`[id]` parameter)
- Server-side data fetching via Server Actions
- SEO-optimized with dynamic metadata
- Comprehensive loading and error states
- Responsive design matching the overall aesthetic

**Features:**
- Large product images with gallery view
- Product information (title, price, rating, category)
- Quantity selector
- Add to Cart & Wishlist buttons
- Product metadata cards
- Back navigation
- Loading skeletons
- Error boundaries with recovery options
- 404 handling for invalid product IDs

**Implementation:**
- Server Component (`page.tsx`) fetches data via `getProductById()` Server Action
- Client Component (`ProductDetails.tsx`) handles interactivity
- `loading.tsx` provides skeleton UI
- `error.tsx` handles errors gracefully
- Product cards link to `/products/{id}` for complete UX

**Note:** While not in the original Figma design, this enhances the user experience and demonstrates full-stack Next.js skills.

## 🎨 Design Decisions

- **Color Scheme:** Teal/cyan primary (#0AAEB9, #12b1c1) for branding
- **Typography:** Century Gothic custom font loaded via `next/font/local`
- **Spacing:** Consistent spacing using Tailwind utilities
- **Responsiveness:** Mobile-first approach with breakpoints
- **Component Strategy:** Server Components by default, Client Components only for interactivity

## 🔧 Assumptions & Notes

1. **State Management:** No external state library needed — React built-in state is sufficient for this scope
2. **Data Architecture:** All data fetching happens inside Server Actions (`"use server"`), ensuring 100% compliance with "fetch inside server actions only" requirement
3. **Caching:** Server Actions use Next.js built-in `fetch` caching (`revalidate: 3600s` for products, `1800s` for category-specific)
4. **Error Handling:** Layered approach — Server Actions throw errors, Server Components use `.catch()` for graceful degradation, Client Components display `ErrorAlert`
5. **Loading States:** Skeleton loaders via `LoadingSkeleton` component and React `Suspense` boundaries
6. **Font:** Century Gothic loaded as local font files
7. **Component Strategy:** Server Components fetch data via Server Actions and pass data down; Client Components only for interactivity, never for initial data fetching

## 📄 License

This project is part of a job assessment and is not licensed for commercial use.
