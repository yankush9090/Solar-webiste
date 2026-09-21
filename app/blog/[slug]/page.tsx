'use client';

import React, { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Share2,
  Tag,
  MessageCircle,
  Calculator
} from 'lucide-react';
import { SolarService } from '@/lib/services/solar-service';
import { BlogPost } from '@/lib/types';
import { INITIAL_BLOG_POSTS } from '@/lib/data/initial-data';

export default function BlogPostDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SolarService.getBlogPostBySlug(slug).then((res) => {
      setPost(res);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-solar-500 border-t-transparent rounded-full mx-auto" />
        <p className="text-slate-500 text-sm mt-4">Loading article...</p>
      </div>
    );
  }

  if (!post) {
    return notFound();
  }

  return (
    <div className="space-y-12 py-12">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-xs font-semibold text-solar-600 hover:text-solar-700"
        >
          ← Back to All Guides
        </Link>

        {/* Title Header */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-xs text-slate-500">
            <span className="px-2.5 py-1 bg-solar-50 text-solar-700 font-bold rounded-lg uppercase tracking-wider">
              {post.category}
            </span>
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
              {post.read_time}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
              {post.published_at}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            {post.excerpt}
          </p>

          <div className="flex items-center space-x-3 pt-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-800">Written by {post.author}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden border border-slate-200">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-80 sm:h-96 object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-6">
          {post.content.split('\n\n').map((block, idx) => {
            if (block.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-xl sm:text-2xl font-black text-slate-900 pt-4">
                  {block.replace('### ', '')}
                </h3>
              );
            }
            if (block.startsWith('- ')) {
              const items = block.split('\n').map((item) => item.replace('- ', ''));
              return (
                <ul key={idx} className="space-y-2 list-disc pl-5">
                  {items.map((it, i) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>
              );
            }
            return <p key={idx}>{block}</p>;
          })}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="pt-6 border-t border-slate-200 flex flex-wrap gap-2 items-center">
            <Tag className="w-4 h-4 text-slate-400 mr-2" />
            {post.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Bottom CTA Box */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-4 text-center">
          <h3 className="text-2xl font-black">Want to see how much you can save with solar?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Use our interactive solar calculator to estimate your system size, PM Surya Ghar subsidy, and exact payback period.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link
              href="/solar-calculator"
              className="px-6 py-3 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl transition-all"
            >
              Calculate My Savings
            </Link>
            <a
              href="https://wa.me/917849067305?text=Hello%2C%20I%20read%20your%20solar%20guide%20and%20have%20a%20question."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all flex items-center"
            >
              <MessageCircle className="w-4 h-4 mr-1.5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
