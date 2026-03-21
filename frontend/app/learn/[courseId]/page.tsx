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
    const idParam = Array.isArray(params.courseId) ? params.courseId[0] : params.courseId;

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
  }, [params.courseId]);

  if (loading) {
    return (
      <div className="flex justify-center py-40 min-h-screen">
        <div className="w-16 h-16 border-4 border-sky-100 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) return <div>Failed to load data</div>;
  if (!course) return <div>Course not found</div>;

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