"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { courses } from '../../../data/courses';

export default function LearnPage() {
  const params = useParams<{ courseId: string }>();
  const router = useRouter();
  
  const idParam = Array.isArray(params.courseId) ? params.courseId[0] : params.courseId;
  const course = courses.find(c => c.id === idParam);

  const [isClient, setIsClient] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [completedVideos, setCompletedVideos] = useState<number[]>([]);

  useEffect(() => {
    setIsClient(true);
    if (!course) return;
    
    // Check purchase state
    const isPurchased = localStorage.getItem(`purchased_${course.id}`);
    if (!isPurchased) {
      router.push(`/course/${course.id}`);
      return;
    }

    // Load saved progress
    const saved = localStorage.getItem(`progress_${course.id}`);
    if (saved) {
      try {
        setCompletedVideos(JSON.parse(saved));
      } catch (e) {
        console.warn("Could not parse saved progress");
      }
    }
  }, [course, router]);

  if (!isClient) return null;
  if (!course) return <div className="p-20 text-center font-bold text-slate-600">Course not found</div>;

  const currentVideo = course.videos[currentVideoIndex];
  const progressPercent = Math.round((completedVideos.length / course.videos.length) * 100);

  const handleMarkComplete = () => {
    if (!completedVideos.includes(currentVideoIndex)) {
      const newProgress = [...completedVideos, currentVideoIndex];
      setCompletedVideos(newProgress);
      localStorage.setItem(`progress_${course.id}`, JSON.stringify(newProgress));
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col pt-20 font-sans">
       {/* Top Navigation Bar */}
       <header className="bg-slate-900 border-b border-slate-800 text-white p-6 lg:px-12 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-20">
          <div>
             <h1 className="text-2xl md:text-3xl font-black tracking-tight">{course.title}</h1>
             <p className="text-slate-400 font-medium text-sm mt-1">{completedVideos.length} of {course.videos.length} lessons completed</p>
          </div>
          <div className="flex items-center gap-5 w-full md:w-auto">
             <div className="text-lg font-black text-emerald-400 shrink-0">{progressPercent}%</div>
             <div className="w-full md:w-64 h-3 bg-slate-800 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-700 ease-out" style={{ width: `${progressPercent}%` }}></div>
             </div>
          </div>
       </header>

       {/* Main Player Area */}
       <div className="max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row gap-8 p-6 lg:p-10 flex-1">
          
          <div className="flex-1 w-full flex flex-col">
             <div className="bg-black rounded-[32px] overflow-hidden aspect-video shadow-2xl ring-1 ring-slate-200">
                <iframe 
                  src={`${currentVideo.url}?autoplay=0&rel=0&modestbranding=1`} 
                  className="w-full h-full border-0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  title={currentVideo.title}
                />
             </div>
             
             <div className="bg-white p-8 mt-8 rounded-[32px] shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
                {completedVideos.includes(currentVideoIndex) && (
                   <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400 blur-3xl opacity-20 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
                )}
                
                <div className="relative z-10">
                   <h2 className="text-3xl font-black text-slate-800 tracking-tight">{currentVideo.title}</h2>
                   <div className="flex items-center gap-3 mt-3">
                      <span className={`px-3 py-1 text-xs font-black uppercase tracking-wider rounded-lg shadow-sm border ${completedVideos.includes(currentVideoIndex) ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-blue-100 text-blue-700 border-blue-200'}`}>
                         {completedVideos.includes(currentVideoIndex) ? 'Completed' : 'In Progress'}
                      </span>
                   </div>
                </div>
                
                <button 
                  onClick={handleMarkComplete}
                  disabled={completedVideos.includes(currentVideoIndex)}
                  className={`relative z-10 px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-xl active:scale-95 w-full md:w-auto ${
                     completedVideos.includes(currentVideoIndex) 
                     ? 'bg-emerald-50 text-emerald-600 shadow-emerald-500/10 border border-emerald-200 cursor-default' 
                     : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30 hover:-translate-y-1'
                  }`}
                >
                  {completedVideos.includes(currentVideoIndex) ? 'Module Done! 🎉' : 'Mark as Complete'}
                </button>
             </div>
          </div>

          <div className="lg:w-[480px] shrink-0">
             <div className="bg-white rounded-[32px] shadow-lg border border-slate-200 overflow-hidden flex flex-col h-full lg:max-h-[calc(100vh-180px)]">
                <div className="p-8 border-b border-slate-100 bg-slate-50 relative z-10 shadow-sm">
                   <h3 className="font-black text-2xl text-slate-800 tracking-tight">Course Content</h3>
                   <p className="text-sm font-medium text-slate-500 mt-2">Track your expedition path</p>
                </div>
                
                <div className="overflow-y-auto flex-1 p-4 scrollbar-thin scrollbar-thumb-slate-200">
                   <ul className="space-y-2">
                      {course.videos.map((vid, idx) => {
                         const isActive = currentVideoIndex === idx;
                         const isDone = completedVideos.includes(idx);
                         
                         return (
                           <li key={idx}>
                              <button
                                onClick={() => setCurrentVideoIndex(idx)}
                                className={`w-full text-left p-5 rounded-2xl transition-all flex items-start gap-4 border group ${
                                   isActive 
                                   ? 'bg-blue-50/80 border-blue-200 shadow-md shadow-blue-500/5 ring-1 ring-blue-500/20' 
                                   : 'bg-white border-transparent hover:border-slate-200 hover:bg-slate-50'
                                }`}
                              >
                                 <div className={`shrink-0 mt-0.5 transition-colors ${isActive ? 'text-blue-500' : isDone ? 'text-emerald-500' : 'text-slate-300 group-hover:text-slate-400'}`}>
                                    {isDone ? (
                                       <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                    ) : isActive ? (
                                       <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    ) : (
                                       <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    )}
                                 </div>
                                 <div>
                                    <span className={`block font-black text-lg tracking-tight transition-colors ${isActive ? 'text-blue-900' : isDone ? 'text-slate-500' : 'text-slate-700'}`}>
                                       {idx + 1}. {vid.title}
                                    </span>
                                    {isActive && <span className="text-xs font-bold text-blue-500 uppercase tracking-widest mt-1 block">Now Playing</span>}
                                 </div>
                              </button>
                           </li>
                         );
                      })}
                   </ul>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}