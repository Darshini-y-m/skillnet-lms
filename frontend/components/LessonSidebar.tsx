"use client";
import React, { useState } from 'react';

export interface Lesson {
  id: number;
  title: string;
  videoId: string;
  duration?: string;
}

export interface Section {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface LessonSidebarProps {
  sections: Section[];
  activeLessonId: number;
  onSelectLesson: (id: number) => void;
}

export default function LessonSidebar({ sections, activeLessonId, onSelectLesson }: LessonSidebarProps) {
  const [openSections, setOpenSections] = useState<Record<number, boolean>>(() => {
    const state: Record<number, boolean> = {};
    sections.forEach(s => state[s.id] = true);
    return state;
  });

  const toggleSection = (id: number) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 border-r border-slate-200 w-full max-w-[380px] overflow-y-auto">
      
      <div className="p-8 border-b border-slate-200 bg-white sticky top-0 z-10 shadow-sm flex flex-col">
        <h3 className="font-black text-xl text-slate-800 tracking-tight">Expedition Map</h3>
        
        {/* Soft magical progress bar */}
        <div className="mt-5 flex items-center gap-3">
           <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-gradient-to-r from-sky-400 to-blue-500 w-[35%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>
           </div>
           <span className="text-sm font-black text-blue-600">35%</span>
        </div>
      </div>
      
      <div className="flex-1 py-4">
        {sections.map((section, sIdx) => {
          const isOpen = openSections[section.id];
          return (
            <div key={section.id} className="mb-4">
              <div 
                onClick={() => toggleSection(section.id)}
                className="px-8 py-3 cursor-pointer flex justify-between items-center group hover:bg-slate-100 transition-colors"
              >
                <h4 className="font-extrabold text-slate-800 text-[15px] uppercase tracking-wider">
                   Module {sIdx + 1}: {section.title}
                </h4>
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors shadow-sm">
                   <svg className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
              
              <div className={`flex flex-col mt-2 space-y-2 px-4 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-auto opacity-100' : 'max-h-0 opacity-0'}`}>
                {section.lessons.map((lesson, lIdx) => {
                  const isActive = lesson.id === activeLessonId;
                  return (
                    <button 
                      key={lesson.id} 
                      onClick={() => onSelectLesson(lesson.id)}
                      className={`text-left px-5 py-4 rounded-2xl transition-all flex gap-4 text-sm relative overflow-hidden group ${
                         isActive 
                           ? 'bg-blue-600 shadow-lg shadow-blue-500/20' 
                           : 'bg-white hover:bg-white border border-slate-100 hover:shadow-md'
                      }`}
                    >
                      {isActive && <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none"></div>}
                      
                      <div className="shrink-0 mt-0.5 relative z-10">
                         {isActive ? (
                            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-inner">
                               <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse"></div>
                            </div>
                         ) : (
                            <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                               {lIdx + 1}
                            </div>
                         )}
                      </div>
                      
                      <div className="relative z-10">
                        <div className={`font-bold leading-snug mb-1.5 ${isActive ? 'text-white' : 'text-slate-700 group-hover:text-blue-600'}`}>
                           {lesson.title}
                        </div>
                        <div className={`text-xs font-bold flex items-center gap-1.5 ${isActive ? 'text-blue-200' : 'text-slate-400'}`}>
                           <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                           {lesson.duration || "15 min"}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
