import StartBuildingUI from '../components/StartBuilding';
import ShowcaseCards from '../components/ShowCaseCards';
import StepsGuide from '../components/StepGuide';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';


export default function Home() {


  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-10"></div>
      </div>

      <Navbar />
      <Hero />
      {/* Bottom accent line */}
      <div className="relative z-10 h-px bg-linear-to-r from-transparent via-cyan-500/20 to-transparent"></div>
      <ShowcaseCards />
      <StepsGuide />
      <StartBuildingUI />
    </div>
  );
}
