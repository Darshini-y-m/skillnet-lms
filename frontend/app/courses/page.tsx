"use client";
import React, { useEffect, useState } from 'react';
import CourseGrid from '../../components/CourseGrid';
import { Course } from '../../components/CourseCard';

// Shared mock fallback array for consistency
const frontendMockCourses: Course[] = [
  { id: 101, title: "Python for Data Science", description: "Master Python and analyze data with Pandas.", instructor: "Dr. Angela Yu", price: 49.99, rating: 4.8, students: 120500 },
  { id: 102, title: "Docker for Developers", description: "Learn containerization from scratch.", instructor: "Stephen Grider", price: 29.99, rating: 4.6, students: 85300 },
  { id: 103, title: "SQL Masterclass", description: "Database design and complex queries.", instructor: "Colt Steele", price: 19.99, rating: 4.9, students: 210000 },
  { id: 104, title: "React Full Course", description: "Modern React and Next.js.", instructor: "Maximilian S.", price: 59.99, rating: 4.9, students: 300400 },
  { id: 105, title: "Machine Learning Bootcamp", description: "From algorithms to deep learning.", instructor: "Jose Portilla", price: 89.99, rating: 4.7, students: 450000 },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/mock/subjects")
      .then(res => res.json())
      .then((data: Course[]) => {
        setCourses([...data, ...frontendMockCourses]);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch backend courses", err);
        setCourses(frontendMockCourses);
        setLoading(false);
      });
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
