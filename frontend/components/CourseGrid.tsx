import React from 'react';
import CourseCard, { Course } from './CourseCard';

interface CourseGridProps {
  courses: Course[];
}

export default function CourseGrid({ courses }: CourseGridProps) {
  if (!courses || courses.length === 0) {
    return (
      <div className="py-24 text-center text-slate-400 bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-slate-200 w-full font-bold leading-loose">
        Hmm... looks like the snowstorm hid the courses.<br/>
        Try refreshing or exploring again!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
      {courses.map((course, idx) => (
        <div key={course.id} style={{ animationDelay: `${idx * 100}ms` }} className="fade-in opacity-0">
           <CourseCard course={course} />
        </div>
      ))}
    </div>
  );
}
