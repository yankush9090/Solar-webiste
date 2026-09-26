-- Solaris Energy Solutions — Standalone PostgreSQL Production Schema
-- Compatible with PostgreSQL 13, 14, 15, 16, 17

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ADMIN USERS
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT 'Solaris Administrator',
  role TEXT NOT NULL DEFAULT 'admin',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SITE SETTINGS (Singleton configuration)
CREATE TABLE IF NOT EXISTS site_settings (
  id INT PRIMARY KEY DEFAULT 1,
  company_name TEXT,
  tagline TEXT,
  logo_url TEXT,
  favicon_url TEXT,
  phone_number TEXT,
  whatsapp_number TEXT,
  email TEXT,
  address TEXT,
  working_hours TEXT,
  google_maps_url TEXT,
  facebook_url TEXT,
  instagram_url TEXT,
  linkedin_url TEXT,
  youtube_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Website settings are admin-managed. Remove defaults when upgrading an existing database.
ALTER TABLE site_settings ALTER COLUMN company_name DROP DEFAULT;
ALTER TABLE site_settings ALTER COLUMN tagline DROP DEFAULT;
ALTER TABLE site_settings ALTER COLUMN logo_url DROP DEFAULT;
ALTER TABLE site_settings ALTER COLUMN favicon_url DROP DEFAULT;
ALTER TABLE site_settings ALTER COLUMN phone_number DROP DEFAULT;
ALTER TABLE site_settings ALTER COLUMN whatsapp_number DROP DEFAULT;
ALTER TABLE site_settings ALTER COLUMN email DROP DEFAULT;
ALTER TABLE site_settings ALTER COLUMN address DROP DEFAULT;
ALTER TABLE site_settings ALTER COLUMN working_hours DROP DEFAULT;
ALTER TABLE site_settings ALTER COLUMN facebook_url DROP DEFAULT;
ALTER TABLE site_settings ALTER COLUMN instagram_url DROP DEFAULT;
ALTER TABLE site_settings ALTER COLUMN linkedin_url DROP DEFAULT;
ALTER TABLE site_settings ALTER COLUMN youtube_url DROP DEFAULT;

-- Remove only the original seed values when upgrading an existing database.
UPDATE site_settings
SET company_name = NULL
WHERE company_name = 'Solaris Energy Solutions';
UPDATE site_settings
SET tagline = NULL
WHERE tagline = 'Leading Solar Engineering, Procurement & Commissioning (EPC) Company';
UPDATE site_settings
SET logo_url = NULL
WHERE logo_url = '/images/logo.svg';
UPDATE site_settings
SET favicon_url = NULL
WHERE favicon_url = '/favicon.ico';
UPDATE site_settings
SET phone_number = NULL
WHERE phone_number = '+91 78490 67305';
UPDATE site_settings
SET whatsapp_number = NULL
WHERE whatsapp_number = '+917849067305';
UPDATE site_settings
SET email = NULL
WHERE email = 'info@maatienergy.com';
UPDATE site_settings
SET address = NULL
WHERE address = 'Plot 42, EcoTech Renewable Corridor, Outer Ring Road, Bengaluru, Karnataka 560103';
UPDATE site_settings
SET working_hours = NULL
WHERE working_hours = 'Monday – Saturday: 9:00 AM – 7:00 PM';
UPDATE site_settings
SET facebook_url = NULL
WHERE facebook_url = 'https://facebook.com';
UPDATE site_settings
SET instagram_url = NULL
WHERE instagram_url = 'https://instagram.com';
UPDATE site_settings
SET linkedin_url = NULL
WHERE linkedin_url = 'https://linkedin.com';
UPDATE site_settings
SET youtube_url = NULL
WHERE youtube_url = 'https://youtube.com';

-- HOMEPAGE STATS
CREATE TABLE IF NOT EXISTS homepage_stats (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  icon TEXT,
  display_order INT NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SOLAR SOLUTIONS
CREATE TABLE IF NOT EXISTS solutions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  hero_image TEXT,
  icon TEXT,
  benefits JSONB DEFAULT '[]'::jsonb,
  features JSONB DEFAULT '[]'::jsonb,
  how_it_works JSONB DEFAULT '[]'::jsonb,
  applications JSONB DEFAULT '[]'::jsonb,
  faqs JSONB DEFAULT '[]'::jsonb,
  display_order INT NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- PRODUCT CATEGORIES & PRODUCTS
CREATE TABLE IF NOT EXISTS product_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  display_order INT NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  category_id TEXT REFERENCES product_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  brand TEXT NOT NULL,
  model TEXT,
  capacity TEXT,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  specifications JSONB DEFAULT '{}'::jsonb,
  features JSONB DEFAULT '[]'::jsonb,
  warranty TEXT NOT NULL DEFAULT '25 Years Performance Warranty',
  price NUMERIC(10, 2),
  price_display TEXT,
  datasheet_url TEXT,
  image_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SOLAR PACKAGES
CREATE TABLE IF NOT EXISTS packages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  capacity TEXT NOT NULL,
  system_type TEXT NOT NULL DEFAULT 'On-Grid',
  price NUMERIC(10, 2) NOT NULL,
  discount_price NUMERIC(10, 2),
  subsidy_applicable BOOLEAN DEFAULT true,
  estimated_subsidy NUMERIC(10, 2) DEFAULT 0,
  warranty TEXT NOT NULL DEFAULT '25 Years Module / 5 Years Inverter',
  estimated_generation TEXT NOT NULL,
  description TEXT NOT NULL,
  components JSONB DEFAULT '[]'::jsonb,
  benefits JSONB DEFAULT '[]'::jsonb,
  image_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  display_order INT NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- PROJECTS PORTFOLIO
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Residential', 'Commercial', 'Industrial', 'Agriculture')),
  location TEXT NOT NULL,
  capacity TEXT NOT NULL,
  system_type TEXT NOT NULL,
  customer_type TEXT NOT NULL,
  installation_date DATE,
  description TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  gallery JSONB DEFAULT '[]'::jsonb,
  generation_stats TEXT,
  annual_savings TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TESTIMONIALS
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  location TEXT NOT NULL,
  photo_url TEXT,
  review TEXT NOT NULL,
  rating INT NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  project_info TEXT,
  display_order INT NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- FAQS
CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  display_order INT NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- BLOG POSTS
CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT,
  author TEXT NOT NULL DEFAULT 'Solaris Energy Research Team',
  category TEXT NOT NULL DEFAULT 'Solar Guide',
  tags JSONB DEFAULT '["Solar", "Rooftop", "Subsidy"]'::jsonb,
  read_time TEXT DEFAULT '5 min read',
  published_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'PUBLISHED' CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SUBSIDY SCHEMES
CREATE TABLE IF NOT EXISTS subsidy_schemes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  overview TEXT NOT NULL,
  eligibility JSONB DEFAULT '[]'::jsonb,
  subsidy_details JSONB DEFAULT '[]'::jsonb,
  documents_required JSONB DEFAULT '[]'::jsonb,
  application_process JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  portal_url TEXT DEFAULT 'https://pmsuryaghar.gov.in',
  last_updated DATE DEFAULT CURRENT_DATE,
  active BOOLEAN NOT NULL DEFAULT true
);

-- FINANCING OPTIONS
CREATE TABLE IF NOT EXISTS financing_options (
  id TEXT PRIMARY KEY,
  partner_name TEXT NOT NULL,
  logo_url TEXT,
  interest_rate TEXT NOT NULL,
  max_tenure TEXT NOT NULL,
  min_loan NUMERIC(10, 2),
  max_loan NUMERIC(10, 2),
  eligibility TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  active BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0
);

-- CALCULATOR SETTINGS & SLABS
CREATE TABLE IF NOT EXISTS calculator_settings (
  id INT PRIMARY KEY DEFAULT 1,
  cost_per_kw NUMERIC(10, 2) NOT NULL DEFAULT 60000,
  generation_per_kw_per_month NUMERIC(10, 2) NOT NULL DEFAULT 120,
  default_tariff NUMERIC(10, 2) NOT NULL DEFAULT 8.00,
  co2_factor NUMERIC(10, 4) NOT NULL DEFAULT 0.82,
  maintenance_percent NUMERIC(5, 2) NOT NULL DEFAULT 1.5,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS calculator_subsidy_slabs (
  id TEXT PRIMARY KEY,
  min_kw NUMERIC(5, 2) NOT NULL,
  max_kw NUMERIC(5, 2) NOT NULL,
  subsidy_amount NUMERIC(10, 2) NOT NULL,
  description TEXT,
  display_order INT NOT NULL DEFAULT 0
);

-- ENQUIRIES (Lead Capture Inbox)
CREATE TABLE IF NOT EXISTS enquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  city TEXT,
  requirement TEXT NOT NULL,
  message TEXT,
  estimated_capacity TEXT,
  source TEXT NOT NULL DEFAULT 'Website',
  page TEXT NOT NULL DEFAULT '/',
  status TEXT NOT NULL DEFAULT 'NEW' CHECK (status IN ('NEW', 'READ', 'CONTACTED', 'CLOSED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_solutions_slug ON solutions(slug);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_packages_slug ON packages(slug);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries(created_at DESC);

-- INITIAL SEED DATA
-- ==========================================================

-- Admin User (Default demo password: solaradmin2025)
INSERT INTO admin_users (email, password_hash, name, role)
VALUES ('admin@solarisenergy.com', 'solaradmin2025', 'Solaris Senior Admin', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Calculator Settings
INSERT INTO calculator_settings (id, cost_per_kw, generation_per_kw_per_month, default_tariff, co2_factor, maintenance_percent)
VALUES (1, 60000, 120, 8.00, 0.82, 1.5)
ON CONFLICT (id) DO NOTHING;

-- Calculator Subsidy Slabs
INSERT INTO calculator_subsidy_slabs (id, min_kw, max_kw, subsidy_amount, description, display_order)
VALUES
  ('slab-1', 0.8, 1.5, 30000, '1 kW Residential System', 1),
  ('slab-2', 1.6, 2.5, 60000, '2 kW Residential System', 2),
  ('slab-3', 2.6, 10.0, 78000, '3 kW and above Residential (Capped)', 3)
ON CONFLICT (id) DO NOTHING;

-- Homepage Stats
INSERT INTO homepage_stats (id, label, value, display_order, active)
VALUES
  ('stat-1', 'Projects Completed', '550+', 1, true),
  ('stat-2', 'Installed Capacity', '12.5 MW+', 2, true),
  ('stat-3', 'Satisfied Customers', '98%', 3, true),
  ('stat-4', 'Years of Excellence', '12+', 4, true)
ON CONFLICT (id) DO NOTHING;

-- MEDIA LIBRARY ITEMS
CREATE TABLE IF NOT EXISTS media_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  type TEXT NOT NULL DEFAULT 'image/jpeg',
  size TEXT NOT NULL DEFAULT '1.0 MB',
  url TEXT NOT NULL,
  alt_text TEXT,
  uploaded_at DATE NOT NULL DEFAULT CURRENT_DATE
);

