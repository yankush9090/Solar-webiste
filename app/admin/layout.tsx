'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sun,
  LayoutDashboard,
  Inbox,
  Settings,
  Calculator,
  Layers,
  ShoppingBag,
  Package,
  FolderGit2,
  FileText,
  HelpCircle,
  MessageSquare,
  Award,
  Image as ImageIcon,
  ExternalLink,
  LogOut,
  Menu,
  X
} from 'lucide-react';

import { SolarService } from '@/lib/services/solar-service';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [dbConnected, setDbConnected] = useState<boolean | null>(null);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setAuthorized(true);
      return;
    }
    const isAuth = typeof window !== 'undefined' && sessionStorage.getItem('solaris_admin_authenticated') === 'true';
    if (!isAuth) {
      router.replace('/admin/login');
    } else {
      setAuthorized(true);
      SolarService.getDbStatus().then((st) => setDbConnected(st?.connected ?? false)).catch(() => setDbConnected(false));
    }
  }, [pathname, router]);

  // If on login page, render children without sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Prevent flash of protected admin content while verifying auth
  if (!authorized) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm">
        Checking admin access...
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Enquiries Inbox', href: '/admin/enquiries', icon: Inbox },
    { name: 'Website Settings', href: '/admin/settings', icon: Settings },
    { name: 'Calculator Settings', href: '/admin/calculator', icon: Calculator },
    { name: 'Solar Solutions', href: '/admin/solutions', icon: Layers },
    { name: 'Hardware Products', href: '/admin/products', icon: ShoppingBag },
    { name: 'Turnkey Packages', href: '/admin/packages', icon: Package },
    { name: 'Projects Portfolio', href: '/admin/projects', icon: FolderGit2 },
    { name: 'Blog & Articles', href: '/admin/blog', icon: FileText },
    { name: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
    { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
    { name: 'Subsidy Scheme', href: '/admin/subsidy', icon: Award },
    { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
  ];

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('solaris_admin_authenticated');
      sessionStorage.removeItem('solaris_admin_email');
    }
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-900">
      {/* Mobile Header Bar */}
      <div className="md:hidden bg-slate-950 text-white p-4 flex items-center justify-between sticky top-0 z-30">
        <Link href="/admin" className="flex items-center space-x-2">
          <div className="bg-white px-2 py-0.5 rounded-lg flex items-center">
            <img src="/images/logo.png" alt="Maati Energy" className="h-6 w-auto object-contain" />
          </div>
          <span className="font-black text-sm tracking-tight">ADMIN PANEL</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1 text-slate-300 hover:text-white"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop & Mobile Drawer Sidebar */}
      <aside
        className={`w-64 bg-slate-950 text-slate-300 flex-shrink-0 flex flex-col justify-between p-4 z-40 transition-all ${
          mobileOpen
            ? 'fixed inset-y-0 left-0 shadow-2xl block'
            : 'hidden md:flex sticky top-0 h-screen'
        }`}
      >
        <div className="space-y-6 overflow-y-auto">
          {/* Brand */}
          <div className="px-2 pt-2">
            <div className="bg-white p-2 rounded-2xl flex items-center justify-center shadow-md mb-2">
              <img
                src="/images/logo.png"
                alt="Maati Energy"
                className="h-9 w-auto object-contain"
              />
            </div>
            <div className="px-1">
              <p className="text-[10px] text-solar-400 font-bold tracking-widest uppercase">
                CMS Admin Panel
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-solar-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2.5 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions & Database Status */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <Link
            href="/admin/settings"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-medium bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors"
            title="Database Connection Status"
          >
            <span className="text-slate-400">Database</span>
            {dbConnected === null ? (
              <span className="text-slate-500 text-[10px]">Checking...</span>
            ) : dbConnected ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1 text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Cloud DB
              </span>
            ) : (
              <span className="text-amber-400 font-bold flex items-center gap-1 text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                Not Connected
              </span>
            )}
          </Link>

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <span className="flex items-center">
              <ExternalLink className="w-4 h-4 mr-2 text-solar-400" />
              Public Website
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
