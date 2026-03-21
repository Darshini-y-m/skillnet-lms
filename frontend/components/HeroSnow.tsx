"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SnowMascot from './SnowMascot';

export default function HeroSnow() {
  const [particles, setParticles] = useState<{x: number, delay: number, size: number, duration: number}[]>([]);

  useEffect(() => {
    // Generate snow particles dynamically for the client side
    const flakes = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * 100, // percentage
      delay: Math.random() * 5, // seconds
      size: Math.random() * 6 + 2, // px
      duration: Math.random() * 8 + 8 // seconds
    }));
    setParticles(flakes);
  }, []);

  return (
    <div className="hero-snow-bg text-white relative min-h-[90vh] flex flex-col items-center justify-center px-6 rounded-b-[48px] lg:rounded-b-[80px] shadow-2xl overflow-hidden mt-[-72px] pt-[72px]">
      
      {/* Animated Aurora Light */}
      <div className="hero-aurora"></div>

      {/* Snow Particles */}
      <div className="absolute inset-0 pointer-events-none">
         {particles.map((p, i) => (
           <div 
             key={i} 
             className="snow-particle" 
             style={{ 
               left: `${p.x}%`, 
               top: `-10%`,
               width: `${p.size}px`, 
               height: `${p.size}px`,
               animationDelay: `${p.delay}s`,
               animationDuration: `${p.duration}s`
             }} 
           />
         ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12 mt-12 lg:mt-0">
         
         <div className="lg:w-3/5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-sky-100 text-sm font-bold mb-6 hover:bg-white/20 transition-colors shadow-lg cursor-default">
               <span className="relative flex h-2.5 w-2.5">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-200"></span>
               </span>
               SkillNet Winter Access Now Open
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6 text-white drop-shadow-md">
               Let's Turn Curiosity Into <span className="text-sky-300 hover-glow transition-all duration-300 cursor-default">Superpowers</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 font-medium max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
               SkillNet helps you build amazing skills one snowy step at a time. Put on your boots and let's go!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
               <Link href="/discover" className="bg-white text-blue-600 hover:text-blue-700 hover:bg-slate-50 px-8 py-4.5 rounded-2xl font-black shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-all hover:-translate-y-1 w-full sm:w-auto text-center text-lg">
                  Explore Cool Courses
               </Link>
               <Link href="/signup" className="bg-blue-600/30 backdrop-blur-lg hover:bg-blue-600/50 border border-blue-400/50 text-white px-8 py-4.5 rounded-2xl font-bold transition-all w-full sm:w-auto text-center text-lg shadow-xl shadow-blue-900/20">
                  Start My Adventure
               </Link>
            </div>
         </div>

         {/* Mascot Container */}
         <div className="lg:w-2/5 flex justify-center lg:justify-end items-end h-[300px] sm:h-[400px]">
            <SnowMascot />
         </div>

      </div>

      {/* Floating Stat Cards positioned to overlap the bottom edge */}
      <div className="absolute -bottom-16 left-0 right-0 max-w-[1200px] mx-auto px-6 z-20 hidden md:flex justify-between gap-6">
        {[
          { value: "12+", label: "Learning Tracks" },
          { value: "30K+", label: "Active Learners" },
          { value: "4.8", label: "Community Rating" },
          { value: "24/7", label: "AI Mentor Available" },
        ].map((stat, i) => (
           <div key={i} className="flex-1 glass-card rounded-2xl p-6 text-center transform transition-transform hover:-translate-y-2 border-t border-l border-white/60">
             <h3 className="text-3xl font-black text-blue-600 mb-1">{stat.value}</h3>
             <p className="text-slate-600 font-bold text-sm tracking-wide">{stat.label}</p>
           </div>
        ))}
      </div>
    </div>
  );
}
