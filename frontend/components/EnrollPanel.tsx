"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Course } from './CourseCard';

export default function EnrollPanel({ course }: { course: Course }) {
  const router = useRouter();
  const [showPayment, setShowPayment] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);

  // Check if already purchased
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const purchased = localStorage.getItem(`purchased_course_${course.id}`);
      if (purchased === "true") {
        setIsPurchased(true);
      }
    }
  }, [course.id]);

  const handleEnroll = () => {
    if (course.price === 0 || isPurchased) {
      const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
      if (!token) {
        localStorage.setItem("pending_redirect", `/learn/${course.id}`);
        router.push("/login");
      } else {
        router.push(`/learn/${course.id}`);
      }
    } else {
      setShowPayment(true);
    }
  };

  const handlePayment = () => {
    setIsEnrolling(true);
    setTimeout(() => {
      localStorage.setItem(`purchased_course_${course.id}`, "true");
      setIsPurchased(true);
      setShowPayment(false);
      setIsEnrolling(false);
      alert("🎉 Enrollment successful! Welcome to the course.");
      
      const token = localStorage.getItem("token");
      if (!token) {
        localStorage.setItem("pending_redirect", `/learn/${course.id}`);
        router.push("/login");
      } else {
        router.push(`/learn/${course.id}`);
      }
    }, 1500);
  };

  const isFree = course.price === 0;

  if (showPayment) {
    return (
      <div className="glass-card rounded-[32px] p-8 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
         <h3 className="font-black text-2xl text-slate-800 mb-2">Checkout</h3>
         <p className="text-slate-500 font-bold text-sm mb-6">Complete your purchase to unlock this track.</p>
         
         <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-6">
            <p className="text-sm font-extrabold text-slate-400 uppercase tracking-widest mb-1">Item</p>
            <p className="font-bold text-slate-800 line-clamp-1">{course.title}</p>
         </div>
         
         <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-200/60">
            <span className="font-black text-slate-500 text-lg">Total</span>
            <span className="font-black text-3xl text-blue-600">₹{course.price}</span>
         </div>
         
         <button 
           onClick={handlePayment}
           disabled={isEnrolling}
           className="w-full relative z-10 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-black py-4.5 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all active:scale-[0.98] text-lg lg:text-xl border border-emerald-400 flex justify-center items-center gap-2"
         >
           {isEnrolling ? (
              <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
           ) : (
              "Pay Now"
           )}
         </button>
         <button onClick={() => setShowPayment(false)} className="w-full mt-4 text-slate-400 hover:text-slate-600 font-bold transition-colors">
            Cancel
         </button>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-[32px] p-8 shadow-2xl relative overflow-hidden group">
       {/* Background subtle glowing orb */}
       <div className="absolute top-0 right-0 w-32 h-32 bg-blue-300 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>

       <div className="flex justify-between items-center text-slate-800 border-b border-slate-200/50 pb-6 mb-6 relative z-10">
           <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">Lifetime Access</p>
              <div className="text-5xl font-black tracking-tighter text-blue-600">
                {isFree ? "Free" : `₹${course.price}`}
              </div>
           </div>
           {!isFree && <div className="text-xl text-slate-400 font-bold line-through">₹{Math.floor(course.price * 1.5)}</div>}
       </div>
       
       <button 
         onClick={handleEnroll}
         className="w-full relative z-10 bg-gradient-to-r from-blue-500 to-sky-400 hover:from-blue-600 hover:to-sky-500 text-white font-black py-4.5 rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] text-lg lg:text-xl border border-blue-400"
       >
         {isPurchased ? "Continue Expedition" : isFree ? "Begin Expedition" : "Jump Into This Course ❄️"}
       </button>
       
       <div className="text-center text-xs font-bold text-slate-500 mt-4 mb-8 flex items-center justify-center gap-1.5 relative z-10">
         <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
         30-Day Happiness Guarantee
       </div>

       <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white relative z-10">
         <h4 className="font-extrabold text-slate-800 mb-5 text-sm uppercase tracking-wider">Your Journey Includes</h4>
         <ul className="space-y-4">
           <li className="flex gap-4 text-sm text-slate-700 font-bold items-center">
             <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
             </div>
             {course.hours || 10} hours of crisp video
           </li>
           <li className="flex gap-4 text-sm text-slate-700 font-bold items-center">
             <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 shrink-0">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
             </div>
             Downloadable resources
           </li>
           <li className="flex gap-4 text-sm text-slate-700 font-bold items-center">
             <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
             </div>
             Community access
           </li>
           <li className="flex gap-4 text-sm text-slate-700 font-bold items-center">
             <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
             Completion certificate
           </li>
         </ul>
       </div>
    </div>
  );
}
