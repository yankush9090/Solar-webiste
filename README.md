# ☀️ Solaris Energy Solutions — Turnkey Solar EPC Platform & CMS

A full-stack, enterprise-grade web application and headless CMS built for **Solaris Energy Solutions**, a premier Solar Engineering, Procurement, and Construction (EPC) provider. 

The platform features an interactive **PM Surya Ghar: Muft Bijli Yojana** solar capacity and subsidy calculator, comprehensive turnkey solution catalogs, lead generation funnels, and a full-featured back-office **Admin CMS Portal**.

---

## 📑 Table of Contents

- [Core Features](#-core-features)
  - [Public Customer Experience](#1-public-customer-experience)
  - [Admin CMS Portal](#2-admin-cms-portal)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [Running Locally](#running-locally)
- [Database Setup & Schema](#-database-setup--schema)
  - [PostgreSQL Deployment](#postgresql-deployment)
  - [Graceful Fallback Mode](#graceful-fallback-mode)
- [Admin Portal & Credentials](#-admin-portal--credentials)
- [Available Scripts](#-available-scripts)
- [Solar Calculator Formula & Logic](#-solar-calculator-formula--logic)
- [License](#-license)

---

## 🌟 Core Features

### 1. Public Customer Experience

- **⚡ PM Surya Ghar Solar Calculator (`/solar-calculator`)**:
  - Dynamically calculates recommended solar capacity (kW), monthly electricity units generated, and 25-year financial savings based on monthly electricity bills and roof area.
  - Automatically applies the 2024–2025 Central Government subsidy slabs (up to ₹78,000 for residential systems).
  - Provides estimated net system investment and calculates payback duration (ROI).
  - Integrated lead-capture form and one-click **pre-filled WhatsApp consultation generator**.
- **🏢 Turnkey Solutions Catalog (`/solutions`)**:
  - Residential Rooftop Solar, Commercial & Industrial (C&I) installations, Agricultural Solar Pumps, and Hybrid Energy Storage (BESS).
  - Deep-dive dynamic pages per solution with technical specs, benefits, and system architectures.
- **📦 Pre-Engineered Turnkey Packages (`/packages`)**:
  - 3 kW, 5 kW, 10 kW, and 25 kW+ all-inclusive packages (panels, inverters, structure, net-metering liaison, warranty).
- **🛠️ Hardware & Components Catalog (`/products`)**:
  - Tier-1 Bifacial TopCon/Mono-PERC Solar Modules, Smart Grid-Tied & Hybrid Inverters, and LiFePO4 Lithium Battery Storage.
- **🏆 Projects Portfolio (`/projects`)**:
  - Showcase of commissioned residential, commercial, and industrial solar projects with interactive filtering.
- **💰 Subsidy & Financing Guides (`/subsidy`, `/financing`)**:
  - Step-by-step application walkthrough for the PM Surya Ghar National Portal and state DISCOM net-metering.
  - Solar loan details, zero-downpayment partnerships, and EMI calculator overview.
- **📚 Educational Hub (`/blog`, `/faq`, `/about`, `/contact`)**:
  - Solar buyer guides, policy updates, interactive FAQ accordion, and multi-channel contact touchpoints.
- **🔍 Global Search & Sticky Navigation**:
  - Universal modal search (`Cmd/Ctrl + K`) to search across solutions, packages, products, and articles.
  - Floating direct WhatsApp quick-connect button.

---

### 2. Admin CMS Portal (`/admin`)

An isolated, secure management dashboard designed specifically for operations and sales teams:

- **📥 Lead & Enquiry Inbox (`/admin/enquiries`)**:
  - Real-time pipeline to track leads captured from website forms, calculator quotes, and contact pages.
  - Pipeline status management: `NEW`, `CONTACTED`, `SITE_VISIT_SCHEDULED`, `PROPOSAL_SENT`, `WON`, `LOST`.
- **⚙️ Site Configuration (`/admin/settings`)**:
  - Live updates for company name, support phone, WhatsApp hotline, address, office hours, and social media links.
- **🧮 Solar Calculator Engine Config (`/admin/calculator`)**:
  - Adjust base grid tariffs, unit generation ratios, per-kW hardware costs, and subsidy slab rates without touching code.
- **📝 Content Management**:
  - Full CRUD control over **Solutions**, **Hardware Products**, **Turnkey Packages**, **Portfolio Projects**, **Blog Posts**, **FAQs**, and **Testimonials**.
- **🖼️ Media Library (`/admin/media`)**:
  - Upload, categorize, view, and organize images and marketing assets.
- **🔒 Dedicated Admin Authentication (`/admin/login`)**:
  - Dedicated admin layout completely isolated from customer-facing marketing navigation and footers.

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) | App Router, Server Components & Server Actions |
| **UI Library** | [React 19](https://react.dev/) | Concurrent rendering, modern client & server hooks |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | End-to-end type safety across DB, services, and UI |
| **Styling** | [Tailwind CSS v3](https://tailwindcss.com/) | Modern utility-first responsive styling and typography |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, consistent SVG icon system |
| **Database** | [PostgreSQL](https://www.postgresql.org/) (`pg` pool) | Relational database storage with JSONB support |
| **Tooling** | PostCSS, Webpack | Asset pipeline and bundling |

---

## 📁 Project Structure

```text
d:/Solar/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root HTML shell
│   ├── page.tsx                      # High-converting Homepage
│   ├── globals.css                   # Tailwind base imports & custom styles
│   ├── about/                        # Company story, leadership, credentials
│   ├── admin/                        # Back-office CMS Portal
│   │   ├── layout.tsx                # Admin sidebar shell (isolated from marketing layout)
│   │   ├── page.tsx                  # Metrics overview & lead dashboard
│   │   ├── login/                    # Admin login screen
│   │   ├── enquiries/                # Lead management inbox
│   │   ├── settings/                 # Global site settings editor
│   │   ├── calculator/               # Solar calculator parameters & subsidy slabs
│   │   ├── solutions/                # Solutions manager
│   │   ├── products/                 # Hardware products manager
│   │   ├── packages/                 # Turnkey packages manager
│   │   ├── projects/                 # Portfolio projects manager
│   │   ├── blog/                     # Articles & blog manager
│   │   ├── faqs/                     # FAQ manager
│   │   ├── testimonials/             # Customer reviews manager
│   │   ├── subsidy/                  # Subsidy policy editor
│   │   └── media/                    # Media library manager
│   ├── blog/                         # Public blog articles & detail pages
│   ├── contact/                      # Contact information & lead form
│   ├── faq/                          # Frequently asked questions
│   ├── financing/                    # Solar loan options & EMI calculator
│   ├── packages/                     # Turnkey packages catalog
│   ├── products/                     # Hardware & components catalog
│   ├── projects/                     # Installed project portfolio
│   ├── solar-calculator/             # Dedicated PM Surya Ghar Calculator page
│   ├── solutions/                    # Turnkey solar solutions
│   └── subsidy/                      # Central & State subsidy guide
├── components/                       # Reusable UI Components
│   ├── calculator/                   # SolarCalculator component & result charts
│   ├── layout/                       # AppShell, Navbar, Footer
│   ├── search/                       # GlobalSearchModal (Cmd+K)
│   └── whatsapp/                     # Floating WhatsApp button
├── database/
│   └── schema.sql                    # Production PostgreSQL DDL schema & seed data
├── lib/                              # Core Business Logic & Data Layer
│   ├── calculator.ts                 # Solar calculation & subsidy algorithms
│   ├── types.ts                      # Global TypeScript definitions
│   ├── data/
│   │   └── initial-data.ts           # Built-in seed data (used as default fallback)
│   ├── db/
│   │   ├── pool.ts                   # PostgreSQL connection pool singleton
│   │   └── actions.ts                # Next.js Server Actions for database CRUD
│   └── services/
│       └── solar-service.ts          # Unified service layer for frontend components
├── .env.example                      # Template environment variables
├── .env.local                        # Active local environment variables
├── next.config.mjs                   # Next.js configuration
├── package.json                      # Project manifest & dependencies
├── tailwind.config.ts                # Tailwind design system & solar color palette
└── tsconfig.json                     # TypeScript compiler configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.18.0 or higher (v20+ recommended)
- **npm** or **pnpm** or **yarn**
- *(Optional)* **PostgreSQL** instance (e.g. Local PostgreSQL, Supabase, Neon, or Docker)

---

### Installation

1. **Clone or open the repository**:
   ```bash
   cd d:/Solar
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

---

### Environment Configuration

Create a `.env.local` file in the project root by copying `.env.example`:

```bash
cp .env.example .env.local
```

Populate the configuration values:

```env
# PostgreSQL Database Connection URL (Optional: Leave blank to use Built-in Demo Data)
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/solaris_db

# Public URL & Contact Hotlines
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=+919121086779
```

---

### Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Setup & Schema

### PostgreSQL Deployment

The application includes a battle-tested, standalone SQL schema located at [`database/schema.sql`](file:///d:/Solar/database/schema.sql).

To initialize your PostgreSQL database:

```bash
# Using psql CLI:
psql -U postgres -d solaris_db -f database/schema.sql
```

Or copy the contents of [`database/schema.sql`](file:///d:/Solar/database/schema.sql) into the SQL Editor of your cloud provider (e.g., **Supabase**, **Neon**, **Aiven**, or **AWS RDS**).

#### Included Tables:
- `admin_users` — Administrator login accounts & roles.
- `site_settings` — Singleton table storing branding, contact numbers, address, and social URLs.
- `homepage_stats` — Key metrics displayed on the home page.
- `solutions` — Solar solution types and detailed breakdowns.
- `product_categories` & `products` — Hardware inventory and specifications.
- `packages` — Turnkey solar installation packages.
- `projects` — Case studies of completed solar installations.
- `testimonials` — Verified client reviews.
- `faqs` — Categorized knowledge-base questions and answers.
- `blog_posts` — Educational solar articles and guides.
- `subsidy_schemes` — Official PM Surya Ghar subsidy details and documentation.
- `financing_options` — Bank partner loan plans, interest rates, and tenures.
- `calculator_settings` & `calculator_subsidy_slabs` — Dynamic calculation rules.
- `enquiries` — Inbound customer leads, quotes, and contact inquiries.
- `media_items` — Asset catalog for images and documents.

---

### Graceful Fallback Mode

> **Zero Setup Required for Local Testing!**
>
> If `DATABASE_URL` is omitted from `.env.local` or PostgreSQL is unreachable, the system automatically falls back to high-fidelity in-memory seed data defined in [`lib/data/initial-data.ts`](file:///d:/Solar/lib/data/initial-data.ts). 
> 
> All pages, calculators, and admin panels will render seamlessly without errors.

---

## 🔐 Admin Portal & Direct URL Access

The admin console is **strictly hidden from the public website** (no navigation or footer links). It is accessible only by directly entering the URL in the browser:
**[http://localhost:3000/admin](http://localhost:3000/admin)**

Unauthenticated visits to `/admin` or any `/admin/*` subpath are automatically protected and routed to the secure login screen.

### Default Credentials (Fallback / Seed)

| Field | Value |
| :--- | :--- |
| **Email** | `admin@solarisenergy.com` |
| **Password** | `solaradmin2025` |

*(You can update admin accounts or link your database directly via the `admin_users` table in `database/schema.sql`)*

---

## 💻 Available Scripts

In the project root, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js dev server on port `3000` with hot-reloading |
| `npm run build` | Compiles the production build |
| `npm run start` | Runs the compiled production server |
| `npm run lint` | Runs ESLint to check for code standards |

---

## 📐 Solar Calculator Formula & Logic

The PM Surya Ghar calculation logic implemented in [`lib/calculator.ts`](file:///d:/Solar/lib/calculator.ts) computes estimates based on Indian grid benchmarks:

1. **Monthly Units Consumed**:
   $$\text{Monthly Units} = \frac{\text{Monthly Bill}}{\text{Electricity Tariff (₹/unit)}}$$
2. **Recommended Capacity (kW)**:
   $$\text{Capacity (kW)} = \text{Round}\left(\frac{\text{Monthly Units}}{30 \times \text{Daily Generation Factor (4.2 units/kW)}}\right)$$
3. **PM Surya Ghar Central Subsidy**:
   - **First 1 kW**: ₹33,000
   - **Second 1 kW (up to 2 kW)**: +₹33,000 (Total ₹66,000)
   - **Third 1 kW (up to 3 kW)**: +₹12,000 (Total ₹78,000 max)
   - **Above 3 kW**: Fixed maximum subsidy of ₹78,000.
4. **Estimated 25-Year Savings**:
   $$\text{Lifetime Savings} = \text{Annual Savings} \times 25 \times (1 + \text{Tariff Escalation Factor})$$

---

## 📄 License

This project is proprietary software developed for **Solaris Energy Solutions**. All rights reserved.
#   S o l a r - w e b i s t e -  
 