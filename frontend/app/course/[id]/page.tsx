{/* Main Course Content */ }
<div className="max-w-7xl mx-auto px-6 lg:px-10 mt-16 md:-mt-8 relative z-10">
   <div className="md:w-3/5 lg:w-2/3 md:pr-12">

      {/* ❌ REMOVED PREVIEW VIDEO COMPLETELY */}

      <div className="mb-16">
         <h3 className="text-3xl font-black text-slate-800 mb-8">
            Skills You'll Discover
         </h3>

         <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
            {[
               "Master foundational syntaxes and logic flow.",
               "Build responsive layouts spanning all devices.",
               "Handle state smoothly leading to bug-free tools.",
               "Create mesmerizing UIs like a true frontend artisan.",
               "Optimize rendering paths automatically.",
               "Automate testing to free up developer time."
            ].map((item, i) => (
               <div key={i} className="flex gap-4 text-slate-700 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 items-start hover:-translate-y-1 transition-transform">
                  <div className="bg-sky-100 text-sky-600 rounded-lg p-1.5 mt-0.5 shrink-0">
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                     </svg>
                  </div>
                  <span className="font-bold leading-snug">{item}</span>
               </div>
            ))}
         </div>
      </div>

   </div>
</div>