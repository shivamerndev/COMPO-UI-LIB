export default function CodeEditorCard() {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 md:px-0 flex items-center justify-center mt-12 transition-all duration-500 hover:scale-[1.02]">
      <div className="bg-slate-950/80 backdrop-blur-xl w-full rounded-2xl overflow-hidden border border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] font-mono relative">
        {/* Glow overlay inside the editor */}
        <div className="absolute top-0 right-1/4 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Title Bar */}
        <div className="bg-slate-900/60 px-5 py-4 flex items-center justify-between border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            {/* Traffic Light Buttons */}
            <div className="flex gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-red-500/80 hover:bg-red-500 transition duration-150 cursor-pointer shadow-sm"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition duration-150 cursor-pointer shadow-sm"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-green-500/80 hover:bg-green-500 transition duration-150 cursor-pointer shadow-sm"></div>
            </div>
            {/* Filename */}
            <span className="text-slate-400 text-sm font-medium ml-2 select-none">App.jsx</span>
          </div>
          <span className="text-slate-600 text-xs select-none">React</span>
        </div>

        {/* Code Content */}
        <div className="p-6 overflow-x-auto">
          <div className="text-slate-300 text-sm leading-relaxed space-y-2.5">
            {/* Line 1: Import */}
            <div className="flex items-center">
              <span className="text-slate-600 text-xs w-6 select-none">1</span>
              <span className="text-pink-400">import</span>
              <span className="text-slate-300"> {'{ '}</span>
              <span className="text-cyan-400">Button</span>
              <span className="text-slate-300">, </span>
              <span className="text-cyan-400">Card</span>
              <span className="text-slate-300"> {'} '}</span>
              <span className="text-pink-400">from</span>
              <span className="text-teal-300"> 'virtual-ui'</span>
              <span className="text-slate-300">;</span>
            </div>

            {/* Line 2: Empty line */}
            <div className="flex items-center">
              <span className="text-slate-600 text-xs w-6 select-none">2</span>
              <span>&nbsp;</span>
            </div>

            {/* Line 3: Export */}
            <div className="flex items-center">
              <span className="text-slate-600 text-xs w-6 select-none">3</span>
              <span className="text-pink-400">export</span>
              <span className="text-pink-400"> default</span>
              <span className="text-pink-400"> function</span>
              <span className="text-yellow-300"> App</span>
              <span className="text-slate-300">() {'{'}</span>
            </div>

            {/* Line 4: Return */}
            <div className="flex items-center">
              <span className="text-slate-600 text-xs w-6 select-none">4</span>
              <span className="text-slate-400 ml-4">return</span>
              <span className="text-slate-300"> (</span>
            </div>

            {/* Line 5: Card Component */}
            <div className="flex items-center">
              <span className="text-slate-600 text-xs w-6 select-none">5</span>
              <span className="text-slate-300 ml-8">{'<'}</span>
              <span className="text-cyan-400 font-medium">Card</span>
              <span className="text-slate-300"> </span>
              <span className="text-yellow-400/90">title</span>
              <span className="text-slate-300">=</span>
              <span className="text-teal-300">"Dashboard"</span>
              <span className="text-slate-300">{'>'}</span>
            </div>

            {/* Line 6: Button Component */}
            <div className="flex items-center">
              <span className="text-slate-600 text-xs w-6 select-none">6</span>
              <span className="text-slate-300 ml-12">{'<'}</span>
              <span className="text-cyan-400 font-medium">Button</span>
              <span className="text-slate-300"> </span>
              <span className="text-yellow-400/90">variant</span>
              <span className="text-slate-300">=</span>
              <span className="text-teal-300">"primary"</span>
              <span className="text-slate-300"> </span>
              <span className="text-yellow-400/90">onClick</span>
              <span className="text-slate-300">=</span>
              <span className="text-indigo-400">{'{'}</span>
              <span className="text-yellow-300">handleClick</span>
              <span className="text-indigo-400">{'}'}</span>
              <span className="text-slate-300">{' />'}</span>
            </div>

            {/* Line 7: Closing Card */}
            <div className="flex items-center">
              <span className="text-slate-600 text-xs w-6 select-none">7</span>
              <span className="text-slate-300 ml-8">{'</'}</span>
              <span className="text-cyan-400 font-medium">Card</span>
              <span className="text-slate-300">{'>'}</span>
            </div>

            {/* Line 8: Close return */}
            <div className="flex items-center">
              <span className="text-slate-600 text-xs w-6 select-none">8</span>
              <span className="text-slate-300 ml-4">);</span>
            </div>

            {/* Line 9: Close function */}
            <div className="flex items-center">
              <span className="text-slate-600 text-xs w-6 select-none">9</span>
              <span className="text-slate-300">{'}'}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}