"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  price: number;
  difficulty?: string;
  hours?: number;
  category?: string;
  thumbnail?: string;
  rating?: number;
  students?: number;
}

export default function CourseCard({ course }: { course: Course }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/course/${course.id}`);
  };

  const difficulty = course.difficulty || "Beginner";
  const hours = course.hours || Math.floor(Math.random() * 20) + 5;
  const thumbnail = course.thumbnail || `https://picsum.photos/seed/${course.id * 15}/600/400`;

  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
       case 'beginner': return "text-emerald-500 bg-emerald-50 border-emerald-200";
       case 'intermediate': return "text-amber-500 bg-amber-50 border-amber-200";
       case 'advanced': return "text-rose-500 bg-rose-50 border-rose-200";
       default: return "text-blue-500 bg-blue-50 border-blue-200";
    }
  };

  return (
    <div 
       onClick={handleCardClick}
       className="course-card-snow bg-white/60 backdrop-blur-md rounded-[28px] overflow-hidden border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer flex flex-col h-full group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-0 pointer-events-none"></div>
      
      <div className="relative w-full h-52 bg-slate-100 overflow-hidden m-2 rounded-[20px]">
        <img 
          src={thumbnail} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Soft frost overlay on image */}
        <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
        
        <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-black tracking-wider shadow-sm border ${getDifficultyColor(difficulty)}`}>
          {difficulty}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow relative z-10">
        <h3 className="font-extrabold text-xl text-slate-800 leading-tight mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {course.title}
        </h3>
        
        <div className="flex items-center gap-3 text-sm text-slate-500 font-bold mb-5 flex-1">
           <div className="flex items-center gap-1.5">
             <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px]">
               {course.instructor.charAt(0)}
             </div>
             {course.instructor}
           </div>
           <span className="w-1 h-1 rounded-full bg-slate-300"></span>
           <span className="flex items-center gap-1">
             <svg className="w-4 h-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             {hours}h
           </span>
        </div>

        <div className="pt-5 border-t border-slate-200/60 flex justify-between items-center mt-auto">
             <span className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight" title="Careful... this course might make you smarter.">
                 {course.price === 0 ? <span className="text-lg text-emerald-500">Free for curious minds!</span> : `₹${course.price}`}
             </span>
             <div className="w-10 h-10 shrink-0 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-blue-500 group-hover:text-white flex items-center justify-center transition-colors shadow-sm" title="This one's a fan favorite!">
                <svg className="w-5 h-5 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
             </div>
        </div>
      </div>
    </div>
  );
}
