"use client";
import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="hero-bg text-white relative overflow-hidden flex flex-col items-center justify-center min-h-[85vh] px-6">
      
      {/* Decorative Floating Shapes */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl floating-shape"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl floating-shape-delayed"></div>
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTU5LjUzMyAwSDYwdjYwSDBWMGg1OS41MzN6TTI5LjUzMyA1OXYxSDFWMWh2NTguNTMzaDI4LjUzM3oiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] opacity-20 hidden md:block"></div>

      <div className="relative z-10 text-center max-w-4xl space-y-8 mt-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-indigo-200 text-sm font-medium mb-4">
           <span className="relative flex h-2 w-2">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
           </span>
           NeuroLearn AI Engine v2.0 Live
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
           Upgrade Your <span className="text-gradient">Brain</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-300 font-light max-w-2xl mx-auto">
           AI-assisted courses designed to make learning faster, adaptive, and highly intuitive. Future-proof your career today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-6">
           <Link href="/explore" className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-full font-bold shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] transition-all w-full sm:w-auto text-center border border-indigo-500">
              Explore Courses
           </Link>
           <Link href="/signup" className="bg-slate-800/80 backdrop-blur-md hover:bg-slate-700 border border-white/10 text-white px-8 py-4 rounded-full font-bold transition-all w-full sm:w-auto text-center">
              Start Learning
           </Link>
        </div>
      </div>

      {/* Stats Bar positioned at the bottom */}
      <div className="absolute bottom-10 left-0 right-0 max-w-6xl mx-auto px-6 hidden lg:block">
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex justify-between divide-x divide-white/10">
          <div className="text-center px-8 w-1/4">
            <h3 className="text-3xl font-black text-indigo-400">10+</h3>
            <p className="text-slate-400 text-sm mt-1">Master Courses</p>
          </div>
          <div className="text-center px-8 w-1/4">
             <h3 className="text-3xl font-black text-emerald-400">25K+</h3>
             <p className="text-slate-400 text-sm mt-1">Active Learners</p>
          </div>
          <div className="text-center px-8 w-1/4">
             <h3 className="text-3xl font-black text-white">95%</h3>
             <p className="text-slate-400 text-sm mt-1">Completion Rate</p>
          </div>
          <div className="text-center px-8 w-1/4 flex flex-col items-center justify-center">
             <div className="flex items-center gap-2 text-indigo-300 font-bold">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
               AI Tutor
             </div>
             <p className="text-slate-400 text-sm mt-1">24/7 Available</p>
          </div>
        </div>
      </div>
    </div>
  );
}
