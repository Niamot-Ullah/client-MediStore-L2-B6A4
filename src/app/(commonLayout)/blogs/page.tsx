"use client";

import React, { useState } from 'react';
import { ArrowUpRight, Search, Filter } from 'lucide-react';

const BLOGS = [
  { id: 1, category: "Cardiology", title: "Heart Health: Small Changes, Big Impact", author: "Dr. Sarah Mitchell", date: "Jan 15, 2026", readTime: "5 min", image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?q=80&w=800" },
  { id: 2, category: "Pharmacy", title: "Generic vs. Brand Name: What's the Real Difference?", author: "Mark Johnson", date: "Jan 12, 2026", readTime: "4 min", image: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=800" },
  { id: 3, category: "Immunity", title: "Boosting Your Immune System for the Winter Season", author: "Dr. Amy Chen", date: "Jan 10, 2026", readTime: "6 min", image: "https://images.unsplash.com/photo-1616671285442-ba637659524e?q=80&w=800" },
  { id: 4, category: "Mental Health", title: "The Connection Between Gut Health and Anxiety", author: "Dr. Leo Carter", date: "Jan 08, 2026", readTime: "7 min", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800" },
  { id: 5, category: "Skincare", title: "Sunscreen in Winter: Why You Still Need It", author: "Emma Davis", date: "Jan 05, 2026", readTime: "3 min", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800" },
  { id: 6, category: "Nutrition", title: "Superfoods to Help Lower Your Blood Pressure", author: "Dr. Sarah Mitchell", date: "Jan 03, 2026", readTime: "5 min", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800" },
  { id: 7, category: "Fitness", title: "How 15 Minutes of Walking Changes Your Brain", author: "Mark Johnson", date: "Jan 01, 2026", readTime: "4 min", image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=800" },
  { id: 8, category: "First Aid", title: "The Essential Home First Aid Kit Checklist", author: "Dr. Amy Chen", date: "Dec 28, 2025", readTime: "8 min", image: "https://images.unsplash.com/photo-1603398938378-e54eab446ddd?q=80&w=800" },
  { id: 9, category: "Sleep", title: "The Science of Sleep: Why Rest is Your Best Medicine", author: "Dr. Leo Carter", date: "Dec 25, 2025", readTime: "6 min", image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=800" },
  { id: 10, category: "Tech", title: "Telemedicine: How Digital Health is Changing Lives", author: "Emma Davis", date: "Dec 20, 2025", readTime: "5 min", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800" },
];

export default function BlogPage() {
  const [search, setSearch] = useState("");

  return (
    <main className="bg-[#FAF9F6] dark:invert-0  min-h-screen font-sans text-slate-900">
      {/* Editorial Header */}
      <header className="max-w-7xl mx-auto px-6 pt-24 pb-16 border-b border-slate-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-8xl font-light tracking-tighter mb-6">
              THE <span className="italic font-serif text-blue-600">JOURNAL</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed font-light">
              Deep dives into medical science, wellness strategies, and the future of healthcare.
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="Search topics..." 
              className="w-full bg-transparent border-b border-slate-400 py-2 focus:border-blue-600 outline-none transition-all placeholder:text-slate-400"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute right-0 top-2 text-slate-400" size={18} />
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {BLOGS.filter(b => b.title.toLowerCase().includes(search.toLowerCase())).map((blog, idx) => (
            <article key={blog.id} className={`group flex flex-col ${idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}>
              {/* Image Container */}
              <div className="relative aspect-[16/10]  overflow-hidden mb-6 bg-slate-200">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="object-cover w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute top-4 left-4">
                   <span className="bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                     {blog.category}
                   </span>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h2 className={`${idx === 0 ? 'text-4xl' : 'text-2xl'} font-medium leading-tight group-hover:text-blue-700 transition-colors`}>
                    {blog.title}
                  </h2>
                  <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" size={24} />
                </div>
                
                <p className="text-slate-400 text-sm mb-6 flex items-center gap-4">
                  <span>{blog.date}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span>{blog.readTime}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span className="text-slate-600 italic">By {blog.author}</span>
                </p>

                <div className="h-px w-full bg-slate-200 group-hover:bg-blue-200 transition-colors"></div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modern Footer CTA */}
      <section className="bg-slate-900 py-32 mt-20 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-light mb-8 tracking-tighter">
            Join 50k+ readers <br/><span className="italic font-serif">Stay Healthy</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-0 max-w-lg mx-auto border border-slate-700 rounded-full overflow-hidden">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-transparent px-8 py-5 text-lg flex-grow outline-none focus:bg-slate-800 transition-all"
            />
            <button className="bg-blue-600 px-10 py-5 font-bold hover:bg-white hover:text-blue-600 transition-all uppercase text-sm tracking-widest">
              Join
            </button>
          </div>
        </div>
        {/* Abstract background element */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
      </section>
    </main>
  );
}