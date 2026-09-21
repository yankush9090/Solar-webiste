import * as actions from '../db/actions';
import { calculateSolar } from '../calculator';
import {
  Solution,
  Product,
  Package,
  Project,
  Testimonial,
  FAQ,
  BlogPost,
  Enquiry,
} from '../types';

export const SolarService = {
  // Settings & Stats
  getSettings: actions.getSettingsAction,
  saveSettings: actions.saveSettingsAction,
  updateSettings: actions.saveSettingsAction,
  getStats: actions.getStatsAction,

  // Solutions
  getSolutions: actions.getSolutionsAction,
  getSolutionBySlug: async (slug: string) => {
    const list = await actions.getSolutionsAction();
    return list.find((s) => s.slug === slug) || null;
  },
  saveSolution: async (solution: Solution): Promise<Solution[]> => {
    await actions.saveSolutionAction(solution);
    return actions.getSolutionsAction();
  },

  // Products
  getProductCategories: actions.getProductCategoriesAction,
  getProducts: actions.getProductsAction,
  getProductBySlug: async (slug: string) => {
    const list = await actions.getProductsAction();
    return list.find((p) => p.slug === slug) || null;
  },
  saveProduct: async (product: Product): Promise<Product[]> => {
    await actions.saveProductAction(product);
    return actions.getProductsAction();
  },

  // Packages
  getPackages: actions.getPackagesAction,
  getPackageBySlug: async (slug: string) => {
    const list = await actions.getPackagesAction();
    return list.find((p) => p.slug === slug) || null;
  },
  savePackage: async (pkg: Package): Promise<Package[]> => {
    await actions.savePackageAction(pkg);
    return actions.getPackagesAction();
  },

  // Projects
  getProjects: actions.getProjectsAction,
  getProjectBySlug: async (slug: string) => {
    const list = await actions.getProjectsAction();
    return list.find((p) => p.slug === slug) || null;
  },
  saveProject: async (proj: Project): Promise<Project[]> => {
    await actions.saveProjectAction(proj);
    return actions.getProjectsAction();
  },

  // Testimonials & FAQs
  getTestimonials: actions.getTestimonialsAction,
  saveTestimonial: async (testimonial: Testimonial): Promise<Testimonial[]> => {
    await actions.saveTestimonialAction(testimonial);
    return actions.getTestimonialsAction();
  },
  getFAQs: actions.getFaqsAction,
  saveFAQ: async (faq: FAQ): Promise<FAQ[]> => {
    await actions.saveFaqAction(faq);
    return actions.getFaqsAction();
  },

  // Blog
  getBlogPosts: actions.getBlogPostsAction,
  getBlogPostBySlug: async (slug: string) => {
    const list = await actions.getBlogPostsAction();
    return list.find((b) => b.slug === slug) || null;
  },
  saveBlogPost: async (post: BlogPost): Promise<BlogPost[]> => {
    await actions.saveBlogPostAction(post);
    return actions.getBlogPostsAction();
  },

  // Subsidy & Financing
  getSubsidy: actions.getSubsidyAction,
  saveSubsidy: actions.saveSubsidyAction,
  updateSubsidy: actions.saveSubsidyAction,
  getFinancing: actions.getFinancingAction,

  // Calculator
  getCalculatorSettings: actions.getCalculatorSettingsAction,
  saveCalculatorSettings: actions.saveCalculatorSettingsAction,
  updateCalculatorSettings: actions.saveCalculatorSettingsAction,
  getCalculatorSlabs: actions.getCalculatorSlabsAction,
  calculateSolar,

  // Enquiries
  submitEnquiry: actions.submitEnquiryAction,
  getEnquiries: actions.getEnquiriesAction,
  updateEnquiryStatus: async (id: string, status: Enquiry['status']): Promise<Enquiry[]> => {
    await actions.updateEnquiryStatusAction(id, status);
    return actions.getEnquiriesAction();
  },
  deleteEnquiry: async (id: string): Promise<Enquiry[]> => {
    await actions.deleteEnquiryAction(id);
    return actions.getEnquiriesAction();
  },

  // Media
  getMediaItems: actions.getMediaItemsAction,
  saveMediaItem: actions.saveMediaItemAction,
  deleteMediaItem: actions.deleteMediaItemAction,

  // Admin Auth
  loginAdmin: actions.loginAdminAction,
};

