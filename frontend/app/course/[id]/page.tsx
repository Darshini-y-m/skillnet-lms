"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import EnrollPanel from '../../../components/EnrollPanel';
import { Course } from '../../../components/CourseCard';

import { courses as centralCourses } from '../../../data/courses';

export default function CourseDetailPage() {
  const params = useParams();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const idParam = Array.isArray(params.id) ? params.id[0] : params.id;
    
    setTimeout(() => {
      const found = centralCourses.find(c => c.id.toString() === idParam);
      setCourse(found || null);
    }, 400);
  }, [params.id]);

  if (!course) {
    return (
       <div className="flex justify-center py-40 min-h-screen">
          <div className="w-16 h-16 border-4 border-sky-100 border-t-blue-500 rounded-full animate-spin"></div>
       </div>
    );
  }

  // Fallbacks
  const difficulty = course.difficulty || "Beginner";
  const hours = course.hours || 10;
  const rating = course.rating || 4.9;
  const students = course.students || Math.floor(Math.random() * 5000) + 1000;

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      
      {/* SkillNet Course Header Scene */}
      <div className="hero-snow-bg text-white pt-10 pb-40 relative rounded-b-[60px] shadow-lg">
        <div className="hero-aurora"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row gap-12 relative z-20">
           
           <div className="md:w-3/5 lg:w-2/3">
              <div className="flex items-center gap-2 mb-8 mt-4 text-sm font-black tracking-widest text-sky-200 uppercase bg-white/10 w-fit px-4 py-1.5 rounded-full border border-sky-300/30 backdrop-blur-md">
                 <span>Learning Path</span>
                 <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                 <span>{course.title}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 tracking-tight drop-shadow-md">
                 {course.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl leading-relaxed font-medium">
                 {course.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-bold mb-8 bg-blue-900/40 p-5 rounded-2xl backdrop-blur-sm border border-blue-400/30 w-fit">
                 <div className="flex items-center gap-1.5 bg-amber-400 text-slate-900 px-3 py-1 rounded-full text-base shadow-sm">
                    {rating}
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                 </div>
                 <span className="flex items-center gap-2 text-blue-100">
                    <svg className="w-5 h-5 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    {students.toLocaleString()} Active Learners
                 </span>
                 <span className="flex items-center gap-2 text-blue-100">
                    <svg className="w-5 h-5 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    {difficulty} Level
                 </span>
              </div>
              
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center font-black text-2xl shadow-inner border border-white/40">
                   {course.instructor.charAt(0)}
                 </div>
                 <div className="flex flex-col">
                   <p className="text-sm text-sky-200 font-bold uppercase tracking-wider">Course Guide</p>
                   <p className="font-extrabold text-xl">{course.instructor}</p>
                 </div>
              </div>
           </div>

           {/* Floating Frosted Rights Panel */}
           <div className="md:w-2/5 lg:w-1/3 md:absolute md:right-6 lg:right-10 md:top-12 w-full z-30">
              <EnrollPanel course={course} />
           </div>

        </div>
      </div>

      {/* Main Course Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-16 md:-mt-8 relative z-10">
         <div className="md:w-3/5 lg:w-2/3 md:pr-12">
            
            <h2 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-3">
              <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Expedition Preview
            </h2>
            
            {/* Soft frosted player wrapper */}
            <div className="bg-slate-900 rounded-[32px] overflow-hidden aspect-video shadow-2xl border-4 border-white mb-16 ring-1 ring-slate-200">
               <iframe 
                src="https://www.youtube.com/embed/aircAruvnKk?autoplay=0&rel=0&modestbranding=1" 
                className="w-full h-full border-0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                title="SkillNet Course Preview"
               />
            </div>
            
            <div className="mb-16">
               <h3 className="text-3xl font-black text-slate-800 mb-8">Skills You'll Discover</h3>
               <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                  {[
                    "Master foundational syntaxes and logic flow.",
                    "Build responsive layouts spanning all devices.",
                    "Handle state smoothly leading to bug-free tools.",
                    "Create mesmerizing UIs like a true frontend artisan.",
                    "Optimize rendering paths automatically.",
                    "Automate testing to free up developer time."
                  ].map((item, i) => (
                     <div key={i} className="flex gap-4 text-slate-700 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 items-start hover:-translate-y-1 transition-transform">
                        <div className="bg-sky-100 text-sky-600 rounded-lg p-1.5 mt-0.5 shrink-0">
                           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                           </svg>
                        </div>
                        <span className="font-bold leading-snug">{item}</span>
                     </div>
                  ))}
               </div>
            </div>
            
         </div>
      </div>
    </div>
  );
}
