import React, { useState } from 'react';
import { Blog } from '../types';
import { Search, Calendar, User, Clock, ArrowRight, Sparkles, X, ChevronLeft } from 'lucide-react';

interface BlogProps {
  blogs: Blog[];
}

export const BlogComponent: React.FC<BlogProps> = ({ blogs }) => {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'SEO', 'Web Development', 'PPC / Ads', 'Social Media'];

  const filteredBlogs = blogs.filter((b) => {
    const matchesCat = categoryFilter === 'All' || b.category === categoryFilter;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-[#F8FAFC] text-slate-800 min-h-screen py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF9933]/15 border border-[#FF9933]/30 text-[#FF9933] text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-[#FF9933]" />
          <span>SEO & Digital Marketing Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#1A237E] tracking-tight">
          Bharat SEO Growth Blog
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Actionable guides on search engine optimization, modern web engineering, Meta & Google Ads performance, and digital business expansion in India.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                categoryFilter === cat
                  ? 'bg-[#1A237E] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-full pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF9933]"
          />
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredBlogs.map((b) => (
          <div
            key={b.id}
            className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition group"
          >
            <div>
              <div className="relative h-48 overflow-hidden">
                <img src={b.image} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-[#1A237E] text-[#FF9933] text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                  {b.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#FF9933]" />
                    {b.created_at}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#FF9933]" />
                    {b.read_time}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-[#1A237E] group-hover:text-[#FF9933] transition line-clamp-2">
                  {b.title}
                </h2>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {b.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => setSelectedBlog(b)}
                className="w-full py-2.5 rounded-full bg-slate-100 hover:bg-[#1A237E] hover:text-white text-[#1A237E] font-bold text-xs transition flex items-center justify-center gap-2"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Blog Reader Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200/80 rounded-2xl max-w-3xl w-full p-6 sm:p-10 space-y-6 my-8 shadow-xl relative animate-fadeIn max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={() => setSelectedBlog(null)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF9933] hover:underline mb-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to all articles</span>
            </button>

            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full bg-[#FF9933]/15 text-[#FF9933] text-xs font-bold">
                {selectedBlog.category}
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-[#1A237E]">{selectedBlog.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-4 border-b border-slate-100">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#FF9933]" />
                  {selectedBlog.author}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#FF9933]" />
                  {selectedBlog.created_at}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#FF9933]" />
                  {selectedBlog.read_time}
                </span>
              </div>
            </div>

            <img
              src={selectedBlog.image}
              alt={selectedBlog.title}
              className="w-full h-64 sm:h-80 object-cover rounded-xl border border-slate-200"
            />

            <div className="prose max-w-none text-slate-700 text-sm leading-relaxed whitespace-pre-line">
              {selectedBlog.content}
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
              <span className="text-xs text-slate-500">Written by {selectedBlog.author}</span>
              <button
                onClick={() => setSelectedBlog(null)}
                className="px-5 py-2 bg-[#1A237E] hover:bg-blue-900 text-white font-bold text-xs rounded-full"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
