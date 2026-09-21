'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Copy,
  CheckCircle2,
  Trash2,
  UploadCloud,
  ExternalLink,
  Search,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { SolarService } from '@/lib/services/solar-service';
import { MediaItem } from '@/lib/types';
import { INITIAL_MEDIA_ITEMS } from '@/lib/data/initial-data';

const CATEGORIES = [
  'All',
  'Solutions',
  'Products',
  'Projects',
  'Testimonials',
  'Blog',
  'Uploads',
  'General'
];

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaItem[]>(INITIAL_MEDIA_ITEMS);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal / Add state
  const [showAddModal, setShowAddModal] = useState(false);
  const [addMode, setAddMode] = useState<'url' | 'upload'>('upload');

  // Add via URL form
  const [newUrl, setNewUrl] = useState('');
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('General');

  // Upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load media items from database / server actions
  useEffect(() => {
    SolarService.getMediaItems()
      .then((items) => {
        if (items && items.length > 0) {
          setMedia(items);
        }
      })
      .catch((err) => console.error('Failed to load media items:', err))
      .finally(() => setLoading(false));
  }, []);

  // One-click copy
  const handleCopy = (id: string, url: string) => {
    // Determine full URL if local relative path
    const fullUrl = url.startsWith('/') && typeof window !== 'undefined'
      ? `${window.location.origin}${url}`
      : url;

    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Add via direct URL
  const handleAddUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    const item: MediaItem = {
      id: `med-${Date.now()}`,
      name: newName.trim() || 'solar-asset.jpg',
      category: newCategory,
      type: 'image/jpeg',
      size: '1.2 MB',
      url: newUrl.trim(),
      alt_text: newName.trim() || 'Solar equipment image',
      uploaded_at: new Date().toISOString().split('T')[0],
    };

    setMedia((prev) => [item, ...prev]);
    await SolarService.saveMediaItem(item);

    setNewUrl('');
    setNewName('');
    setShowAddModal(false);
  };

  // Select file for upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setUploadError('');

    // Generate local preview
    const reader = new FileReader();
    reader.onload = () => {
      setFilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Submit file upload
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadError('Please select an image file first.');
      return;
    }

    try {
      setUploading(true);
      setUploadError('');

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('category', newCategory);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Upload failed');
      }

      const newItem: MediaItem = {
        id: `upload-${Date.now()}`,
        name: data.name,
        category: newCategory || 'Uploads',
        type: data.type,
        size: data.size,
        url: data.url,
        alt_text: data.name,
        uploaded_at: data.uploaded_at,
      };

      setMedia((prev) => [newItem, ...prev]);
      await SolarService.saveMediaItem(newItem);

      // Reset
      setSelectedFile(null);
      setFilePreview(null);
      setShowAddModal(false);
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload image.');
    } finally {
      setUploading(false);
    }
  };

  // Delete media item
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove "${name}" from the media library?`)) return;
    setMedia((prev) => prev.filter((m) => m.id !== id));
    await SolarService.deleteMediaItem(id);
  };

  // Filtered media items
  const filteredMedia = media.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      item.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-solar-50 text-solar-600 rounded-xl">
              <ImageIcon className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Media & Asset Library
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse all {media.length} website pictures, copy their direct URLs with 1-click, or upload new assets.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-solar-600 to-solar-700 hover:from-solar-700 hover:to-solar-800 text-white rounded-xl text-xs font-bold shadow-md shadow-solar-500/20 hover:shadow-lg transition-all"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Add / Upload Picture
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title or URL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500 shadow-sm"
          />
        </div>
      </div>

      {/* Grid of Media Assets */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 text-xs">
          Loading media library...
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 space-y-2">
          <ImageIcon className="w-10 h-10 mx-auto text-slate-300" />
          <p className="text-sm font-bold">No images match your search</p>
          <p className="text-xs">Try selecting a different category or clearing the search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredMedia.map((item) => {
            const isCopied = copiedId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Image Container with Hover overlay */}
                <div className="relative h-44 bg-slate-100 overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.alt_text || item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Category Pill Tag */}
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold shadow">
                    {item.category || 'General'}
                  </span>

                  {/* Open in new tab icon */}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-950/70 hover:bg-slate-950 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    title="View full resolution"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Details Section */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 line-clamp-1" title={item.name}>
                      {item.name}
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {item.size || '1.0 MB'} • {item.uploaded_at}
                    </p>
                  </div>

                  {/* Direct URL Display Box */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      Direct Image URL
                    </label>
                    <div className="flex items-center rounded-lg bg-slate-50 border border-slate-200 p-1">
                      <input
                        type="text"
                        readOnly
                        value={item.url}
                        onFocus={(e) => e.target.select()}
                        className="w-full bg-transparent px-1.5 text-[11px] font-mono text-slate-600 focus:outline-none select-all truncate"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => handleCopy(item.id, item.url)}
                      className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        isCopied
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                          : 'bg-solar-50 hover:bg-solar-100 text-solar-700 border border-solar-200'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 mr-1" /> Copy URL
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(item.id, item.name)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Upload Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-5">
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight">
                  Add Picture to Media Library
                </h2>
                <p className="text-xs text-slate-500">
                  Choose to upload a picture from your computer or paste an external image URL.
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setAddMode('upload')}
                className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                  addMode === 'upload'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UploadCloud className="w-4 h-4 text-solar-600" />
                <span>Upload from Device</span>
              </button>
              <button
                type="button"
                onClick={() => setAddMode('url')}
                className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                  addMode === 'url'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Add via Image URL</span>
              </button>
            </div>

            {/* Form: Upload from Device */}
            {addMode === 'upload' && (
              <form onSubmit={handleUploadSubmit} className="space-y-4">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-solar-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-solar-50/20 space-y-2"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />

                  {filePreview ? (
                    <div className="space-y-2">
                      <img
                        src={filePreview}
                        alt="Preview"
                        className="w-36 h-28 object-cover rounded-xl mx-auto shadow-md border"
                      />
                      <p className="text-xs font-bold text-slate-900">{selectedFile?.name}</p>
                      <p className="text-[10px] text-solar-600 font-semibold">Click to change picture</p>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="w-10 h-10 text-solar-600 mx-auto" />
                      <p className="text-xs font-bold text-slate-800">
                        Click here to select an image from your device
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Supports PNG, JPG, JPEG, WEBP, SVG (Max 15MB)
                      </p>
                    </>
                  )}
                </div>

                {uploadError && (
                  <p className="text-xs font-semibold text-red-600 flex items-center">
                    <AlertCircle className="w-3.5 h-3.5 mr-1" /> {uploadError}
                  </p>
                )}

                {/* Category Selection */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Assign Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500"
                  >
                    {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading || !selectedFile}
                    className="px-5 py-2 bg-solar-600 hover:bg-solar-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow transition-all flex items-center"
                  >
                    {uploading ? 'Uploading Picture...' : 'Upload Picture'}
                  </button>
                </div>
              </form>
            )}

            {/* Form: Add via Direct Image URL */}
            {addMode === 'url' && (
              <form onSubmit={handleAddUrl} className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Image Title / Label
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 5kW Solar Rooftop Project"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Direct Public Image URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/... or https://..."
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Assign Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500"
                    >
                      {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Live preview */}
                  {newUrl.trim().startsWith('http') && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center space-x-3">
                      <img
                        src={newUrl}
                        alt="Preview"
                        className="w-14 h-14 object-cover rounded-lg border bg-white"
                        onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                      />
                      <div className="text-xs">
                        <p className="font-bold text-slate-800">Live URL Preview</p>
                        <p className="text-[10px] text-slate-400 truncate max-w-xs">{newUrl}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-solar-600 hover:bg-solar-700 text-white text-xs font-bold rounded-xl shadow transition-all"
                  >
                    Add Image URL
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
