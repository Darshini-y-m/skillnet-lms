"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function AIMentor() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mode, setMode] = useState("Study");
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm your SkillNet AI Mentor ❄️ Ask me anything — from course help to random learning trivia!" }
  ]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  
  const chatRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const insertSuggestion = (text: string) => {
    setInput(text);
  };
  
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isOpen, isExpanded]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() && !file) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMessage || (file ? `[Attached File: ${file.name}]` : "") },
    ]);

    setInput("");

    try {
      console.log("Sending request...");

      const formData = new FormData();
      formData.append("message", userMessage);
      formData.append("mode", mode);
      if (file) {
        formData.append("file", file);
      }

      const res = await fetch("http://127.0.0.1:5000/ai/chat", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Backend error:", text);
        throw new Error("API failed");
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.reply },
      ]);
      
      setFile(null);
      
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Connection error. Check backend." },
      ]);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-[140px] h-12 bg-white text-blue-600 font-bold text-sm rounded-full flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all z-40 border border-sky-100 px-4 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <svg className="w-5 h-5 text-sky-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/></svg>
        AI Mentor
      </button>

      {/* Overlay for Sidebar Mode only if needed */}
      {isOpen && !isExpanded && (
        <div 
          className="fixed inset-0 bg-black/10 z-[90] transition-opacity md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Dynamic Chat Panel */}
      <div 
        className={`fixed transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col overflow-hidden z-[9999]
          ${!isOpen 
            ? 'translate-x-full right-0 inset-y-0 w-80 sm:w-96 opacity-0 shadow-2xl bg-white' 
            : isExpanded 
              ? 'top-0 left-0 w-[100vw] h-[100vh] opacity-100 bg-slate-50/95 backdrop-blur-md' 
              : 'inset-y-0 right-0 w-80 sm:w-96 opacity-100 translate-x-0 rounded-l-3xl shadow-2xl bg-white'}
        `}
      >
        <div className={`p-4 sm:p-5 text-white flex justify-between items-center shadow-md z-10 shrink-0 ${isExpanded ? 'bg-white shadow-sm border-b border-slate-200' : 'bg-gradient-to-r from-blue-600 to-sky-400'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md ${isExpanded ? 'bg-blue-100 text-blue-600' : 'bg-white/20'}`}>
               <svg className="w-5 h-5" fill={isExpanded ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            <div>
               <h3 className={`font-extrabold text-sm sm:text-base tracking-wide ${isExpanded ? 'text-slate-800' : ''}`}>SkillNet Mentor</h3>
               <p className={`text-[11px] sm:text-xs font-medium ${isExpanded ? 'text-slate-500' : 'text-sky-100'}`}>Ready to help</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
             <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className={`p-1.5 sm:p-2 rounded-full transition active:scale-95 ${isExpanded ? 'bg-slate-100 hover:bg-slate-200 text-slate-600' : 'bg-white/10 hover:bg-white/20'}`} 
                title={isExpanded ? "Exit Full Screen" : "Full Screen"}
             >
               {isExpanded ? (
                 <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 14h6m0 0v6m0-6l-7 7m17-11h-6m0 0V4m0 6l7-7M4 10h6m0 0V4m0 6l-7-7m17 11h-6m0 0v6m0-6l7 7" /></svg>
               ) : (
                 <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
               )}
             </button>
             <button 
                onClick={() => { setIsOpen(false); setIsExpanded(false); }} 
                className={`p-1.5 sm:p-2 rounded-full transition active:scale-95 ${isExpanded ? 'bg-slate-100 hover:bg-red-100 hover:text-red-600 text-slate-600' : 'bg-white/10 hover:bg-red-500/80'}`}
                title="Close"
             >
               <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
          </div>
        </div>

        <div ref={chatRef} className={`flex-1 overflow-y-auto space-y-5 ${isExpanded ? 'p-5 w-full bg-transparent' : 'p-4 sm:p-6 bg-slate-50/50'}`}>
          <div className={`${isExpanded ? 'max-w-[800px] w-full mx-auto space-y-5 pb-10' : 'space-y-5'}`}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`whitespace-pre-wrap max-w-[90%] sm:max-w-[85%] p-4 rounded-2xl text-[14px] sm:text-[15px] font-medium leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-sm' 
                    : 'bg-white border border-slate-100 text-slate-700 rounded-bl-sm shadow-[0_4px_10px_rgba(0,0,0,0.03)]'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={`shrink-0 bg-white border-t border-slate-100 flex flex-col ${isExpanded ? '' : ''}`}>
           {/* Modals & Modes */}
           <div className={`px-4 sm:px-5 py-2 flex gap-2 overflow-x-auto scrollbar-hide ${isExpanded ? 'max-w-[800px] mx-auto w-full pt-4' : 'pt-3'}`}>
             {["Study", "Explain", "Quiz", "Code", "Plan"].map((m) => (
                <button 
                  key={m} 
                  onClick={() => setMode(m)} 
                  className={`shrink-0 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full transition-colors ${mode === m ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  {m}
                </button>
             ))}
           </div>

           <div className={`p-4 sm:p-5 pt-2 ${isExpanded ? 'max-w-[800px] mx-auto w-full pb-8' : ''}`}>
             
             {/* Selected File Feedback */}
             {file && (
               <div className="mb-3 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-lg text-xs flex items-center justify-between w-fit max-w-full shadow-sm">
                 <span className="truncate text-blue-700 font-medium">📎 {file.name}</span>
                 <button type="button" onClick={() => setFile(null)} className="ml-3 text-slate-400 hover:text-red-500 font-bold shrink-0 text-base leading-none">✕</button>
               </div>
             )}

             <form onSubmit={handleSend} className="relative flex items-center bg-sky-50 rounded-2xl p-1.5 border border-sky-100 focus-within:ring-2 focus-within:ring-blue-500/30 transition-all shadow-inner">
               
               <input 
                 type="file" 
                 ref={fileInputRef} 
                 className="hidden" 
                 accept=".pdf, image/png, image/jpeg, .txt"
                 onChange={(e) => {
                   if (e.target.files && e.target.files[0]) {
                     setFile(e.target.files[0]);
                   }
                 }}
               />
               
               <button 
                 type="button" 
                 title="Attach a file"
                 onClick={() => fileInputRef.current?.click()}
                 className="p-2 ml-1 text-slate-400 hover:text-blue-500 hover:bg-white rounded-full transition-all active:scale-95"
               >
                 <svg className="w-5 h-5 transform rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
               </button>

               <input 
                 type="text" 
                 className="w-full bg-transparent pl-2 pr-12 py-3 sm:py-4 text-sm sm:text-base focus:outline-none text-slate-800 placeholder-slate-400 font-medium"
                 placeholder={`Ask me something in ${mode} mode...`}
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
               />
               <button type="submit" disabled={!input.trim() && !file} className="absolute right-2 p-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all shadow-md shadow-blue-500/20">
                 <svg className="w-5 h-5 translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" /></svg>
               </button>
             </form>
           </div>
        </div>
      </div>
    </>
  );
}
