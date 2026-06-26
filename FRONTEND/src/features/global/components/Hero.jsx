import { Zap, Copy, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CodeEditorCard from './CodeCard';

const Hero = () => {

    const router = useNavigate()

    const [copied, setCopied] = useState(false);

    const copyCommand = () => {
        navigator.clipboard.writeText('npm install compo-ui-lib');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 py-10">
            {/* Glowing background ambient lights */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
            <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

            {/* Badge */}
            <div className="inline-block mb-2 animate-fade-in">
                <div className="px-4 py-1.5 border border-cyan-500/30 rounded-full bg-cyan-950/20 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.08)]">
                    <span className="text-cyan-400 text-xs  font-semibold tracking-wide flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></span>
                        AI-POWERED REACT UI LIBRARY
                    </span>
                </div>
            </div>

            {/* Main Heading */}
            <div className="text-center mb-4 max-w-4xl">
                <h1 className="text-6xl font-semibold tracking-tight text-white leading-tight">
                    Build React UI
                </h1>
                <h2 className="text-5xl  font-semibold bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-400 bg-clip-text text-transparent tracking-tight leading-tight">
                    Faster with AI
                </h2>
            </div>

            {/* Description */}
            <div className="text-center max-w-2xl mb-6">
                <p className="text-slate-400 text-base  leading-relaxed">
                    Use high-fidelity prebuilt components or generate custom ones with AI. Copy clean, production-ready JSX code directly in seconds.
                </p>
            </div>

            {/* Code Block */}
            <div className="bg-slate-900/40 border border-slate-800 hover:border-cyan-500/20 rounded-lg px-4 py-2 mb-8 backdrop-blur-md max-w-md w-full shadow-2xl transition-all duration-300 group/code relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-cyan-500/5 to-transparent opacity-0 group-hover/code:opacity-100 transition-opacity duration-500"></div>
                <div className="flex items-center justify-between relative z-10">
                    <code className="text-cyan-300 text-sm  font-mono flex-1 select-all tracking-wide">
                        $  npm install compo-ui-lib
                    </code>
                    <button
                        onClick={copyCommand}
                        className="ml-4 p-2 hover:bg-slate-800/80 active:scale-95 rounded-xl transition-all duration-200"
                        title="Copy to clipboard"
                    >
                        <Copy className="w-4 h-4 text-gray-400 hover:text-cyan-400" />
                    </button>
                </div>
                {copied && (
                    <p className="text-xs text-cyan-400 mt-2 select-none absolute bottom-1 right-4 animate-pulse">Copied!</p>
                )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-lg mb-8">
                <button
                    onClick={() => router("/c/list")}
                    className="w-full sm:w-auto bg-linear-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 px-6 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:shadow-[0_0_30px_rgba(34,211,238,0.35)] transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                    Get Started
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                </button>
                <button
                    onClick={() => router("/generate")}
                    className="w-full sm:w-auto border border-slate-800 hover:border-cyan-400 hover:bg-cyan-400/5 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                    <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
                    Generate AI Component
                </button>
            </div>

            <CodeEditorCard />
        </div>
    )
}

export default Hero