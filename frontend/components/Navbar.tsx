"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isLogged, setIsLogged] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    setIsLogged(!!localStorage.getItem('token'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/courses?q=${encodeURIComponent(search.trim())}`);
    } else {
      router.push(`/courses`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-nav-snow py-4 px-6 sm:px-10 transition-all">
       <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group shrink-0" title="SkillNet — making brains cooler since today ❄️">
             <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform bg-gradient-to-tr from-blue-600 to-sky-400">
               <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
             </div>
             <span className="font-extrabold text-2xl tracking-tight text-slate-800 hidden sm:block">Skill<span className="text-blue-500">Net</span></span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-lg mx-8">
             <form onSubmit={handleSearch} className="w-full relative group">
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search courses..." 
                  className="w-full bg-slate-100/80 border border-slate-200 rounded-full py-2.5 px-4 pl-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-semibold text-slate-700 placeholder:text-slate-400 shadow-inner"
                />
                <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
             </form>
          </div>

          <div className="hidden lg:flex items-center gap-6 font-bold text-[15px] text-slate-600 mr-6">
             <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
             <Link href="/courses" className="hover:text-blue-500 transition-colors">Courses</Link>
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
