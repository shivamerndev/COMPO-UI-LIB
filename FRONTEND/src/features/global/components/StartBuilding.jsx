import { Sparkles, Grid3x3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function StartBuildingUI() {

  const router = useNavigate();

  return (
    <div className="py-16 w-full flex items-center justify-center px-4 relative z-10">
      {/* Main Container */}
      <div className="bg-linear-to-br from-slate-900 via-slate-950 to-cyan-950/20 border border-slate-800/80 p-8 md:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-4xl text-center relative overflow-hidden backdrop-blur-xl">
        {/* Decorative corner glows */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Eyebrow Label */}
        <div className="mb-6 relative z-10">
          <p className="text-cyan-400 text-xs sm:text-sm font-semibold tracking-widest uppercase">
            Start Building
          </p>
        </div>

        {/* Main Heading */}
        <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight tracking-tight relative z-10">
          Ready to generate
          <br />
          your new component?
        </h2>

        {/* Description */}
        <p className="mb-6 text-slate-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto relative z-10">
          Sign in with Google, get 150 free AI Credits, and start generating production-ready UI components instantly.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
          {/* Primary Button */}
          <button 
            onClick={() => router("/generate")} 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-semibold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.45)] transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Sparkles size={18} className="stroke-current" />
            Get Started Free
          </button>
        </div>
      </div>
    </div>
  );
}