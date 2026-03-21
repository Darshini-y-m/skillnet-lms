"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Course } from '../data/courses';

export type { Course };

export default function CourseCard({ course }: { course: Course }) {
  const router = useRouter();

  const getDifficultyColor = (level: string) => {
    switch (level) {
       case 'Beginner': return "text-emerald-500 bg-emerald-50 border-emerald-200";
       case 'Intermediate': return "text-amber-500 bg-amber-50 border-amber-200";
       case 'Advanced': return "text-rose-500 bg-rose-50 border-rose-200";
       default: return "text-blue-500 bg-blue-50 border-blue-200";
    }
  };

  return (
    <div onClick={() => router.push(`/course/${course.id}`)} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-all cursor-pointer group flex flex-col h-full">
      <div className="h-48 rounded-2xl bg-slate-100 overflow-hidden mb-6 relative shrink-0">
         {course.thumbnail ? (
            <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={course.title} />
         ) : (
            <div className="w-full h-full bg-blue-100"></div>
         )}
         <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full font-black text-xs border backdrop-blur-md shadow-sm ${getDifficultyColor(course.level)}`}>
            {course.level}
         </div>
      </div>
      
      <div className="flex flex-col flex-grow">
         <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-blue-600 line-clamp-2 transition-colors">{course.title}</h3>
         <p className="text-slate-500 font-bold mb-6 flex items-center gap-2 text-sm">
            <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-[10px] shrink-0">
               {course.instructor.charAt(0)}
            </span>
            {course.instructor}
         </p>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-auto shrink-0">
         <span className="text-2xl font-black text-slate-800">
             {course.price === 0 ? <span className="text-lg text-emerald-500">Free!</span> : `₹${course.price}`}
         </span>
         <span className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
            <svg className="w-5 h-5 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
         </span>
      </div>
    </div>
  );
}
