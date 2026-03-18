"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LessonSidebar from '../../../components/LessonSidebar';
import VideoPlayer from '../../../components/VideoPlayer';

import { courses as centralCourses, Course } from '../../../data/courses';

export default function LearnPage() {
  const router = useRouter();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const idParam = window.location.pathname.split("/").pop() || "301";
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    } 
    
    // Check purchase status
    const purchased = localStorage.getItem(`purchased_course_${idParam}`);
    
    // Find course from central data
    const foundCourse = centralCourses.find(c => c.id.toString() === idParam);
    if (!foundCourse) {
      alert("Course not found!");
      router.push("/");
      return;
    }
    
    const price = foundCourse.price || 0;

    if (price > 0 && purchased !== "true") {
      alert("This course requires enrollment before viewing lessons.");
      router.push(`/course/${idParam}`);
      return;
    }

    setCourse(foundCourse);
    if (foundCourse.sections.length > 0 && foundCourse.sections[0].lessons.length > 0) {
      setActiveLessonId(foundCourse.sections[0].lessons[0].id);
    }
    setIsAuthorized(true);
    setIsDataLoaded(true);
  }, [router]);

  if (!isDataLoaded) {
    return (
       <div className="flex justify-center items-center h-screen bg-slate-50">
          <div className="w-16 h-16 border-4 border-sky-100 border-t-blue-500 rounded-full animate-spin"></div>
       </div>
    );
  }

  if (!course || !activeLessonId) return null;

  let activeLesson = course.sections[0].lessons[0];
  let currentSection = course.sections[0];
  let nextLessonId: number | null = null;
  
  for (let sIdx = 0; sIdx < course.sections.length; sIdx++) {
    const section = course.sections[sIdx];
    const matchIdx = section.lessons.findIndex(l => l.id === activeLessonId);
    if (matchIdx !== -1) {
      activeLesson = section.lessons[matchIdx];
      currentSection = section;
      
      if (matchIdx + 1 < section.lessons.length) {
         nextLessonId = section.lessons[matchIdx + 1].id;
      } else if (sIdx + 1 < course.sections.length) {
         nextLessonId = course.sections[sIdx + 1].lessons[0].id;
      }
      break;
    }
  }

  const progressPercent = Math.min(100, Math.max(0, (nextLessonId ? 35 : 100)));

  return (
    <div className="flex flex-col-reverse lg:flex-row h-[calc(100vh-72px)] overflow-hidden bg-white">
      
      <LessonSidebar 
        sections={course.sections} 
        activeLessonId={activeLessonId} 
        onSelectLesson={setActiveLessonId} 
      />

      <div className="flex-1 flex flex-col overflow-y-auto relative bg-slate-100">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMWgydjJIMVoiIGZpbGw9InJnYmEoNTksMTMwLDI0NiwwLjA1KSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] opacity-50 z-0"></div>

        <div className="flex-1 p-4 sm:p-8 flex flex-col items-center justify-center max-w-6xl mx-auto w-full relative z-10 pt-10 pb-24">
           
           <div className="w-full mb-8">
             <div className="inline-flex items-center gap-2 bg-blue-100/50 text-blue-600 font-black tracking-widest text-xs uppercase px-3 py-1.5 rounded-full mb-4">
                 {currentSection.title}
             </div>
             <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-800">{activeLesson.title}</h1>
           </div>

           <VideoPlayer videoId={activeLesson.videoId} />
           
           {/* Actions Base */}
           <div className="w-full mt-10 bg-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-white shadow-[0_10px_30px_rgb(0,0,0,0.03)]">
              
              <div className="flex-1 w-full bg-slate-50 p-5 rounded-2xl border border-slate-100">
                 <div className="flex justify-between text-sm text-slate-600 font-extrabold mb-3">
                    <span>{progressPercent === 100 ? "Boom! Lesson conquered. ❄️" : progressPercent === 0 ? "Grab some cocoa ☕ and let's learn." : "Nice work! Your brain just leveled up. ❄️"}</span>
                    <span className="text-blue-500">{progressPercent}%</span>
                 </div>
                 <div className="h-3 w-full bg-white rounded-full overflow-hidden shadow-inner border border-slate-100">
                    <div className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full transition-all duration-1000 shadow-sm" style={{width: `${progressPercent}%`}}></div>
                 </div>
              </div>
              
              <div className="flex items-center gap-4 w-full md:w-auto">
                 <button className="flex-1 md:flex-none p-4.5 bg-sky-50 text-sky-600 rounded-2xl font-black hover:bg-sky-100 transition-colors flex items-center justify-center shadow-inner">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
                 </button>
                 <button 
                    disabled={!nextLessonId}
                    onClick={() => nextLessonId && setActiveLessonId(nextLessonId)}
                    className="flex-[3] md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white px-8 py-4.5 rounded-2xl font-black transition-all shadow-xl shadow-blue-500/30 hover:-translate-y-1 active:scale-95 whitespace-nowrap"
                 >
                    {nextLessonId ? "Next Snow Step →" : "Journey Complete! ❄️"}
                    {nextLessonId && (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                    )}
                 </button>
              </div>

           </div>

        </div>
      </div>
    </div>
  );
}
