"use client";
import React, { useState } from 'react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && (isLogin || (fullName && phone))) {
      localStorage.setItem("token", "demo-token");
      const pendingRedirect = localStorage.getItem("pending_redirect");
      if (pendingRedirect) {
        localStorage.removeItem("pending_redirect");
        window.location.href = pendingRedirect;
      } else {
        window.location.href = "/";
      }
    }
  };

  return (
    <div className="hero-snow-bg min-h-screen flex items-center justify-center p-6 relative overflow-hidden -mt-[72px]">
      <div className="hero-aurora"></div>

      {/* Decorative snowy shapes */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-[80px] mix-blend-overlay"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-sky-300/20 rounded-full blur-[100px] mix-blend-overlay"></div>

      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl p-10 sm:p-12 rounded-[40px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-white/60 relative z-10 animate-in fade-in zoom-in-95 duration-500">
        
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-[24px] flex items-center justify-center shadow-xl shadow-blue-500/30 mx-auto mb-6 transform -rotate-6">
             <svg className="w-10 h-10 text-white rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isLogin ? "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" : "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"} />
             </svg>
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">
            {isLogin ? "Welcome Back, Explorer!" : "Create an Account"}
          </h2>
          <p className="mt-3 text-slate-500 font-bold">
            {isLogin ? "Your learning journey missed you." : "Start your magical learning journey."}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-black text-slate-600 mb-2 uppercase tracking-wide">Full Name</label>
                <input
                  type="text"
                  required={!isLogin}
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 text-slate-800 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-colors font-bold"
                  placeholder="Frosty the Snowman"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-black text-slate-600 mb-2 uppercase tracking-wide">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 text-slate-800 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-colors font-bold"
                placeholder="frosty@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            
            {!isLogin && (
              <div>
                <label className="block text-sm font-black text-slate-600 mb-2 uppercase tracking-wide">Phone Number</label>
                <input
                  type="tel"
                  required={!isLogin}
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 text-slate-800 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-colors font-bold"
                  placeholder="123-456-7890"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
            )}
            
            <div>
              <div className="flex items-center justify-between mb-2">
                 <label className="block text-sm font-black text-slate-600 uppercase tracking-wide">{isLogin ? "Password" : "Create Password"}</label>
                 {isLogin && <a href="#" className="font-extrabold text-sm text-blue-500 hover:text-blue-600">Recover?</a>}
              </div>
              <input
                type="password"
                required
                className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 text-slate-800 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-colors font-bold tracking-widest"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-4 px-4 border border-transparent text-lg font-black rounded-2xl text-white bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/30 transition-all active:scale-[0.98] mt-8 hover:-translate-y-1"
          >
            {isLogin ? "Let Me In!" : "Join Now"}
          </button>
        </form>
        
        <div className="text-center mt-8 pt-8 border-t-2 border-slate-100 border-dashed">
          <p className="text-slate-500 font-bold">
            {isLogin ? "Curious about learning? " : "Already have an account? "}
            <button 
               type="button" 
               onClick={() => setIsLogin(!isLogin)} 
               className="font-black text-blue-500 hover:text-blue-600"
            >
              {isLogin ? "Sign up free" : "Log in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
