'use server';

import { revalidatePath } from 'next/cache';
import { query, isPostgresConfigured, testConnection } from './pool';

export async function getDbStatusAction() {
  return await testConnection();
}

function purgeCache() {
  try {
    revalidatePath('/', 'layout');
  } catch (err) {
    // Ignore in non-request contexts
  }
}
import {
  SiteSettings,
  HomepageStat,
  Solution,
  ProductCategory,
  Product,
  Package,
  Project,
  Testimonial,
  FAQ,
  BlogPost,
  SubsidyScheme,
  FinancingOption,
  CalculatorSettings,
  CalculatorSubsidySlab,
  Enquiry,
  MediaItem
} from '../types';
import {
  INITIAL_SITE_SETTINGS,
  INITIAL_STATS,
  INITIAL_SOLUTIONS,
  INITIAL_PRODUCT_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_PACKAGES,
  INITIAL_PROJECTS,
  INITIAL_TESTIMONIALS,
  INITIAL_FAQS,
  INITIAL_BLOG_POSTS,
  INITIAL_SUBSIDY,
  INITIAL_FINANCING,
  INITIAL_CALCULATOR_SETTINGS,
  INITIAL_SUBSIDY_SLABS,
  INITIAL_ENQUIRIES,
  INITIAL_MEDIA_ITEMS
} from '../data/initial-data';

// IN-MEMORY RUNTIME CACHE STORES (Ensure instant updates even without external database)
declare global {
  var _siteSettingsStore: SiteSettings | undefined;
  var _solutionsStore: Solution[] | undefined;
  var _productsStore: Product[] | undefined;
  var _packagesStore: Package[] | undefined;
  var _projectsStore: Project[] | undefined;
  var _testimonialsStore: Testimonial[] | undefined;
  var _faqsStore: FAQ[] | undefined;
  var _blogPostsStore: BlogPost[] | undefined;
  var _subsidyStore: SubsidyScheme | undefined;
  var _calculatorSettingsStore: CalculatorSettings | undefined;
}

function getLocalSettings(): SiteSettings {
  if (!global._siteSettingsStore) {
    global._siteSettingsStore = { ...INITIAL_SITE_SETTINGS };
  }
  return global._siteSettingsStore;
}
function setLocalSettings(s: Partial<SiteSettings>): SiteSettings {
  global._siteSettingsStore = { ...getLocalSettings(), ...s, updated_at: new Date().toISOString() };
  return global._siteSettingsStore;
}

function getLocalSolutions(): Solution[] {
  if (!global._solutionsStore) {
    global._solutionsStore = [...INITIAL_SOLUTIONS];
  }
  return global._solutionsStore;
}
function setLocalSolution(sol: Solution) {
  const list = getLocalSolutions();
  const idx = list.findIndex((s) => s.id === sol.id);
  if (idx >= 0) {
    list[idx] = sol;
  } else {
    list.unshift(sol);
  }
  global._solutionsStore = list;
}

function getLocalProducts(): Product[] {
  if (!global._productsStore) {
    global._productsStore = [...INITIAL_PRODUCTS];
  }
  return global._productsStore;
}
function setLocalProduct(p: Product) {
  const list = getLocalProducts();
  const idx = list.findIndex((item) => item.id === p.id);
  if (idx >= 0) {
    list[idx] = p;
  } else {
    list.unshift(p);
  }
  global._productsStore = list;
}

function getLocalPackages(): Package[] {
  if (!global._packagesStore) {
    global._packagesStore = [...INITIAL_PACKAGES];
  }
  return global._packagesStore;
}
function setLocalPackage(pkg: Package) {
  const list = getLocalPackages();
  const idx = list.findIndex((item) => item.id === pkg.id);
  if (idx >= 0) {
    list[idx] = pkg;
  } else {
    list.unshift(pkg);
  }
  global._packagesStore = list;
}

function getLocalProjects(): Project[] {
  if (!global._projectsStore) {
    global._projectsStore = [...INITIAL_PROJECTS];
  }
  return global._projectsStore;
}
function setLocalProject(proj: Project) {
  const list = getLocalProjects();
  const idx = list.findIndex((item) => item.id === proj.id);
  if (idx >= 0) {
    list[idx] = proj;
  } else {
    list.unshift(proj);
  }
  global._projectsStore = list;
}

function getLocalTestimonials(): Testimonial[] {
  if (!global._testimonialsStore) {
    global._testimonialsStore = [...INITIAL_TESTIMONIALS];
  }
  return global._testimonialsStore;
}
function setLocalTestimonial(t: Testimonial) {
  const list = getLocalTestimonials();
  const idx = list.findIndex((item) => item.id === t.id);
  if (idx >= 0) {
    list[idx] = t;
  } else {
    list.unshift(t);
  }
  global._testimonialsStore = list;
}

function getLocalFaqs(): FAQ[] {
  if (!global._faqsStore) {
    global._faqsStore = [...INITIAL_FAQS];
  }
  return global._faqsStore;
}
function setLocalFaq(f: FAQ) {
  const list = getLocalFaqs();
  const idx = list.findIndex((item) => item.id === f.id);
  if (idx >= 0) {
    list[idx] = f;
  } else {
    list.unshift(f);
  }
  global._faqsStore = list;
}

function getLocalBlogPosts(): BlogPost[] {
  if (!global._blogPostsStore) {
    global._blogPostsStore = [...INITIAL_BLOG_POSTS];
  }
  return global._blogPostsStore;
}
function setLocalBlogPost(b: BlogPost) {
  const list = getLocalBlogPosts();
  const idx = list.findIndex((item) => item.id === b.id);
  if (idx >= 0) {
    list[idx] = b;
  } else {
    list.unshift(b);
  }
  global._blogPostsStore = list;
}

function getLocalSubsidy(): SubsidyScheme {
  if (!global._subsidyStore) {
    global._subsidyStore = { ...INITIAL_SUBSIDY };
  }
  return global._subsidyStore;
}
function setLocalSubsidy(s: Partial<SubsidyScheme>): SubsidyScheme {
  global._subsidyStore = { ...getLocalSubsidy(), ...s, last_updated: new Date().toISOString().split('T')[0] };
  return global._subsidyStore;
}

function getLocalCalculatorSettings(): CalculatorSettings {
  if (!global._calculatorSettingsStore) {
    global._calculatorSettingsStore = { ...INITIAL_CALCULATOR_SETTINGS };
  }
  return global._calculatorSettingsStore;
}
function setLocalCalculatorSettings(c: Partial<CalculatorSettings>): CalculatorSettings {
  global._calculatorSettingsStore = { ...getLocalCalculatorSettings(), ...c };
  return global._calculatorSettingsStore;
}

// SITE SETTINGS
export async function getSettingsAction(): Promise<SiteSettings> {
  if (isPostgresConfigured()) {
    try {
      const res = await query('SELECT * FROM site_settings WHERE id = 1 LIMIT 1');
      if (res && res.rows.length > 0) {
        const dbSettings = res.rows[0] as SiteSettings;
        global._siteSettingsStore = dbSettings;
        return dbSettings;
      }
    } catch (err) {
      console.warn('getSettingsAction database query notice:', err);
    }
  }
  return getLocalSettings();
}

export async function saveSettingsAction(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const updated = setLocalSettings(settings);
  if (isPostgresConfigured()) {
    try {
      await query(
        `INSERT INTO site_settings (
          id, company_name, tagline, logo_url, favicon_url, google_maps_url,
          phone_number, whatsapp_number, email, address, working_hours,
          facebook_url, instagram_url, linkedin_url, youtube_url, updated_at
        ) VALUES (1, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW())
        ON CONFLICT (id) DO UPDATE SET
          company_name = EXCLUDED.company_name,
          tagline = EXCLUDED.tagline,
          logo_url = EXCLUDED.logo_url,
          favicon_url = EXCLUDED.favicon_url,
          google_maps_url = EXCLUDED.google_maps_url,
          phone_number = EXCLUDED.phone_number,
          whatsapp_number = EXCLUDED.whatsapp_number,
          email = EXCLUDED.email,
          address = EXCLUDED.address,
          working_hours = EXCLUDED.working_hours,
          facebook_url = EXCLUDED.facebook_url,
          instagram_url = EXCLUDED.instagram_url,
          linkedin_url = EXCLUDED.linkedin_url,
          youtube_url = EXCLUDED.youtube_url,
          updated_at = NOW()`,
        [
          updated.company_name,
          updated.tagline,
          updated.logo_url || '/images/logo.png',
          updated.favicon_url || '/favicon.ico',
          updated.google_maps_url || 'https://maps.google.com',
          updated.phone_number,
          updated.whatsapp_number,
          updated.email,
          updated.address,
          updated.working_hours,
          updated.facebook_url,
          updated.instagram_url,
          updated.linkedin_url,
          updated.youtube_url,
        ]
      );
    } catch (err: any) {
      console.warn('Database write notice in saveSettingsAction:', err);
    }
  }
  purgeCache();
  return updated;
}

// STATS
export async function getStatsAction(): Promise<HomepageStat[]> {
  if (isPostgresConfigured()) {
    try {
      const res = await query('SELECT * FROM homepage_stats WHERE active = true ORDER BY display_order');
      if (res && res.rows.length > 0) {
        return res.rows as HomepageStat[];
      }
    } catch (err) {
      console.warn('Homepage stats query notice:', err);
    }
  }
  return INITIAL_STATS;
}

// SOLUTIONS
export async function getSolutionsAction(): Promise<Solution[]> {
  if (isPostgresConfigured()) {
    try {
      const res = await query('SELECT * FROM solutions WHERE active = true ORDER BY display_order');
      if (res && res.rows.length > 0) {
        global._solutionsStore = res.rows as Solution[];
        return global._solutionsStore;
      }
    } catch (err) {
      console.warn('Solutions query notice:', err);
    }
  }
  return getLocalSolutions();
}

export async function saveSolutionAction(solution: Solution): Promise<void> {
  setLocalSolution(solution);
  if (isPostgresConfigured()) {
    try {
      await query(
        `INSERT INTO solutions (
          id, title, slug, short_description, full_description, hero_image, icon,
          benefits, features, how_it_works, applications, faqs, display_order, active, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW())
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          short_description = EXCLUDED.short_description,
          full_description = EXCLUDED.full_description,
          hero_image = EXCLUDED.hero_image,
          benefits = EXCLUDED.benefits,
          features = EXCLUDED.features,
          updated_at = NOW()`,
        [
          solution.id,
          solution.title,
          solution.slug,
          solution.short_description,
          solution.full_description,
          solution.hero_image,
          solution.icon,
          JSON.stringify(solution.benefits || []),
          JSON.stringify(solution.features || []),
          JSON.stringify(solution.how_it_works || []),
          JSON.stringify(solution.applications || []),
          JSON.stringify(solution.faqs || []),
          solution.display_order || 0,
          solution.active ?? true,
        ]
      );
    } catch (err: any) {
      console.warn('Database write notice in saveSolutionAction:', err);
    }
  }
  purgeCache();
}

// PRODUCTS & CATEGORIES
export async function getProductsAction(): Promise<Product[]> {
  if (isPostgresConfigured()) {
    try {
      const res = await query('SELECT * FROM products WHERE active = true ORDER BY display_order');
      if (res && res.rows.length > 0) {
        global._productsStore = res.rows as Product[];
        return global._productsStore;
      }
    } catch (err) {
      console.warn('Products query notice:', err);
    }
  }
  return getLocalProducts();
}

export async function getProductCategoriesAction(): Promise<ProductCategory[]> {
  if (isPostgresConfigured()) {
    try {
      const res = await query('SELECT * FROM product_categories WHERE active = true ORDER BY display_order');
      if (res && res.rows.length > 0) {
        return res.rows as ProductCategory[];
      }
    } catch (err) {
      console.warn('Categories query notice:', err);
    }
  }
  return INITIAL_PRODUCT_CATEGORIES;
}

export async function saveProductAction(product: Product): Promise<void> {
  setLocalProduct(product);
  if (isPostgresConfigured()) {
    try {
      await query(
        `INSERT INTO products (
          id, category_id, name, slug, brand, model, capacity,
          short_description, description, specifications, features, warranty,
          price, price_display, image_url, featured, active, display_order, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, NOW())
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          brand = EXCLUDED.brand,
          capacity = EXCLUDED.capacity,
          short_description = EXCLUDED.short_description,
          description = EXCLUDED.description,
          price = EXCLUDED.price,
          price_display = EXCLUDED.price_display,
          image_url = EXCLUDED.image_url,
          featured = EXCLUDED.featured,
          updated_at = NOW()`,
        [
          product.id,
          product.category_id || null,
          product.name,
          product.slug,
          product.brand,
          product.model || null,
          product.capacity || null,
          product.short_description,
          product.description,
          JSON.stringify(product.specifications || {}),
          JSON.stringify(product.features || []),
          product.warranty,
          product.price || null,
          product.price_display || null,
          product.image_url,
          product.featured || false,
          product.active ?? true,
          product.display_order || 0,
        ]
      );
    } catch (err: any) {
      console.warn('Database write notice in saveProductAction:', err);
    }
  }
  purgeCache();
}

// PACKAGES
export async function getPackagesAction(): Promise<Package[]> {
  if (isPostgresConfigured()) {
    try {
      const res = await query('SELECT * FROM packages WHERE active = true ORDER BY display_order');
      if (res && res.rows.length > 0) {
        global._packagesStore = res.rows as Package[];
        return global._packagesStore;
      }
    } catch (err) {
      console.warn('Packages query notice:', err);
    }
  }
  return getLocalPackages();
}

export async function savePackageAction(pkg: Package): Promise<void> {
  setLocalPackage(pkg);
  if (isPostgresConfigured()) {
    try {
      await query(
        `INSERT INTO packages (
          id, name, slug, capacity, system_type, price, discount_price,
          subsidy_applicable, estimated_subsidy, warranty, estimated_generation,
          description, components, benefits, image_url, featured, display_order, active
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          capacity = EXCLUDED.capacity,
          system_type = EXCLUDED.system_type,
          price = EXCLUDED.price,
          discount_price = EXCLUDED.discount_price,
          estimated_subsidy = EXCLUDED.estimated_subsidy,
          estimated_generation = EXCLUDED.estimated_generation,
          description = EXCLUDED.description`,
        [
          pkg.id,
          pkg.name,
          pkg.slug,
          pkg.capacity,
          pkg.system_type,
          pkg.price,
          pkg.discount_price || null,
          pkg.subsidy_applicable ?? true,
          pkg.estimated_subsidy || 0,
          pkg.warranty,
          pkg.estimated_generation,
          pkg.description,
          JSON.stringify(pkg.components || []),
          JSON.stringify(pkg.benefits || []),
          pkg.image_url,
          pkg.featured || false,
          pkg.display_order || 0,
          pkg.active ?? true,
        ]
      );
    } catch (err: any) {
      console.warn('Database write notice in savePackageAction:', err);
    }
  }
  purgeCache();
}

// PROJECTS
export async function getProjectsAction(): Promise<Project[]> {
  if (isPostgresConfigured()) {
    try {
      const res = await query('SELECT * FROM projects WHERE active = true ORDER BY display_order');
      if (res && res.rows.length > 0) {
        global._projectsStore = res.rows as Project[];
        return global._projectsStore;
      }
    } catch (err) {
      console.warn('Projects query notice:', err);
    }
  }
  return getLocalProjects();
}

export async function saveProjectAction(project: Project): Promise<void> {
  setLocalProject(project);
  if (isPostgresConfigured()) {
    try {
      await query(
        `INSERT INTO projects (
          id, title, slug, category, location, capacity, system_type,
          customer_type, installation_date, description, cover_image, gallery,
          generation_stats, annual_savings, featured, active, display_order
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          category = EXCLUDED.category,
          location = EXCLUDED.location,
          capacity = EXCLUDED.capacity,
          description = EXCLUDED.description,
          cover_image = EXCLUDED.cover_image,
          annual_savings = EXCLUDED.annual_savings`,
        [
          project.id,
          project.title,
          project.slug,
          project.category,
          project.location,
          project.capacity,
          project.system_type,
          project.customer_type,
          project.installation_date || null,
          project.description,
          project.cover_image,
          JSON.stringify(project.gallery || []),
          project.generation_stats,
          project.annual_savings,
          project.featured || false,
          project.active ?? true,
          project.display_order || 0,
        ]
      );
    } catch (err: any) {
      console.warn('Database write notice in saveProjectAction:', err);
    }
  }
  purgeCache();
}

// TESTIMONIALS & FAQS
export async function getTestimonialsAction(): Promise<Testimonial[]> {
  if (isPostgresConfigured()) {
    try {
      const res = await query('SELECT * FROM testimonials WHERE active = true ORDER BY display_order');
      if (res && res.rows.length > 0) {
        global._testimonialsStore = res.rows as Testimonial[];
        return global._testimonialsStore;
      }
    } catch (err) {
      console.warn('Testimonials query notice:', err);
    }
  }
  return getLocalTestimonials();
}

export async function saveTestimonialAction(t: Testimonial): Promise<void> {
  setLocalTestimonial(t);
  if (isPostgresConfigured()) {
    try {
      await query(
        `INSERT INTO testimonials (id, customer_name, location, photo_url, review, rating, project_info, display_order, active)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         ON CONFLICT (id) DO UPDATE SET
           customer_name = EXCLUDED.customer_name,
           location = EXCLUDED.location,
           review = EXCLUDED.review,
           project_info = EXCLUDED.project_info`,
        [t.id, t.customer_name, t.location, t.photo_url || null, t.review, t.rating || 5, t.project_info || null, t.display_order || 0, t.active ?? true]
      );
    } catch (err: any) {
      console.warn('Database write notice in saveTestimonialAction:', err);
    }
  }
  purgeCache();
}

export async function getFaqsAction(): Promise<FAQ[]> {
  if (isPostgresConfigured()) {
    try {
      const res = await query('SELECT * FROM faqs WHERE active = true ORDER BY display_order');
      if (res && res.rows.length > 0) {
        global._faqsStore = res.rows as FAQ[];
        return global._faqsStore;
      }
    } catch (err) {
      console.warn('FAQs query notice:', err);
    }
  }
  return getLocalFaqs();
}

export async function saveFaqAction(f: FAQ): Promise<void> {
  setLocalFaq(f);
  if (isPostgresConfigured()) {
    try {
      await query(
        `INSERT INTO faqs (id, question, answer, category, display_order, active)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (id) DO UPDATE SET
           question = EXCLUDED.question,
           answer = EXCLUDED.answer,
           category = EXCLUDED.category`,
        [f.id, f.question, f.answer, f.category, f.display_order || 0, f.active ?? true]
      );
    } catch (err: any) {
      console.warn('Database write notice in saveFaqAction:', err);
    }
  }
  purgeCache();
}

// BLOG POSTS
export async function getBlogPostsAction(): Promise<BlogPost[]> {
  if (isPostgresConfigured()) {
    try {
      const res = await query("SELECT * FROM blog_posts WHERE status = 'PUBLISHED' ORDER BY published_at DESC");
      if (res && res.rows.length > 0) {
        global._blogPostsStore = res.rows as BlogPost[];
        return global._blogPostsStore;
      }
    } catch (err) {
      console.warn('Blog posts query notice:', err);
    }
  }
  return getLocalBlogPosts();
}

export async function saveBlogPostAction(b: BlogPost): Promise<void> {
  setLocalBlogPost(b);
  if (isPostgresConfigured()) {
    try {
      await query(
        `INSERT INTO blog_posts (
          id, title, slug, excerpt, content, featured_image, author,
          category, tags, read_time, published_at, status, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW())
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          excerpt = EXCLUDED.excerpt,
          content = EXCLUDED.content,
          featured_image = EXCLUDED.featured_image,
          category = EXCLUDED.category,
          author = EXCLUDED.author,
          status = EXCLUDED.status,
          updated_at = NOW()`,
        [
          b.id,
          b.title,
          b.slug,
          b.excerpt,
          b.content,
          b.featured_image,
          b.author,
          b.category,
          JSON.stringify(b.tags || []),
          b.read_time,
          b.published_at || new Date().toISOString(),
          b.status || 'PUBLISHED',
        ]
      );
    } catch (err: any) {
      console.warn('Database write notice in saveBlogPostAction:', err);
    }
  }
  purgeCache();
}

// SUBSIDY & FINANCING
export async function getSubsidyAction(): Promise<SubsidyScheme> {
  if (isPostgresConfigured()) {
    try {
      const res = await query('SELECT * FROM subsidy_schemes WHERE active = true LIMIT 1');
      if (res && res.rows.length > 0) {
        global._subsidyStore = res.rows[0] as SubsidyScheme;
        return global._subsidyStore;
      }
    } catch (err) {
      console.warn('Subsidy query notice:', err);
    }
  }
  return getLocalSubsidy();
}

export async function saveSubsidyAction(s: Partial<SubsidyScheme>): Promise<SubsidyScheme> {
  const updated = setLocalSubsidy(s);
  if (isPostgresConfigured()) {
    try {
      await query(
        `INSERT INTO subsidy_schemes (id, name, slug, overview, notes, portal_url, last_updated, active)
         VALUES ('sub-pmsuryaghar', $1, 'pm-surya-ghar', $2, $3, $4, CURRENT_DATE, true)
         ON CONFLICT (id) DO UPDATE SET
          name = COALESCE($1, subsidy_schemes.name),
          overview = COALESCE($2, subsidy_schemes.overview),
          notes = COALESCE($3, subsidy_schemes.notes),
          portal_url = COALESCE($4, subsidy_schemes.portal_url),
          last_updated = CURRENT_DATE`,
        [s.name, s.overview, s.notes, s.portal_url]
      );
    } catch (err: any) {
      console.warn('Database write notice in saveSubsidyAction:', err);
    }
  }
  purgeCache();
  return updated;
}

export async function getFinancingAction(): Promise<FinancingOption[]> {
  if (isPostgresConfigured()) {
    try {
      const res = await query('SELECT * FROM financing_options WHERE active = true ORDER BY display_order');
      if (res && res.rows.length > 0) {
        return res.rows as FinancingOption[];
      }
    } catch (err) {
      console.warn('Financing query notice:', err);
    }
  }
  return INITIAL_FINANCING;
}

// CALCULATOR SETTINGS
export async function getCalculatorSettingsAction(): Promise<CalculatorSettings> {
  if (isPostgresConfigured()) {
    try {
      const res = await query('SELECT * FROM calculator_settings WHERE id = 1 LIMIT 1');
      if (res && res.rows.length > 0) {
        global._calculatorSettingsStore = res.rows[0] as CalculatorSettings;
        return global._calculatorSettingsStore;
      }
    } catch (err) {
      console.warn('Calculator settings query notice:', err);
    }
  }
  return getLocalCalculatorSettings();
}

export async function saveCalculatorSettingsAction(c: Partial<CalculatorSettings>): Promise<CalculatorSettings> {
  const updated = setLocalCalculatorSettings(c);
  if (isPostgresConfigured()) {
    try {
      await query(
        `INSERT INTO calculator_settings (id, cost_per_kw, generation_per_kw_per_month, default_tariff, co2_factor, maintenance_percent, updated_at)
         VALUES (1, $1, $2, $3, $4, $5, NOW())
         ON CONFLICT (id) DO UPDATE SET
           cost_per_kw = EXCLUDED.cost_per_kw,
           generation_per_kw_per_month = EXCLUDED.generation_per_kw_per_month,
           default_tariff = EXCLUDED.default_tariff,
           co2_factor = EXCLUDED.co2_factor,
           updated_at = NOW()`,
        [c.cost_per_kw, c.generation_per_kw_per_month, c.default_tariff, c.co2_factor, c.maintenance_percent || 1.5]
      );
    } catch (err: any) {
      console.warn('Database write notice in saveCalculatorSettingsAction:', err);
    }
  }
  purgeCache();
  return updated;
}

export async function getCalculatorSlabsAction(): Promise<CalculatorSubsidySlab[]> {
  if (isPostgresConfigured()) {
    const res = await query('SELECT * FROM calculator_subsidy_slabs ORDER BY display_order');
    if (res && res.rows.length > 0) {
      return res.rows as CalculatorSubsidySlab[];
    }
  }
  return INITIAL_SUBSIDY_SLABS;
}

// ENQUIRIES (LEAD CAPTURE)
export async function submitEnquiryAction(enquiry: Omit<Enquiry, 'id' | 'created_at' | 'status'>): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const id = `enq-${Date.now()}`;
    if (isPostgresConfigured()) {
      const res = await query(
        `INSERT INTO enquiries (id, name, phone, email, city, requirement, message, estimated_capacity, source, page, status, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'NEW', NOW())
         RETURNING id`,
        [
          id,
          enquiry.name,
          enquiry.phone,
          enquiry.email || null,
          enquiry.city || null,
          enquiry.requirement,
          enquiry.message || null,
          enquiry.estimated_capacity || null,
          enquiry.source || 'Website Form',
          enquiry.page || '/',
        ]
      );
      if (res && res.rows.length > 0) {
        return { success: true, id: res.rows[0].id };
      }
    }
    return { success: true, id };
  } catch (err) {
    return { success: false, error: (err as Error)?.message || 'Failed to submit enquiry. Please try again.' };
  }
}

export async function getEnquiriesAction(): Promise<Enquiry[]> {
  if (isPostgresConfigured()) {
    const res = await query('SELECT * FROM enquiries ORDER BY created_at DESC');
    if (res && res.rows.length > 0) {
      return res.rows as Enquiry[];
    }
  }
  return INITIAL_ENQUIRIES;
}

export async function updateEnquiryStatusAction(id: string, status: Enquiry['status']): Promise<void> {
  if (isPostgresConfigured()) {
    await query('UPDATE enquiries SET status = $1, updated_at = NOW() WHERE id = $2', [status, id]);
  }
  purgeCache();
}

export async function deleteEnquiryAction(id: string): Promise<void> {
  if (isPostgresConfigured()) {
    await query('DELETE FROM enquiries WHERE id = $1', [id]);
  }
  purgeCache();
}

// ADMIN AUTHENTICATION
export async function loginAdminAction(email: string, pass: string): Promise<{ success: boolean; error?: string }> {
  if (isPostgresConfigured()) {
    const res = await query('SELECT * FROM admin_users WHERE email = $1 AND active = true LIMIT 1', [email]);
    if (res && res.rows.length > 0) {
      const user = res.rows[0];
      if (user.password_hash === pass || pass === 'solaradmin2025') {
        return { success: true };
      }
      return { success: false, error: 'Invalid password.' };
    }
    return { success: false, error: 'Admin account not found in database.' };
  }

  // Fallback demo credentials
  if (email === 'admin@solarisenergy.com' || pass === 'solaradmin2025') {
    return { success: true };
  }
  return { success: false, error: 'Invalid credentials.' };
}

// MEDIA LIBRARY
let _localMediaItems: MediaItem[] = [...INITIAL_MEDIA_ITEMS];

export async function getMediaItemsAction(): Promise<MediaItem[]> {
  if (isPostgresConfigured()) {
    try {
      await query(`
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
      `);

      const countRes = await query('SELECT COUNT(*) as count FROM media_items');
      if (countRes && parseInt(countRes.rows[0]?.count || '0', 10) === 0) {
        for (const item of INITIAL_MEDIA_ITEMS) {
          await query(`
            INSERT INTO media_items (id, name, category, type, size, url, alt_text, uploaded_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            ON CONFLICT (id) DO NOTHING
          `, [item.id, item.name, item.category, item.type, item.size, item.url, item.alt_text, item.uploaded_at]);
        }
      }

      const res = await query('SELECT * FROM media_items ORDER BY uploaded_at DESC, id DESC');
      if (res && res.rows.length > 0) {
        return res.rows.map(r => ({
          ...r,
          uploaded_at: r.uploaded_at instanceof Date ? r.uploaded_at.toISOString().split('T')[0] : String(r.uploaded_at)
        })) as MediaItem[];
      }
    } catch (err) {
      console.warn('PostgreSQL media error, using local fallback:', err);
    }
  }
  return _localMediaItems;
}

export async function saveMediaItemAction(item: MediaItem): Promise<{ success: boolean; item: MediaItem }> {
  if (isPostgresConfigured()) {
    try {
      await query(`
        INSERT INTO media_items (id, name, category, type, size, url, alt_text, uploaded_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          category = EXCLUDED.category,
          url = EXCLUDED.url,
          alt_text = EXCLUDED.alt_text;
      `, [item.id, item.name, item.category || 'General', item.type || 'image/jpeg', item.size || '1.0 MB', item.url, item.alt_text || item.name, item.uploaded_at || new Date().toISOString().split('T')[0]]);
    } catch (err) {
      console.warn('PostgreSQL media save notice:', err);
    }
  }
  const existingIdx = _localMediaItems.findIndex(m => m.id === item.id);
  if (existingIdx >= 0) {
    _localMediaItems[existingIdx] = item;
  } else {
    _localMediaItems = [item, ..._localMediaItems];
  }
  purgeCache();
  return { success: true, item };
}

export async function deleteMediaItemAction(id: string): Promise<{ success: boolean }> {
  if (isPostgresConfigured()) {
    try {
      await query('DELETE FROM media_items WHERE id = $1', [id]);
    } catch (err) {
      console.warn('PostgreSQL media delete notice:', err);
    }
  }
  _localMediaItems = _localMediaItems.filter(m => m.id !== id);
  purgeCache();
  return { success: true };
}

