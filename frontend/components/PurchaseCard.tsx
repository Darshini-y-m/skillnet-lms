"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Course } from './CourseCard';

export default function PurchaseCard({ course }: { course: Course }) {
  const router = useRouter();

  const handleBuy = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (!token) {
      router.push("/login");
    } else {
      router.push(`/learn/${course.id}`);
    }
  };

  const isFree = course.price === 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] sticky top-24">
       <div className="text-4xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
         {isFree ? "Free" : `$${course.price.toFixed(2)}`}
         {!isFree && <span className="text-lg text-slate-400 font-medium line-through">${(course.price * 1.5).toFixed(2)}</span>}
       </div>
       
       <button 
         onClick={handleBuy}
         className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition shadow-sm hover:shadow-md active:scale-[0.98] mb-4 text-lg"
       >
         {isFree ? "Enroll Now" : "Buy Now"}
       </button>
       
       {!isFree && (
         <button className="w-full bg-white hover:bg-slate-50 border border-slate-900 text-slate-900 font-bold py-4 rounded-xl transition shadow-sm hover:shadow-md active:scale-[0.98] mb-6 text-lg">
           Add to cart
         </button>
       )}

       <div className="text-center text-xs text-slate-500 mb-6">
         30-Day Money-Back Guarantee
       </div>
       
       <div className="border-t border-slate-100 pt-6">
         <h4 className="font-bold text-slate-900 mb-4">This course includes:</h4>
         <ul className="space-y-3">
           <li className="flex items-center gap-3 text-sm text-slate-600">
             <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
             20 hours on-demand video
           </li>
           <li className="flex items-center gap-3 text-sm text-slate-600">
             <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
             Assignments and Quizzes
           </li>
           <li className="flex items-center gap-3 text-sm text-slate-600">
             <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
             Access on mobile and TV
           </li>
           <li className="flex items-center gap-3 text-sm text-slate-600">
             <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             Certificate of completion
           </li>
         </ul>
       </div>
    </div>
  );
}
