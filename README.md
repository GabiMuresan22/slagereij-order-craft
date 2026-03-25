# Slagerij John – Online Slagerij & Traiteur

A modern, bilingual (Dutch & Romanian) web application for **Slagerij John**, an artisan butcher shop located in Zwevezele, Belgium. The site lets customers browse the product catalogue, place Click & Collect orders, and request traiteur/catering services entirely online.

**Live website:** [https://slagerij-john.be](https://slagerij-john.be)

---

## About the Website

Slagerij John is a family butcher shop run by Ion (John) and Georgiana, situated at **Bruggestraat 146A, Zwevezele** (near Wingene and Lichtervelde). The shop combines traditional Belgian butchery craftsmanship with authentic Romanian specialities such as *Mici* and homemade sausages.

The website serves customers across the Zwevezele, Wingene, and Lichtervelde region, offering:

- 🥩 **Fresh meat & charcuterie** – hand-cut, quality-controlled produce
- 🔥 **BBQ assortments** – marinated meats and BBQ platters
- 🍽️ **Traiteur & catering** – cold platters, warm buffets, and event catering
- 🌍 **Romanian specialities** – Mici, homemade sausages and more
- 🛒 **Online ordering (Click & Collect)** – order ahead and pick up in-store
- 📅 **Catering requests** – enquire about bespoke catering packages

---

## Features

| Feature | Description |
|---|---|
| **Multilingual** | Full Dutch 🇧🇪 and Romanian 🇷🇴 language support |
| **Online Ordering** | Click & Collect orders with date/time slot selection |
| **Product Catalogue** | Browsable catalogue with prices, categories and filters |
| **Traiteur & Catering** | Dedicated catering enquiry and package overview pages |
| **User Accounts** | Registration, login, and order history via Supabase Auth |
| **Admin Panel** | Back-office for managing products and orders |
| **Contact Form** | GDPR-compliant contact form with email delivery |
| **SEO Optimised** | Structured data, Open Graph, Twitter Cards, and sitemap |
| **Accessible** | WCAG-focused markup, keyboard navigation, and ARIA labels |
| **Dark Mode** | System-aware dark/light theme support |
| **Cookie Consent** | Cookie banner compliant with EU regulations |
| **PDF Menu** | Downloadable seasonal menu (Christmas folder, etc.) |

---

## Pages

| Route | Page |
|---|---|
| `/` | Home – hero, categories, testimonials |
| `/products` | Product catalogue |
| `/order` | Click & Collect order form |
| `/traiteur-catering` | Catering overview and enquiry |
| `/about` | About the team and story |
| `/contact` | Contact form and map |
| `/privacy` | Privacy policy |
| `/terms` | Terms and conditions |
| `/allergens` | Allergen information |
| `/my-account` | Customer account and order history |
| `/admin/*` | Admin back-office (protected) |

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [Vite](https://vitejs.dev/) | Build tool & development server |
| [React 18](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com/) | Accessible UI component library |
| [Supabase](https://supabase.com/) | Backend: database, auth, edge functions |
| [React Router DOM](https://reactrouter.com/) | Client-side routing |
| [TanStack Query](https://tanstack.com/query) | Server state & data fetching |
| [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) | Forms & validation |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) | Unit & component tests |
| [Playwright](https://playwright.dev/) | End-to-end tests |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher) – install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

### Installation

```sh
# 1. Clone the repository
git clone <YOUR_GIT_URL>

# 2. Navigate into the project folder
cd slagereij-order-craft

# 3. Install dependencies
npm install

# 4. Copy the environment variables template and fill in your values
cp .env.example .env

# 5. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Environment Variables

Copy `.env.example` to `.env` and provide the following values:

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous/public key |

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run unit tests in watch mode |
| `npm run test:run` | Run unit tests once |

---

## Project Structure

```
src/
├── assets/          # Images and static assets
├── components/      # Reusable UI components
│   └── ui/          # shadcn/ui base components
├── contexts/        # React context providers (auth, language, …)
├── hooks/           # Custom React hooks
├── integrations/    # Supabase client & generated types
├── lib/             # Utility functions, SEO helpers, order logic
├── pages/           # Route-level page components
│   └── admin/       # Admin back-office pages
└── main.tsx         # Application entry point
```

---

## Deployment

The project is deployed via [Lovable](https://lovable.dev/projects/a379c5f3-db20-4c15-830f-9f49f733526e). To publish a new version, open the Lovable project and click **Share → Publish**. It can also be deployed to any static hosting provider (Vercel, Netlify, etc.) by running `npm run build` and serving the `dist/` folder.

A `vercel.json` configuration file is already included for zero-config Vercel deployments.

---

## Contributing

1. Fork the repository and create a feature branch.
2. Make your changes and ensure all tests pass (`npm run test:run`).
3. Open a pull request with a clear description of the changes.
