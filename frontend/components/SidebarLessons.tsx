"use client";
import React from 'react';

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

interface SidebarLessonsProps {
  sections: Section[];
  activeLessonId: number;
  onSelectLesson: (id: number) => void;
}

export default function SidebarLessons({ sections, activeLessonId, onSelectLesson }: SidebarLessonsProps) {
  return (
    <div className="h-full flex flex-col bg-white border-x border-slate-200 w-full max-w-[350px] overflow-y-auto">
      <div className="p-4 border-b border-slate-200 bg-slate-50 sticky top-0 z-10">
        <h3 className="font-bold text-slate-900">Course Content</h3>
      </div>
      
      <div className="flex-1">
        {sections.map((section, sIdx) => (
          <div key={section.id} className="border-b border-slate-200 last:border-0">
            <div className="p-4 bg-slate-50 cursor-pointer flex justify-between items-center group">
              <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-700 transition-colors">
                 Section {sIdx + 1}: {section.title}
              </h4>
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
            
            <div className="flex flex-col">
              {section.lessons.map((lesson, lIdx) => {
                const isActive = lesson.id === activeLessonId;
                return (
                  <button 
                    key={lesson.id} 
                    onClick={() => onSelectLesson(lesson.id)}
                    className={`text-left p-4 transition-all flex gap-3 text-sm ${isActive ? 'bg-blue-50 border-l-4 border-blue-600' : 'hover:bg-slate-50 border-l-4 border-transparent'}`}
                  >
                    <div className="mt-0.5">
                       {isActive ? (
                          <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center">
                             <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                          </div>
                       ) : (
                          <div className="w-4 h-4 rounded-sm border-2 border-slate-300"></div>
                       )}
                    </div>
                    <div>
                      <div className={`font-medium ${isActive ? 'text-blue-900' : 'text-slate-700'}`}>
                         {lIdx + 1}. {lesson.title}
                      </div>
                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                         <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                         {lesson.duration || "10 min"}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
