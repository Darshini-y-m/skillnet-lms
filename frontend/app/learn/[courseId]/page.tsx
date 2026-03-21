"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { courses as centralCourses } from '../../../data/courses';

export default function CourseDetailPage() {
  const params = useParams<{ courseId: string }>();

  const [courseData, setCourseData] = useState<any>(null);
  const [currentVideo, setCurrentVideo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchCourseTree = async () => {
       try {
          setLoading(true);
          const resolvedParams = await Promise.resolve(params);
          const rawId = resolvedParams?.courseId;
          const idParam = Array.isArray(rawId) ? rawId[0] : rawId;
          
          if (!idParam) throw new Error("No course ID provided");

          const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
          const url = `${baseUrl}/api/courses/${idParam}/tree`;
          
          let data;
          try {
             // Attempt to fetch the active backend tree (auth + DB required)
             const tempToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
             const res = await fetch(url, {
                headers: tempToken ? { 'Authorization': `Bearer ${tempToken}` } : {}
             });
             
             if (!res.ok) throw new Error("Tree API failed (Auth/DB Missing)");
             data = await res.json();
             
             if (!data.sections || data.sections.length === 0) {
                 throw new Error("No sections returned from backend");
             }

             // INTERCEPT: Force override limited DB datasets with our rich multi-video payloads
             const localC = centralCourses.find(c => c.id.toString() === idParam);
             if (localC?.videos?.length) {
                 data.sections = [{
                    id: 1,
                    title: "Course Modules",
                    videos: localC.videos
                 }];
             }
          } catch (e) {
             console.warn("Tree API failed, using rich mock course structure directly:", e);
             
             // Extract dynamically from central map
             const localC = centralCourses.find(c => c.id.toString() === idParam);
             const fallBackVids = localC?.videos || [
                 { id: 101, title: "Course Introduction", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
                 { id: 102, title: "Setting up your environment", url: "https://www.youtube.com/embed/tgbNymZ7vqY" }
             ];

             data = {
               id: idParam,
               title: localC?.title || "SkillNet Interactive Learning Path",
               sections: [
                 {
                   id: 1,
                   title: "Module 1: The Foundations",
                   videos: fallBackVids
                 }
               ]
             };
          }
          
          setCourseData(data);
          
          // Hydrate local progress
          if (typeof window !== 'undefined') {
             const savedProgress = localStorage.getItem(`progress_${idParam}`);
             if (savedProgress) {
                setProgress(JSON.parse(savedProgress));
             }
          }

          if (data.sections?.length > 0 && data.sections[0].videos?.length > 0) {
             setCurrentVideo(data.sections[0].videos[0]);
          }

       } catch (err) {
          console.error("ERROR:", err);
          setError(true);
       } finally {
          setLoading(false);
       }
    };

    fetchCourseTree();
  }, [params]);

  const markCompleted = (videoId: string) => {
      const newProgress = { ...progress, [videoId]: true };
      setProgress(newProgress);
      if (courseData && typeof window !== 'undefined') {
          localStorage.setItem(`progress_${courseData.id}`, JSON.stringify(newProgress));
      }
  };

  if (loading) {
    return (
      <div className="flex justify-center flex-col py-40 min-h-screen items-center bg-slate-50">
        <div className="w-16 h-16 border-4 border-sky-100 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-6 text-slate-500 font-bold">Unlocking course materials...</p>
      </div>
    );
  }

  if (error) {
     return <div className="p-20 text-center text-red-500 font-bold text-xl bg-slate-50 min-h-screen">Failed to load course content.</div>;
  }
  if (!courseData) return <div className="p-20 text-center font-bold text-xl min-h-screen">Course not found</div>;

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
       
       <header className="bg-slate-900 border-b border-slate-700/50 text-white p-5 lg:px-10 shadow-lg sticky top-0 z-50 flex items-center justify-between">
          <h1 className="text-xl lg:text-2xl font-black tracking-tight flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
             </div>
             {courseData.title}
          </h1>
          
          <div className="text-sm font-bold text-slate-400">
             {Object.keys(progress).length} Lessons Completed
          </div>
       </header>

       <div className="max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row gap-6 p-6 lg:p-10">
          
          {/* Left Pane: Video Player */}
          <div className="flex-1 w-full max-w-full lg:max-w-[850px]">
             <div className="bg-black rounded-[24px] overflow-hidden aspect-video shadow-2xl ring-1 ring-slate-200">
                {currentVideo ? (
                   <iframe 
                      src={`${currentVideo.url?.replace('watch?v=', 'embed/')}?autoplay=0&rel=0&modestbranding=1`} 
                      className="w-full h-full border-0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      title="SkillNet Learning Player"
                   />
                ) : (
                   <div className="text-white flex items-center justify-center h-full">No video selected</div>
                )}
             </div>

             {currentVideo && (
                <div className="bg-white p-6 mt-8 rounded-[24px] shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
                   <div>
                      <h2 className="text-2xl font-black text-slate-800 tracking-tight">{currentVideo.title}</h2>
                      <p className={`font-semibold text-sm mt-2 flex items-center gap-2 ${progress[currentVideo.id] ? "text-emerald-500" : "text-sky-600"}`}>
                         {progress[currentVideo.id] ? (
                            <>
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                              Completed Module
                            </>
                         ) : (
                            <>
                              <svg className="w-5 h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                              In Progress
                            </>
                         )}
                      </p>
                   </div>
                   <button 
                      onClick={() => markCompleted(currentVideo.id)}
                      className={`px-8 py-3.5 rounded-2xl font-black transition-all active:scale-[0.98] w-full sm:w-auto ${progress[currentVideo.id] ? 'bg-emerald-100 text-emerald-700 shadow-inner' : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-xl shadow-blue-500/20'}`}
                   >
                      {progress[currentVideo.id] ? "Done! 🎉" : "Mark as Complete"}
                   </button>
                </div>
             )}
          </div>

          {/* Right Pane: Lesson List Sidebar */}
          <div className="lg:w-[420px] shrink-0">
             <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full lg:max-h-[850px]">
                
                <div className="p-6 border-b border-slate-100 bg-slate-50 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"></div>
                   <h3 className="font-black text-xl text-slate-800 relative z-10 flex items-center gap-2">
                     <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                     Course Content
                   </h3>
                </div>
                
                {/* Scrollable List container */}
                <div className="overflow-y-auto flex-1 custom-scrollbar">
                   <div className="divide-y divide-slate-100">
                      {courseData.sections?.map((section: any) => (
                         <div key={section.id} className="bg-slate-50 group border-b border-slate-200 last:border-b-0">
                            
                            {/* Section Header */}
                            <div className="px-5 py-4 font-black text-slate-800 text-sm tracking-wide bg-slate-100/80 sticky top-0 backdrop-blur-md z-10 flex justify-between items-center shadow-sm">
                               {section.title}
                            </div>
                            
                            {/* Lessons List inside Section */}
                            <ul className="divide-y divide-slate-100 bg-white">
                               {section.videos?.map((vid: any) => {
                                  const isActive = currentVideo?.id === vid.id;
                                  const isDone = progress[vid.id];
                                  
                                  return (
                                     <li key={vid.id}>
                                        <button
                                           onClick={() => setCurrentVideo(vid)}
                                           className={`w-full text-left p-5 transition-all flex items-start gap-4 hover:bg-sky-50/50 
                                              ${isActive ? 'bg-blue-50/80' : ''}`
                                           }
                                        >
                                           {/* Video Status Icon */}
                                           <div className={`mt-0.5 shrink-0 transition-colors ${isActive ? 'text-blue-500' : isDone ? 'text-emerald-500' : 'text-slate-300 group-hover:text-slate-400'}`}>
                                              {isDone ? (
                                                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                              ) : (
                                                 <svg className="w-5 h-5" fill={isActive ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? 0 : 2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                              )}
                                           </div>
                                           
                                           {/* Title Text */}
                                           <span className={`text-sm font-bold flex-1 leading-snug pr-2 ${isActive ? 'text-blue-800' : isDone ? 'text-slate-500' : 'text-slate-700'}`}>
                                              {vid.title}
                                           </span>
                                           
                                           {/* Active Indicator Pillar */}
                                           {isActive && (
                                              <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-blue-500 rounded-l-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                           )}
                                        </button>
                                     </li>
                                  );
                               })}
                            </ul>
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>

       </div>
    </div>
  );
}