"use client";
import React, { useState, useEffect } from 'react';

export default function SnowMascot() {
  const messages = [
    "Hey there! Ready to build a new skill today?",
    "You bring the curiosity, I'll bring the snowflakes!",
    "Learning is better when it's cool... literally ❄️",
    "If you get stuck, I'm right here!"
  ];
  
  const [currentMessage, setCurrentMessage] = useState(messages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-end justify-center mascot-bounce group" title="Fun fact: Frosty has taken 432 courses.">
      {/* Speech Bubble */}
      <div className="absolute -top-20 -right-20 bg-white text-slate-800 text-sm font-bold px-5 py-3 rounded-2xl shadow-lg border border-slate-100 z-20 hidden sm:block max-w-[200px] text-center transition-all duration-300">
        {currentMessage}
        <div className="absolute -bottom-2 left-10 w-4 h-4 bg-white transform rotate-45 border-r border-b border-slate-100"></div>
      </div>
      
      {/* Simple SVG Snowman */}
      <div className="relative w-32 h-40">
         <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Bottom Body */}
            <circle cx="50" cy="85" r="30" fill="white" stroke="#e2e8f0" strokeWidth="2" />
            <circle cx="50" cy="75" r="3" fill="#334155" />
            <circle cx="50" cy="90" r="3" fill="#334155" />
            <circle cx="50" cy="105" r="3" fill="#334155" />
            
            {/* Middle Body */}
            <circle cx="50" cy="45" r="22" fill="white" stroke="#e2e8f0" strokeWidth="2" />
            <circle cx="50" cy="40" r="2.5" fill="#334155" />
            <circle cx="50" cy="55" r="2.5" fill="#334155" />
            
            {/* Scarf */}
            <path d="M28 45 Q50 60 72 45 L65 55 Q50 65 35 55 Z" fill="#ef4444" />
            <path d="M65 50 L75 80 L65 80 Z" fill="#ef4444" />
            
            {/* Head */}
            <circle cx="50" cy="20" r="16" fill="white" stroke="#e2e8f0" strokeWidth="2" />
            
            {/* Eyes */}
            <circle cx="44" cy="16" r="2" fill="#0f172a" />
            <circle cx="56" cy="16" r="2" fill="#0f172a" />
            
            {/* Carrot Nose */}
            <path d="M50 20 L65 24 L50 22 Z" fill="#f97316" />
            
            {/* Smile */}
            <path d="M44 26 Q50 30 56 26" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            
            {/* Arms */}
            <path d="M72 45 L90 30" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
            <path d="M82 35 L90 40" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" />
            
            <path d="M28 45 L10 30" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
            <path d="M18 35 L10 40" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" />
            
            {/* Hat */}
            <path d="M30 6 L70 6 L65 4 L35 4 Z" fill="#334155" />
            <rect x="38" y="-12" width="24" height="18" fill="#334155" />
            <rect x="38" y="2" width="24" height="4" fill="#ef4444" />
         </svg>
      </div>
    </div>
  );
}
