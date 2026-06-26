import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import FeatureCard from "../components/FeatureCard";
import { LogIn, Sparkles, Sliders, Blocks, Copy, LayoutTemplate } from "lucide-react";
import useAuth from "../hooks/useAuth.js";
import { useEffect, useState, useRef } from "react";

const Login = () => {

    const { handleGoogleAuth } = useAuth();

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);


    return (
        <div ref={containerRef} className="relative min-h-screen w-full px-4 flex justify-center items-center bg-slate-950 bg-dot-grid overflow-hidden">

            {/* Ambient background glows */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] animate-float-slow pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] animate-float-slower pointer-events-none" />

            {/* Mouse-tracking interactive glow */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                    background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.08), transparent 80%)`
                }}
            />

            <div className="z-10 w-full max-w-4xl h-[560px] flex items-center justify-between rounded-2xl border border-white/5 bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden">

                {/* Left Section - Product Showcase */}
                <div className="flex-1 px-10 py-8 h-full flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-cyan-400/10 border border-cyan-400/25 rounded-xl flex items-center justify-center shadow-xs">
                                <LayoutTemplate className="w-5 h-5 text-cyan-400" />
                            </div>
                            <h1 className="font-space text-xl font-medium tracking-tight text-white">VirtualUI</h1>
                        </div>

                        {/* How It Works Section */}
                        <div className="space-y-4">
                            <h2 className="font-space text-cyan-400/80 text-[10px] font-medium tracking-widest uppercase">HOW IT WORKS</h2>

                            {/* Feature Items */}
                            <div className="space-y-2">
                                {[
                                    { icon: LogIn, title: "Login With Google" },
                                    { icon: Sparkles, title: "Get 150 AI Credits" },
                                    { icon: Sliders, title: "Customize Props" },
                                    { icon: Blocks, title: "Generate Components" },
                                    { icon: Copy, title: "Copy or Save" }
                                ].map((e, index) => (
                                    <FeatureCard key={index} icon={e.icon} title={e.title} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Subtle footer accent on left */}
                    <div className="font-outfit text-slate-500 text-xs">
                        Accelerating frontend workflows.
                    </div>
                </div>

                {/* Right Section - Authenticative Area */}
                <div className="flex-1 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md border-l border-white/5 h-full px-10">
                    {/* Decorative Icon Wrapper */}
                    <div className="relative group mb-6">
                        <div className="absolute inset-0 bg-cyan-400/20 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative w-14 h-14 bg-slate-900 border border-cyan-400/30 rounded-2xl flex items-center justify-center shadow-inner">
                            <LayoutTemplate className="w-7 h-7 text-cyan-400 animate-pulse-slow" />
                        </div>
                    </div>

                    {/* Welcome Text */}
                    <div className="text-center mb-8">
                        <h2 className="font-space text-2xl font-light text-slate-100 tracking-tight mb-2">Welcome Back</h2>
                        <p className="font-outfit text-slate-400 text-xs leading-relaxed">Sign in to generate AI-powered UI components <br /> in seconds</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="flex justify-between gap-3 mb-8 w-full">
                        {[
                            { kaam: "150", naam: "AI CREDITS" },
                            { kaam: "∞", naam: "COMPONENTS" },
                            { kaam: "JSX", naam: "READY" }
                        ].map(e => (
                            <div key={e.naam} className="group/stat flex-1 py-3 px-2 rounded-xl bg-slate-950/40 border border-white/5 hover:border-cyan-500/20 hover:bg-cyan-950/10 transition-all duration-300 flex flex-col items-center justify-center">
                                <div className="font-space text-lg font-medium text-cyan-400 group-hover/stat:text-cyan-300 transition-colors duration-300">{e.kaam}</div>
                                <div className="font-outfit text-[9px] tracking-wider text-slate-500 group-hover/stat:text-slate-400 transition-colors duration-300 mt-1">{e.naam}</div>
                            </div>
                        ))}
                    </div>

                    {/* OAuth button */}
                    <div className="w-full flex justify-center py-2">
                        <GoogleOAuthProvider clientId="536825012398-1d35bc52gj5vgm01aiso2oeogo7dfcka.apps.googleusercontent.com">
                            <GoogleLogin
                                onSuccess={(credentialResponse) => handleGoogleAuth(credentialResponse)}
                                onError={() => console.log('Login Failed')}
                            />
                        </GoogleOAuthProvider>
                    </div>

                    {/* Footer Note */}
                    <p className="font-outfit text-slate-500 text-xs mt-8">
                        No account needed for npm.{" "}
                        <a href="#" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 decoration-cyan-400/30 transition">
                            View docs →
                        </a>
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Login;