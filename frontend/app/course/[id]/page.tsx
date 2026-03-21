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
      const idParam = params?.id;
      if (!idParam) return;

      const fetchCourse = async () => {
         try {
            console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subjects/${idParam}`);
            if (!res.ok) throw new Error("API failed");
            const data = await res.json();
            setCourse(data);
         } catch (err) {
            console.error("API ERROR:", err);
            setError(true);
         } finally {
            setLoading(false);
         }
      };

      fetchCourse();
   }, [params.id]);

   if (loading) {
      return (
         <div className="flex justify-center py-40 min-h-screen">
            <div className="w-16 h-16 border-4 border-sky-100 border-t-blue-500 rounded-full animate-spin"></div>
         </div>
      );
   }

   if (error) return <div>Failed to load data</div>;
   if (!course) return <div>Course not found</div>;

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