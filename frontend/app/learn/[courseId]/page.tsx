"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import EnrollPanel from '../../../components/EnrollPanel';
import { Course } from '../../../components/CourseCard';
import { courses as centralCourses } from '../../../data/courses';

export default function CourseDetailPage() {
  const params = useParams<{ courseId: string }>();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
       try {
          setLoading(true);
          
          const resolvedParams = await Promise.resolve(params);
          const rawId = resolvedParams?.courseId;
          const idParam = Array.isArray(rawId) ? rawId[0] : rawId;
          
          const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
          console.log("Course ID (Learn):", idParam);
          console.log("API URL Base:", baseUrl);
          
          if (!idParam) {
             throw new Error("No course ID provided");
          }

          const url = `${baseUrl}/api/courses/${idParam}`;
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