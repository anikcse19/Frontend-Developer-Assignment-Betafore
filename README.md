# E-Commerce Frontend Assessment

A modern e-commerce landing page built with Next.js 15 (App Router) and Server Actions.

## 🚀 Tech Stack

- **Next.js 15+** (App Router)
- **React Server Components**
- **Server Actions** for all API calls
- **TypeScript**
- **Tailwind CSS v4**

## 📦 Project Structure

```
frontend-assessment/
├── actions/              # Server Actions (API calls)
│   └── products.ts       # Product-related server actions
├── app/                  # Next.js App Router
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── shared/           # Reusable components (Navbar, Footer, etc.)
│   ├── BestDeals.tsx     # Best deals section (Server Component)
│   ├── BestDealsClient.tsx # Best deals interactivity (Client Component)
│   ├── NewArrivals.tsx   # New arrivals section (Server Component)
│   └── ProductCard.tsx   # Product card component (Client Component)
├── types/                # TypeScript type definitions
│   └── product.ts        # Product types
├── public/               # Static assets
└── next.config.ts        # Next.js configuration
```

## 🏗️ Architecture

### Server Components vs Client Components

**Server Components (Default):**
- Fetch data using Server Actions
- Render on the server for better performance
- No `"use client"` directive needed

**Client Components:**
- Interactive components (useState, useEffect, event handlers)
- Minimal usage for better performance
- Always use Server Actions for API calls

### Server Actions Pattern

All API calls are centralized in `actions/products.ts`:
```typescript
// ✅ Correct: Server Action called from Client Component
const products = await getProductsByCategory(categoryName);

// ❌ Wrong: Direct fetch in Client Component
const response = await fetch('/api/products');
```

## 🏃 How to Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🌐 API Endpoints Used

- **All Products:** `https://mm-assesment-server.vercel.app/api/v1/products`
- **Categories:** `https://mm-assesment-server.vercel.app/api/v1/products/categories`
- **Products by Category:** `https://mm-assesment-server.vercel.app/api/v1/products/category/{categoryName}`
- **Single Product:** `https://mm-assesment-server.vercel.app/api/v1/products/{id}`

## 📐 Features Implemented

- ✅ Responsive landing page matching Figma design
- ✅ Hero section with CTA
- ✅ Category showcase
- ✅ New arrivals product grid
- ✅ Best deals with category filtering
- ✅ Product cards with images, pricing, and ratings
- ✅ Server Actions for all API interactions
- ✅ Image optimization with Next.js Image
- ✅ TypeScript for type safety

## 🎨 Design Decisions

- **Color Scheme:** Teal/cyan primary (#0AAEB9, #12b1c1) for branding
- **Typography:** Clean, modern sans-serif fonts
- **Spacing:** Consistent spacing using Tailwind utilities
- **Responsiveness:** Mobile-first approach with breakpoints

## 🔧 Assumptions & Notes

1. **State Management:** No external state library needed (React built-in state sufficient)
2. **Caching:** Server Actions use Next.js built-in caching (revalidate: 3600s)
3. **Error Handling:** Basic error handling with console logs (can be enhanced)
4. **Loading States:** Can be improved with loading skeletons
5. **Category Navigation:** Arrow buttons are UI-only (functionality can be added)

## 🚀 Deployment

This project is optimized for Vercel deployment:

```bash
# Deploy to Vercel
vercel
```

## 📝 Assessment Requirements Met

- ✅ Next.js 15+ (App Router)
- ✅ Server Actions only (no client-side fetch)
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Clean, maintainable code structure
- ✅ Pixel-perfect Figma implementation
- ✅ README with architecture explanation

## 🔮 Future Enhancements

- Add search functionality
- Implement shopping cart
- Add product detail pages
- Improve error handling and loading states
- Add unit tests
- Implement pagination
- Add animation libraries for smoother transitions

## 📄 License

This project is part of a job assessment and is not licensed for commercial use.
