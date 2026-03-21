"use client";
import React, { useEffect, useState } from 'react';
import HeroSnow from '../components/HeroSnow';
import CourseGrid from '../components/CourseGrid';
import { Course } from '../components/CourseCard';

import { courses as centralCourses } from '../data/courses';

export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"All" | "Beginner" | "Intermediate" | "Advanced">("All");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (filter === "All") {
        setCourses(centralCourses);
      } else {
        setCourses(centralCourses.filter(c => c.level === filter));
      }
      setLoading(false);
    }, 400);
  }, [filter]);

  return (
    <div className="w-full pb-32 bg-slate-50 min-h-screen font-sans relative">
      <HeroSnow />

      {/* Decorative backdrop blobs */}
      <div className="absolute top-[80vh] left-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -z-10 mix-blend-multiply"></div>
      <div className="absolute top-[120vh] right-0 w-[500px] h-[500px] bg-sky-100/40 rounded-full blur-3xl -z-10 mix-blend-multiply"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 mt-32 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-3">Trending Paths</h2>
            <p className="text-slate-500 text-lg font-medium">Join thousands of curious minds scaling these highly rated courses.</p>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-[20px] shadow-inner border border-slate-200 overflow-x-auto w-full md:w-auto hide-scrollbar">
             {["All", "Beginner", "Intermediate", "Advanced"].map((f) => (
                <button 
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={`px-5 py-3 rounded-2xl text-sm font-black transition-all whitespace-nowrap ${filter === f ? 'bg-white text-blue-600 shadow-md ring-1 ring-slate-200/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
                >
                  {f === "All" ? "All Paths" : f}
                </button>
             ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-16 h-16 border-4 border-sky-100 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : courses.length > 0 ? (
          <CourseGrid courses={courses.slice(0, 8)} />
        ) : (
          <div className="py-20 text-center text-slate-500 bg-white rounded-3xl border border-slate-200/60 shadow-sm">
             <h3 className="text-xl font-bold mb-2">No active courses in this tier.</h3>
          </div>
        )}
      </div>

      <div className="max-w-5xl mx-auto mt-40 glass-card rounded-[40px] p-12 text-center relative overflow-hidden ring-1 ring-white shadow-2xl shadow-blue-900/5 hover:-translate-y-2 transition-transform duration-500">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-sky-300 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-400 rounded-full blur-3xl opacity-30"></div>
        <h2 className="text-4xl font-black text-slate-800 mb-6 relative z-10">Ready to break the ice?</h2>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 font-medium relative z-10">
          Create your free account today and unlock a wonderland of knowledge with our dedicated AI Mentors guiding you at every step.
        </p>
        <button className="relative z-10 bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-600/30 transition-all hover:scale-105 active:scale-95">
          Join SkillNet Community
        </button>
      </div>
    </div>
  );
}