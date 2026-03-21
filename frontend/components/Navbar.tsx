"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(!!localStorage.getItem('token'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-nav-snow py-4 px-6 sm:px-10 transition-all">
       <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group" title="SkillNet — making brains cooler since today ❄️">
             <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform bg-gradient-to-tr from-blue-600 to-sky-400">
               <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
             </div>
             <span className="font-extrabold text-2xl tracking-tight text-slate-800">Skill<span className="text-blue-500">Net</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-8 font-bold text-[15px] text-slate-600">
             <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
             <Link href="/discover" className="hover:text-blue-500 transition-colors">Discover</Link>
             <Link href="/discover" className="hover:text-blue-500 transition-colors">Paths</Link>
             <Link href="/discover" className="hover:text-blue-500 transition-colors">Community</Link>
          </div>

          <div className="flex items-center gap-3 font-bold">
             {isLogged ? (
               <button onClick={handleLogout} className="text-slate-600 hover:text-blue-500 px-3 py-2 transition-colors">Sign out</button>
             ) : (
               <Link href="/signup" className="bg-slate-900 border border-slate-700 text-white px-5 py-2.5 rounded-xl hover:bg-slate-800 hover:shadow-lg shadow-slate-900/20 transition-all font-bold">
                 Sign Up
               </Link>
             )}
          </div>
       </div>
    </nav>
  );
}
