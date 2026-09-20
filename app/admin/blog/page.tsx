'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Plus, Edit3 } from 'lucide-react';
import { SolarService } from '@/lib/services/solar-service';
import { BlogPost } from '@/lib/types';
import { INITIAL_BLOG_POSTS } from '@/lib/data/initial-data';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    SolarService.getBlogPosts().then(setPosts);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const updated = await SolarService.saveBlogPost(editing);
    setPosts(updated);
    setModalOpen(false);
    setEditing(null);
  };

  const handleAddNew = () => {
    setEditing({
      id: `blog-${Date.now()}`,
      title: 'New Solar Guide Article',
      slug: 'new-solar-guide-article',
      excerpt: 'Brief overview of this solar guide.',
      content: 'Write your comprehensive article content here. Use ### for subheadings and - for bullet points.',
      featured_image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
      author: 'Solaris Energy Research Team',
      category: 'Solar Guide',
      tags: ['Solar', 'Rooftop', 'Savings'],
      read_time: '5 min read',
      published_at: new Date().toISOString().split('T')[0],
      status: 'PUBLISHED',
    });
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Blog & Solar Knowledge Hub Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Publish educational guides, PM Surya Ghar updates, and technical insights.
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-solar-600 hover:bg-solar-700 text-white rounded-xl text-xs font-bold shadow flex items-center"
        >
          <Plus className="w-4 h-4 mr-1.5" /> New Article
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Article Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Author</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {posts.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900 max-w-sm truncate">{b.title}</td>
                <td className="py-3 px-4 text-slate-600">{b.category}</td>
                <td className="py-3 px-4 text-slate-500">{b.author}</td>
                <td className="py-3 px-4 text-slate-400">{b.published_at}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">
                    {b.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => {
                      setEditing(b);
                      setModalOpen(true);
                    }}
                    className="p-1.5 text-solar-700 hover:bg-solar-50 rounded-lg"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && editing && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-black text-slate-900">Edit Solar Article</h3>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={editing.category}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Author</label>
                  <input
                    type="text"
                    required
                    value={editing.author}
                    onChange={(e) => setEditing({ ...editing, author: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Featured Image URL</label>
                <input
                  type="text"
                  value={editing.featured_image}
                  onChange={(e) => setEditing({ ...editing, featured_image: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Excerpt</label>
                <textarea
                  rows={2}
                  value={editing.excerpt}
                  onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Content</label>
                <textarea
                  rows={6}
                  value={editing.content}
                  onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl font-mono text-xs"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-solar-600 text-white rounded-xl font-bold"
                >
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
