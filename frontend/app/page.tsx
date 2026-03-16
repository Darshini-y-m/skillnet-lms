"use client";
import React, { useEffect, useState } from 'react';
import HeroSnow from '../components/HeroSnow';
import CourseGrid from '../components/CourseGrid';
import { Course } from '../components/CourseCard';

// Comprehensive mock tailored to the winter/magic theme 
const skillNetMocks: Course[] = [
  { id: 301, title: "Python for AI", description: "Learn Python syntax directly tailored for Artificial Intelligence.", instructor: "Dr. Frost", price: 0, difficulty: "Beginner", hours: 14 },
  { id: 302, title: "Cloud Fundamentals", description: "Navigate the snowy peaks of AWS and Azure deployments.", instructor: "Sky Walker", price: 499, difficulty: "Intermediate", hours: 26 },
  { id: 303, title: "Frontend Mastery", description: "Design beautiful frozen UIs and glassmorphism elements.", instructor: "Elsa Dev", price: 999, difficulty: "Advanced", hours: 35 },
  { id: 304, title: "Machine Learning Essentials", description: "Data science without the freeze frame.", instructor: "Yann L.", price: 1999, difficulty: "Advanced", hours: 42 },
  { id: 305, title: "DevOps Foundations", description: "Automate your deployments.", instructor: "Penguin Proc", price: 499, difficulty: "Beginner", hours: 10 },
];

export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://skillnet-lms.onrender.com/api/mock/subjects")
      .then(res => res.json())
      .then((data: Course[]) => {
        const backendMapped = data.map(c => ({
          ...c,
          difficulty: "Intermediate",
          hours: Math.floor(Math.random() * 20) + 12,
        }));
        setCourses([...backendMapped, ...skillNetMocks]);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch backend courses", err);
        setCourses(skillNetMocks);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full pb-32 bg-slate-50 min-h-screen font-sans relative">
      <HeroSnow />

      {/* Decorative backdrop blobs */}
      <div className="absolute top-[80vh] left-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -z-10 mix-blend-multiply"></div>
      <div className="absolute top-[120vh] right-0 w-[500px] h-[500px] bg-sky-100/40 rounded-full blur-3xl -z-10 mix-blend-multiply"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 mt-32 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-3">Trending Paths</h2>
            <p className="text-slate-500 text-lg font-medium">Join thousands of curious minds scaling these highly rated courses.</p>
          </div>
          <button className="text-blue-600 font-bold hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-6 py-3 rounded-xl transition-colors flex items-center gap-2">
            View all paths
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-16 h-16 border-4 border-sky-100 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <CourseGrid courses={courses.slice(0, 8)} />
        )}
      </div>

      <div className="max-w-5xl mx-auto mt-40 glass-card rounded-[40px] p-12 text-center relative overflow-hidden ring-1 ring-white shadow-2xl shadow-blue-900/5 hover:-translate-y-2 transition-transform duration-500">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-sky-300 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-400 rounded-full blur-3xl opacity-30"></div>
        <h2 className="text-4xl font-black text-slate-800 mb-6 relative z-10">Ready to break the ice?</h2>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 font-medium relative z-10">
          Create your free account today and unlock a wonderland of knowledge with our dedicated AI Mentors guiding you at every step.
        </p>
        <button className="relative z-10 bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-600/30 transition-all hover:scale-105 active:scale-95">
          Join SkillNet Community
        </button>
      </div>
    </div>
  );
}