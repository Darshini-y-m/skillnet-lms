"use client";

import React, { useEffect, useState } from 'react';
import EnrollPanel from '../../../components/EnrollPanel';
import type { Course } from '../../../components/CourseCard';
import { courses as centralCourses } from '../../../data/courses';

export default function Page({ params }: { params: { id: string } }) {
   const [course, setCourse] = useState<Course | null>(null);

   useEffect(() => {
      const idParam = params.id;

      if (!idParam) return;

      const found = centralCourses.find(c => c.id.toString() === idParam);
      setCourse(found || null);
   }, [params.id]);

   if (!course) {
      return (
         <div className="flex justify-center py-40 min-h-screen">
            <div className="w-16 h-16 border-4 border-sky-100 border-t-blue-500 rounded-full animate-spin"></div>
         </div>
      );
   }

   return (
      <div>Working</div>
   );
}