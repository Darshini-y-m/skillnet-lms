"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function AIMentor() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi! I'm your SkillNet AI Mentor ❄️ Ask me anything — from course help to random learning trivia!" }
  ]);
  const [input, setInput] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  const insertSuggestion = (text: string) => {
    setInput(text);
  };
  
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    
    // Educational logic simulator
    setTimeout(() => {
      let aiResponse = "That sounds completely magical! Let me find the best path forward for your journey.";
      const lower = userMsg.toLowerCase();
      
      if (lower.includes("what should i learn today")) {
        aiResponse = "Great question! Here are a few paths you could explore today:\n\n• Web Development – build websites using HTML, CSS and React.\n• Machine Learning – teach computers how to recognize patterns.\n• Cloud Computing – learn how apps run on servers across the internet.\n\nWhich one sounds interesting?";
      } else if (lower.includes("explain machine learning simply") || lower.includes("machine learning")) {
        aiResponse = "Machine learning is a way of teaching computers to learn patterns from data.\n\nExample:\nImagine showing a computer thousands of pictures of cats and dogs.\n\nOver time it learns the patterns that make a cat look like a cat.\n\nThen when it sees a new picture, it can guess whether it is a cat or dog.\n\nIn simple terms:\nMachine Learning = Learning from data instead of being manually programmed.";
      } else if (lower.includes("python")) {
        aiResponse = "Python is a powerful, beginner-friendly programming language. It's used in everything from web development and data science to AI. The syntax reads almost like plain English!\n\nSuggestion: Try our 'Python for AI' course to get started.";
      } else if (lower.includes("react") || lower.includes("frontend")) {
        aiResponse = "React is a JavaScript library for building stunning user interfaces. It lets you create interactive UI components that update efficiently when your data changes.\n\nSuggestion: Check out our 'Frontend Mastery' track!";
      } else if (lower.includes("cloud")) {
        aiResponse = "Cloud computing simply means renting computing power, storage, and databases from companies like Amazon or Google, instead of buying your own physical hardware.\n\nSuggestion: Our 'Cloud Fundamentals' course is a great starting point.";
      } else if (lower.includes("database") || lower.includes("sql")) {
        aiResponse = "Databases are organized collections of data, making it easy to access, manage, and update information securely. Relational databases use SQL to interact with this data like a fast, robust spreadsheet.";
      } else if (lower.includes("tip") || lower.includes("coding tip")) {
        aiResponse = "Here's a quick coding tip: Always name your variables based on what they do, not just random letters. `let userAge = 25` is infinitely cooler than `let x = 25`. ❄️";
      }

      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    }, 1000);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-[140px] h-12 bg-white text-blue-600 font-bold text-sm rounded-full flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all z-40 border border-sky-100 px-4"
      >
        <svg className="w-5 h-5 text-sky-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/></svg>
        AI Mentor
      </button>

      {/* Side Chat Panel */}
      <div className={`fixed inset-y-0 right-0 w-80 sm:w-96 glass-card shadow-2xl z-50 transform transition-transform duration-500 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 bg-gradient-to-r from-blue-600 to-sky-400 text-white flex justify-between items-center rounded-tl-3xl shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            <div>
               <h3 className="font-extrabold text-sm tracking-wide">SkillNet Mentor</h3>
               <p className="text-xs text-sky-100 font-medium">Ready to help</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div ref={chatRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`whitespace-pre-wrap max-w-[85%] p-4 rounded-2xl text-[15px] font-medium leading-relaxed shadow-sm ${
                m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-sm' 
                  : 'bg-white border border-slate-100 text-slate-700 rounded-bl-sm shadow-[0_4px_10px_rgba(0,0,0,0.03)]'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
        
        <div className="px-4 pb-2 pt-3 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto scrollbar-hide">
           <button onClick={() => insertSuggestion("What should I learn today?")} className="shrink-0 bg-white text-blue-600 text-xs font-bold px-3 py-1.5 rounded-full border border-blue-100 hover:bg-blue-50 transition-colors shadow-sm">What should I learn today?</button>
           <button onClick={() => insertSuggestion("Explain machine learning simply.")} className="shrink-0 bg-white text-blue-600 text-xs font-bold px-3 py-1.5 rounded-full border border-blue-100 hover:bg-blue-50 transition-colors shadow-sm">Explain machine learning simply.</button>
           <button onClick={() => insertSuggestion("Give me a quick coding tip.")} className="shrink-0 bg-white text-blue-600 text-xs font-bold px-3 py-1.5 rounded-full border border-blue-100 hover:bg-blue-50 transition-colors shadow-sm">Give me a quick coding tip.</button>
        </div>

        <div className="p-4 bg-white">
          <form onSubmit={handleSend} className="relative flex items-center bg-sky-50 rounded-2xl p-1 border border-sky-100 focus-within:ring-2 focus-within:ring-blue-500/30 transition-all">
            <input 
              type="text" 
              className="w-full bg-transparent pl-4 pr-12 py-3 text-sm focus:outline-none text-slate-800 placeholder-slate-400 font-medium"
              placeholder="Ask me something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" disabled={!input.trim()} className="absolute right-2 p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 transition-colors shadow-md shadow-blue-500/20">
              <svg className="w-4 h-4 translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
