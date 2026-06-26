import React from 'react'
import { Star } from 'lucide-react'

const FeatureCard = ({ title, icon }) => {
    return (
        <div className="group flex items-center gap-4 p-4 rounded-xl cursor-pointer border border-cyan-500/10 hover:border-cyan-500/35 bg-slate-900/30 hover:bg-cyan-950/20 shadow-xs hover:shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:translate-x-1">
            <div className="w-10 h-10 shrink-0 bg-cyan-400/10 border border-cyan-400/25 rounded-lg flex items-center justify-center group-hover:scale-105 group-hover:bg-cyan-400/25 group-hover:border-cyan-400/40 transition-all duration-300">
                {icon ? (
                    React.createElement(icon, { className: "w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" })
                ) : (
                    <Star className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                )}
            </div>
            <div>
                <h3 className="font-outfit text-sm font-medium text-slate-200 group-hover:text-cyan-300 transition-colors duration-300">{title}</h3>
                {title.startsWith("Login") ? (
                    <p className="font-outfit text-slate-400 text-xs mt-0.5 group-hover:text-slate-300 transition-colors duration-300">Secure OAuth to unlock all AI tools instantly.</p>
                ) : (
                    <p className="font-outfit text-slate-400 text-xs mt-0.5 group-hover:text-slate-300 transition-colors duration-300">Click to preview features and documentation.</p>
                )}
            </div>
        </div>
    )
}

export default FeatureCard