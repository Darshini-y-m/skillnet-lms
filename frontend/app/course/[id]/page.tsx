"use client";
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { courses } from '../../../data/courses';

export default function CourseDetail() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  
  const idParam = Array.isArray(params.id) ? params.id[0] : params.id;
  const course = courses.find(c => c.id === idParam);

  if (!course) return <div className="p-20 text-center font-bold text-slate-500">Course not found</div>;

  const handleBuy = () => {
    localStorage.setItem(`purchased_${course.id}`, "true");
    router.push(`/learn/${course.id}`);
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-20 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-[40px] p-8 md:p-14 shadow-2xl border border-slate-200 relative overflow-hidden">
        
        {/* Soft decorative background gradient */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 mix-blend-multiply pointer-events-none"></div>

        <div className="relative z-10">
           <div className="flex gap-3 mb-8">
             <span className="px-5 py-2 bg-blue-100 text-blue-700 font-black rounded-full text-sm border border-blue-200 shadow-sm">{course.level}</span>
             <span className="px-5 py-2 bg-slate-100 text-slate-700 font-bold rounded-full text-sm border border-slate-200 shadow-sm">{course.category}</span>
           </div>
           
           <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">{course.title}</h1>
           <p className="text-xl md:text-2xl text-slate-500 mb-12 leading-relaxed font-medium">{course.description}</p>
           
           <div className="flex items-center gap-5 mb-12 pb-12 border-b border-slate-200">
             <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-sky-400 rounded-full flex items-center justify-center text-white font-black text-2xl shadow-lg ring-4 ring-blue-50">
               {course.instructor.charAt(0)}
             </div>
             <div>
               <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Instructor</p>
               <p className="text-2xl font-black text-slate-800">{course.instructor}</p>
             </div>
           </div>

           <div className="flex flex-col md:flex-row items-center justify-between bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-200 shadow-inner">
             <div className="mb-6 md:mb-0 text-center md:text-left">
               <p className="text-sm font-black text-slate-500 uppercase tracking-widest mb-2">Lifetime Access</p>
               <p className="text-5xl md:text-6xl font-black text-slate-900 flex items-center gap-2">
                 {course.price === 0 ? <span className="text-emerald-500">Free</span> : `₹${course.price}`}
               </p>
             </div>
             <button 
               onClick={handleBuy} 
               className="px-12 py-6 bg-blue-600 hover:bg-blue-700 text-white font-black text-2xl rounded-2xl shadow-2xl shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 w-full md:w-auto flex items-center justify-center gap-3"
             >
               Buy Course
               <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}