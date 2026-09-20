import * as actions from '../db/actions';
import { calculateSolar } from '../calculator';

export const SolarService = {
  // Settings & Stats
  getSettings: actions.getSettingsAction,
  saveSettings: actions.saveSettingsAction,
  getStats: actions.getStatsAction,

  // Solutions
  getSolutions: actions.getSolutionsAction,
  getSolutionBySlug: async (slug: string) => {
    const list = await actions.getSolutionsAction();
    return list.find((s) => s.slug === slug) || null;
  },
  saveSolution: actions.saveSolutionAction,

  // Products
  getProductCategories: actions.getProductCategoriesAction,
  getProducts: actions.getProductsAction,
  getProductBySlug: async (slug: string) => {
    const list = await actions.getProductsAction();
    return list.find((p) => p.slug === slug) || null;
  },
  saveProduct: actions.saveProductAction,

  // Packages
  getPackages: actions.getPackagesAction,
  getPackageBySlug: async (slug: string) => {
    const list = await actions.getPackagesAction();
    return list.find((p) => p.slug === slug) || null;
  },
  savePackage: actions.savePackageAction,

  // Projects
  getProjects: actions.getProjectsAction,
  getProjectBySlug: async (slug: string) => {
    const list = await actions.getProjectsAction();
    return list.find((p) => p.slug === slug) || null;
  },
  saveProject: actions.saveProjectAction,

  // Testimonials & FAQs
  getTestimonials: actions.getTestimonialsAction,
  saveTestimonial: actions.saveTestimonialAction,
  getFAQs: actions.getFaqsAction,
  saveFAQ: actions.saveFaqAction,

  // Blog
  getBlogPosts: actions.getBlogPostsAction,
  getBlogPostBySlug: async (slug: string) => {
    const list = await actions.getBlogPostsAction();
    return list.find((b) => b.slug === slug) || null;
  },
  saveBlogPost: actions.saveBlogPostAction,

  // Subsidy & Financing
  getSubsidy: actions.getSubsidyAction,
  saveSubsidy: actions.saveSubsidyAction,
  getFinancing: actions.getFinancingAction,

  // Calculator
  getCalculatorSettings: actions.getCalculatorSettingsAction,
  saveCalculatorSettings: actions.saveCalculatorSettingsAction,
  getCalculatorSlabs: actions.getCalculatorSlabsAction,
  calculateSolar,

  // Enquiries
  submitEnquiry: actions.submitEnquiryAction,
  getEnquiries: actions.getEnquiriesAction,
  updateEnquiryStatus: actions.updateEnquiryStatusAction,
  deleteEnquiry: actions.deleteEnquiryAction,
};
