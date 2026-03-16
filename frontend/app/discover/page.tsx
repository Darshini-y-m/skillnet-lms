"use client";
import React, { useEffect, useState } from 'react';
import CourseGrid from '../../components/CourseGrid';
import { Course } from '../../components/CourseCard';

const skillNetMocks: Course[] = [
  { id: 301, title: "Python for AI", description: "Learn Python syntax directly tailored for Artificial Intelligence.", instructor: "Dr. Frost", price: 0, difficulty: "Beginner", hours: 14 },
  { id: 302, title: "Cloud Fundamentals", description: "Navigate the snowy peaks of AWS and Azure deployments.", instructor: "Sky Walker", price: 499, difficulty: "Intermediate", hours: 26 },
  { id: 303, title: "Frontend Mastery", description: "Design beautiful frozen UIs and glassmorphism elements.", instructor: "Elsa Dev", price: 999, difficulty: "Advanced", hours: 35 },
  { id: 304, title: "Machine Learning Essentials", description: "Data science without the freeze frame.", instructor: "Yann L.", price: 1999, difficulty: "Advanced", hours: 42 },
  { id: 305, title: "DevOps Foundations", description: "Automate your deployments.", instructor: "Penguin Proc", price: 499, difficulty: "Beginner", hours: 10 },
  { id: 306, title: "Secure Architectures", description: "Ice-cold security protocols for modern apps.", instructor: "Sub Zero", price: 999, difficulty: "Intermediate", hours: 22 },
  { id: 307, title: "Data Visualization", description: "Create crystal clear dashboards.", instructor: "Aurora G.", price: 0, difficulty: "Beginner", hours: 8 },
];

export default function DiscoverPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/mock/subjects")
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
    <div className="w-full pb-32 bg-slate-50 min-h-[90vh] font-sans relative overflow-hidden">
       {/* Background elements */}
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/60 rounded-full blur-[100px] mix-blend-multiply pointer-events-none"></div>
       <div className="absolute bottom-40 left-0 w-[400px] h-[400px] bg-sky-100/60 rounded-full blur-[80px] mix-blend-multiply pointer-events-none"></div>

       <div className="hero-snow-bg text-white pt-24 pb-32 px-6 rounded-b-[60px] shadow-xl relative z-10 w-full mt-[-72px]">
          <div className="hero-aurora"></div>
          
          <div className="max-w-7xl mx-auto relative z-20 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="md:w-1/2 mt-16">
                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 drop-shadow-sm text-white">
                   Discover Your Next <span className="text-sky-300">Adventure</span>
                 </h1>
                 <p className="text-blue-100 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                   Filter through our curated winter collection of courses. Start your expedition and join a thriving community of learners.
                 </p>
             </div>
             
             {/* Search box overlap */}
             <div className="md:w-1/2 w-full mt-10 md:mt-24">
                <div className="glass-card p-4 rounded-3xl shadow-2xl mr-auto ml-auto max-w-lg border border-white/40 flex flex-col sm:flex-row gap-3 relative overflow-hidden group">
                   <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                   <input 
                      type="text" 
                      placeholder="What do you want to master?" 
                      className="flex-1 bg-white/80 backdrop-blur-md border border-slate-200 text-slate-800 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-400 font-bold placeholder-slate-400 transition" 
                   />
                   <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-8 py-4 font-black flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                      Search
                   </button>
                </div>
             </div>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-6 sm:px-10 mt-20 relative z-20">
          <div className="flex items-center gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
             <button className="whitespace-nowrap bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold shadow-md shadow-blue-600/20">All Topics</button>
             {['Artificial Intelligence', 'Cloud Engineering', 'Software Development', 'Data Science', 'Cybersecurity'].map(topic => (
                <button key={topic} className="whitespace-nowrap bg-white border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600 px-6 py-2.5 rounded-full font-bold transition-colors">
                   {topic}
                </button>
             ))}
          </div>

          {loading ? (
             <div className="flex justify-center py-32">
               <div className="w-16 h-16 border-4 border-sky-100 border-t-blue-500 rounded-full animate-spin"></div>
             </div>
          ) : (
             <CourseGrid courses={courses} />
          )}
       </div>
    </div>
  );
}
