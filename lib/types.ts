export interface SiteSettings {
  id?: number;
  company_name: string;
  tagline: string;
  logo_url?: string;
  favicon_url?: string;
  phone_number: string;
  whatsapp_number: string;
  email: string;
  address: string;
  working_hours: string;
  google_maps_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  linkedin_url?: string;
  youtube_url?: string;
  updated_at?: string;
}

export interface HomepageStat {
  id: string;
  label: string;
  value: string;
  icon?: string;
  display_order: number;
  active: boolean;
}

export interface Solution {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  hero_image: string;
  icon: string;
  benefits: string[];
  features: string[];
  how_it_works: { step: string; title: string; description: string }[];
  applications: string[];
  faqs: { question: string; answer: string }[];
  display_order: number;
  active: boolean;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  display_order: number;
  active: boolean;
}

export interface Product {
  id: string;
  category_id?: string;
  category_name?: string;
  name: string;
  slug: string;
  brand: string;
  model?: string;
  capacity?: string;
  short_description: string;
  description: string;
  specifications: Record<string, string>;
  features: string[];
  warranty: string;
  price?: number;
  price_display?: string;
  datasheet_url?: string;
  image_url: string;
  featured: boolean;
  active: boolean;
  display_order: number;
}

export interface PackageComponentItem {
  name: string;
  quantity: string;
  spec: string;
}

export interface Package {
  id: string;
  name: string;
  slug: string;
  capacity: string;
  system_type: 'On-Grid' | 'Off-Grid' | 'Hybrid';
  price: number;
  discount_price?: number;
  subsidy_applicable: boolean;
  estimated_subsidy: number;
  warranty: string;
  estimated_generation: string;
  description: string;
  components: PackageComponentItem[];
  benefits: string[];
  image_url: string;
  featured: boolean;
  display_order: number;
  active: boolean;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'Residential' | 'Commercial' | 'Industrial' | 'Agriculture';
  location: string;
  capacity: string;
  system_type: string;
  customer_type: string;
  installation_date?: string;
  description: string;
  cover_image: string;
  gallery?: string[];
  generation_stats: string;
  annual_savings: string;
  featured: boolean;
  active: boolean;
  display_order: number;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  location: string;
  photo_url?: string;
  review: string;
  rating: number;
  project_info?: string;
  display_order: number;
  active: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
  active: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author: string;
  category: string;
  tags: string[];
  read_time: string;
  seo_title?: string;
  seo_description?: string;
  published_at: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}

export interface SubsidyScheme {
  id: string;
  name: string;
  slug: string;
  overview: string;
  eligibility: string[];
  subsidy_details: { capacity: string; central_subsidy: string; state_subsidy: string; total: string }[];
  documents_required: string[];
  application_process: { step: number; title: string; desc: string }[];
  notes?: string;
  portal_url: string;
  last_updated: string;
  active: boolean;
}

export interface FinancingOption {
  id: string;
  partner_name: string;
  logo_url?: string;
  interest_rate: string;
  max_tenure: string;
  min_loan?: number;
  max_loan?: number;
  eligibility: string;
  features: string[];
  active: boolean;
  display_order: number;
}

export interface CalculatorSettings {
  id?: number;
  cost_per_kw: number;
  generation_per_kw_per_month: number;
  default_tariff: number;
  co2_factor: number; // kg CO2 per kWh
  maintenance_percent: number;
}

export interface CalculatorSubsidySlab {
  id: string;
  min_kw: number;
  max_kw: number;
  subsidy_amount: number;
  description: string;
  display_order: number;
}

export interface CalculatorInputs {
  monthly_bill: number;
  property_type: 'Residential' | 'Commercial' | 'Industrial';
  system_type: 'On-Grid' | 'Off-Grid' | 'Hybrid';
  roof_area_sqft?: number;
  state?: string;
  city?: string;
}

export interface CalculatorResult {
  recommended_capacity_kw: number;
  estimated_monthly_units: number;
  estimated_annual_units: number;
  estimated_monthly_savings: number;
  estimated_annual_savings: number;
  estimated_system_cost: number;
  estimated_subsidy: number;
  estimated_net_cost: number;
  estimated_payback_years: number;
  co2_reduction_tons_annual: number;
  required_roof_sqft: number;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  city?: string;
  requirement: string;
  message?: string;
  estimated_capacity?: string;
  source: string;
  page: string;
  status: 'NEW' | 'READ' | 'CONTACTED' | 'CLOSED';
  created_at: string;
}

export interface MediaItem {
  id: string;
  name: string;
  category: string;
  type: string;
  size: string;
  url: string;
  alt_text?: string;
  uploaded_at: string;
}

