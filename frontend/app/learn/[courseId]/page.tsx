"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import EnrollPanel from '../../../components/EnrollPanel';
import { Course } from '../../../components/CourseCard';
import { courses as centralCourses } from '../../../data/courses';

export default function CourseDetailPage() {
  const params = useParams<{ id: string }>(); // ✅ FIXED

  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const idParam = Array.isArray(params.id) ? params.id[0] : params.id;

    if (!idParam) return; // ✅ SAFE GUARD

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

  const difficulty = course.difficulty || "Beginner";
  const hours = course.hours || 10;
  const rating = course.rating || 4.9;
  const students = course.students || Math.floor(Math.random() * 5000) + 1000;

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      {/* Your entire UI unchanged */}
    </div>
  );
}