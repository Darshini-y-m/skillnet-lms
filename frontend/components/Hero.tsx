"use client";
import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="hero-gradient text-white py-20 px-6 sm:px-10 overflow-hidden relative">
      {/* Decorative background circle */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white opacity-5 blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
        <div className="md:w-3/5 space-y-8">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Skills for your present and your <span className="text-gradient">future</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl leading-relaxed">
            Get started with us today. Over 5,000 experts are here to help you build the practical skills you need to achieve your professional goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/courses" className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-transform text-center">
              Browse Courses
            </Link>
            <Link href="/signup" className="bg-transparent border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold transition text-center">
              Sign Up Free
            </Link>
          </div>
        </div>
        
        <div className="md:w-2/5 hidden md:block">
          {/* Abstract heroic visual instead of raw image */}
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
            <div className="absolute inset-0 top-20 left-20 bg-green-400 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute inset-0 -bottom-8 left-20 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4000"></div>
            <div className="relative w-full h-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col items-center justify-center p-8 text-center rotate-3 hover:rotate-0 transition-transform duration-500">
               <svg className="w-32 h-32 text-blue-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
               </svg>
               <h3 className="text-2xl font-bold mb-2">Start Learning</h3>
               <p className="text-blue-100 text-sm">Join millions of learners across the globe.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
