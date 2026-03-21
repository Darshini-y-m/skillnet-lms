"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import CourseGrid from '../../components/CourseGrid';
import { Course } from '../../components/CourseCard';

import { courses as centralCourses } from '../../data/courses';

function CoursesContent() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get('q') || "";

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (searchQuery) {
         const filtered = centralCourses.filter(course =>
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase())
         );
         setCourses(filtered);
      } else {
         setCourses(centralCourses);
      }
      setLoading(false);
    }, 400);
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 pt-32 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-screen">
      <div className="mb-10">
         <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4 text-center md:text-left">
            {searchQuery ? `Search Results for "${searchQuery}"` : "All Courses"}
         </h1>
         <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-slate-200 pb-6">
            <p className="text-slate-600">
               {searchQuery ? `Found ${courses.length} courses matching your search.` : "Discover all available subjects."}
            </p>
            <div className="flex items-center gap-3">
               <span className="text-sm font-semibold text-slate-500">Filter By</span>
               <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 font-bold">
                  <option>Most Popular</option>
                  <option>Highest Rated</option>
                  <option>Newest</option>
               </select>
            </div>
         </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      ) : courses.length > 0 ? (
        <CourseGrid courses={courses} />
      ) : (
        <div className="py-32 text-center text-slate-500">
           <svg className="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           <h3 className="text-2xl font-bold text-slate-700 mb-2">No Courses Found</h3>
           <p>We couldn't find anything matching "{searchQuery}". Try a different keyword!</p>
        </div>
      )}
    </div>
  );
}

export default function CoursesPage() {
   return (
      <Suspense fallback={
         <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
         </div>
      }>
         <CoursesContent />
      </Suspense>
   );
}
