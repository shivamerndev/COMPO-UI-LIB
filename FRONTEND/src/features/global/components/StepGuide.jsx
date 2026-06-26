export default function StepsGuide() {

  const steps = [
    {
      number: '01',
      title: 'Install Library',
      description: 'npm install virtual-ui-library to access all prebuilt UI components.'
    },
    {
      number: '02',
      title: 'Use Components',
      description: 'Import and customize with props for any design requirement.'
    },
    {
      number: '03',
      title: 'Generate with AI',
      description: 'Describe your UI and let AI build the component for you.'
    },
    {
      number: '04',
      title: 'Copy & Use',
      description: 'Paste the clean JSX code straight into your project.'
    }
  ];

  return (
    <div className="w-full px-8 py-16 relative overflow-hidden bg-slate-950/40">
      <div className="max-w-6xl mx-auto">
        <div className="relative">

          <div className="text-center mb-10">
            <p className="text-cyan-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2">WORKFLOW</p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Your Workflow in 4 Simple Steps
            </h2>
          </div>

          {/* Connecting line (Visible only on desktop to prevent mobile layout breaking) */}
          <div className="absolute top-32 left-[12.5%] w-[75%] h-0.5 bg-gradient-to-r from-cyan-500/10 via-cyan-400/30 to-cyan-500/10 hidden md:block"></div>

          {/* Steps container */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-12 md:gap-6 relative">
            {steps.map((step) => (
              <div key={step.number} className="group flex flex-col items-center relative z-10 flex-1">
                {/* Step number button */}
                <div className="w-16 h-16 rounded-2xl border border-cyan-500/30 flex items-center justify-center mb-6 bg-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.05)] group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] group-hover:scale-105 transition-all duration-300">
                  <span className="text-xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">{step.number}</span>
                </div>

                {/* Step content */}
                <div className="text-center">
                  <h3 className="text-white font-semibold text-base mb-2 tracking-tight group-hover:text-cyan-300 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}