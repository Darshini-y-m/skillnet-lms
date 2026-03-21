"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import EnrollPanel from '../../../components/EnrollPanel';
import type { Course } from '../../../components/CourseCard';
import { courses as centralCourses } from '../../../data/courses';

export default function CourseDetailPage() {
   const params = useParams<{ id: string }>();

   const [course, setCourse] = useState<Course | null>(null);

   useEffect(() => {
      const idParam = Array.isArray(params.id) ? params.id[0] : params.id;

      if (!idParam) return;

      const found = centralCourses.find(c => c.id.toString() === idParam);
      setCourse(found || null);
   }, [params]);

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