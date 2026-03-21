"use client";

import React, { useEffect, useState } from 'react';
import EnrollPanel from '../../../components/EnrollPanel';
import type { Course } from '../../../components/CourseCard';
import { courses as centralCourses } from '../../../data/courses';

export default function Page({ params }: { params: { id: string } }) {
   const [course, setCourse] = useState<Course | null>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);

   useEffect(() => {
      const fetchCourse = async () => {
         try {
            setLoading(true);
            
            // Handle Next.js 15+ promise params safely
            const resolvedParams = await Promise.resolve(params);
            const idParam = resolvedParams?.id;
            
            console.log("Course ID:", idParam);
            console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
            
            if (!idParam) {
               throw new Error("No course ID provided");
            }

            const url = `${process.env.NEXT_PUBLIC_API_URL}/api/subjects/${idParam}`;
            console.log("Fetching:", url);

            const res = await fetch(url);
            console.log("Response status:", res.status);

            if (!res.ok) {
               throw new Error("Failed API");
            }

            const data = await res.json();
            console.log("Data:", data);

            setCourse(data);
         } catch (err) {
            console.error("ERROR:", err);
            setError(true);
         } finally {
            setLoading(false);
         }
      };

      fetchCourse();
   }, [params]);

   if (loading) {
      return (
         <div className="flex justify-center py-40 min-h-screen">
            <div className="w-16 h-16 border-4 border-sky-100 border-t-blue-500 rounded-full animate-spin"></div>
         </div>
      );
   }

   if (error) {
     return <div className="p-20 text-center text-red-500 font-bold text-xl">Failed to load course. Check backend/API.</div>;
   }
   if (!course) return <div className="p-20 text-center font-bold text-xl">Course not found</div>;

   return (
      <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
               <h1 className="text-5xl font-black mb-4 text-slate-800">{course.title}</h1>
               <p className="text-xl text-slate-500 mb-8 font-medium">{course.description}</p>
            </div>
            <div>
               <EnrollPanel course={course} />
            </div>
         </div>
      </div>
   );
}