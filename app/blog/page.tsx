'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Search
} from 'lucide-react';
import { SolarService } from '@/lib/services/solar-service';
import { BlogPost } from '@/lib/types';
import { INITIAL_BLOG_POSTS } from '@/lib/data/initial-data';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    SolarService.getBlogPosts().then(setPosts);
  }, []);

  const categories = ['All', 'Government Subsidy', 'Technology & Guides', 'Solar Engineering'];

  const filteredPosts = posts.filter((post) => {
    const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold text-solar-600 bg-solar-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Knowledge Hub
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Solar Energy Guides, Policy News & Technical Insights
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Stay informed on national rooftop solar subsidies, net metering regulations, solar panel technology comparisons, and maintenance best practices.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-slate-200 pb-4">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-solar-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search solar guides..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500 bg-white"
            />
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-3 text-xs text-slate-400">
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {post.read_time}
                    </span>
                    <span>•</span>
                    <span>{post.published_at}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-solar-600 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100">
                <span className="text-xs text-slate-500 font-medium flex items-center">
                  <User className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  {post.author}
                </span>
                <span className="text-xs font-bold text-solar-600 flex items-center group-hover:translate-x-1 transition-transform">
                  Read <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
