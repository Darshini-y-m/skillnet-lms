"use client";
import React, { useEffect, useState } from 'react';
import CourseGrid from '../../components/CourseGrid';
import { Course } from '../../components/CourseCard';

import { courses as centralCourses } from '../../data/courses';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCourses(centralCourses);
      setLoading(false);
    }, 600);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
         <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4 text-center md:text-left">All Courses</h1>
         <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-slate-200 pb-6">
            <p className="text-slate-600">Discover all available subjects.</p>
            <div className="flex items-center gap-3">
               <span className="text-sm font-semibold text-slate-500">Filter By</span>
               <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500">
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
      ) : (
        <CourseGrid courses={courses} />
      )}
    </div>
  );
}
