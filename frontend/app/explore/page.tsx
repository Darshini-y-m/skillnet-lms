"use client";
import React, { useEffect, useState } from 'react';
import CourseGrid from '../../components/CourseGrid';
import { Course } from '../../components/CourseCard';

// Comprehensive mock specific to NeuroLearn
const neuroMockCourses: Course[] = [
  { id: 201, title: "Intro to Artificial Intelligence", description: "Understand the core mathematical concepts of AI.", instructor: "Dr. Alan Turing", price: 89.99, difficulty: "Beginner", hours: 10, category: "AI" },
  { id: 202, title: "Full Stack Web Engineering", description: "Build scalable react nodes with modern APIs.", instructor: "Ada Lovelace", price: 120.00, difficulty: "Intermediate", hours: 45, category: "Web Dev" },
  { id: 203, title: "Cloud Infrastructure Basics", description: "Deploy zero-downtime clusters on AWS.", instructor: "Jeff Barr", price: 49.99, difficulty: "Intermediate", hours: 15, category: "Cloud" },
  { id: 204, title: "Python for Data Science", description: "Data wrangling with Pandas and Numpy.", instructor: "Wes McKinney", price: 59.99, difficulty: "Beginner", hours: 22, category: "Data Science" },
  { id: 205, title: "Neural Networks Explained", description: "Deep learning internals.", instructor: "Lex Fridman", price: 199.99, difficulty: "Advanced", hours: 30, category: "AI" },
  { id: 207, title: "Next.js App Server Actions", description: "Modern React architectural designs.", instructor: "Guillermo Rauch", price: 79.99, difficulty: "Intermediate", hours: 12, category: "Web Dev" },
  { id: 208, title: "System Design for AI Platforms", description: "Architecting large scale ML inferences.", instructor: "Alex Xu", price: 149.99, difficulty: "Advanced", hours: 25, category: "Cloud" },
];

export default function ExplorePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/mock/subjects")
      .then(res => res.json())
      .then((data: Course[]) => {
        const backendMapped = data.map(c => ({
           ...c,
           difficulty: "Intermediate",
           hours: 15,
           category: "AI"
        }));
        setCourses([...backendMapped, ...neuroMockCourses]);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch backend courses", err);
        setCourses(neuroMockCourses);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full pb-20 bg-slate-50 min-h-screen">
       <div className="bg-indigo-900 text-white pt-10 pb-20 px-6 hero-bg relative">
          <div className="max-w-[1400px] mx-auto z-10 relative">
             <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Explore our Curriculum</h1>
             <p className="text-indigo-200 text-lg max-w-2xl">Search, filter, and discover the perfect AI-powered learning path tailored exclusively to your professional background.</p>
          </div>
       </div>

       <div className="max-w-[1400px] mx-auto px-6 -mt-10 relative z-20">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 mb-10">
             <input type="text" placeholder="Search for anything..." className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
             <select className="bg-slate-50 border border-slate-200 rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-700">
                <option>All Categories</option>
                <option>AI</option>
                <option>Web Dev</option>
                <option>Data Science</option>
                <option>Cloud</option>
             </select>
          </div>

          {loading ? (
             <div className="flex justify-center py-20">
               <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
             </div>
          ) : (
             <CourseGrid courses={courses} />
          )}
       </div>
    </div>
  );
}
