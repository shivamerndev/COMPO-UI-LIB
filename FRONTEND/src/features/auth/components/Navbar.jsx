import { Zap, Sparkles } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.user);
 

    return (
        <nav className="relative z-10 flex items-center justify-between px-6 sm:px-8 py-6">

            <Link to="/" className="flex items-center gap-2 cursor-pointer">
                <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-slate-900" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">CompoLab</span>
            </Link>

            {/* Nav Items */}
            <div className="flex items-center gap-4">

                <div className="flex items-center gap-4">

                    {user.role === "user" && <div id="right" className='flex items-center justify-end flex-1 min-w-[180px]'>
                        <Link
                            to="/pricing"
                            className='relative inline-flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-cyan-500/10 hover:from-cyan-500/20 hover:to-cyan-500/20 border border-cyan-500/25 hover:border-cyan-500/40 rounded-full text-cyan-200 text-sm font-semibold no-underline cursor-pointer transition-all duration-300 shadow-md hover:shadow-cyan-500/10 hover:-translate-y-0.5 active:translate-y-0 group'>
                            <Sparkles size={16} className={" group-hover:rotate-12 transition-transform duration-300 " + (user.role === "admin" ? "text-yellow-600" : "text-cyan-400")} />
                            <span>Token : {user.aiCredits}</span>
                        </Link>
                    </div>}

                    <button onClick={()=>navigate("/generate")} className="bg-cyan-500/10 cursor-pointer hover:bg-cyan-500/30 text-yellow-400 border border-cyan-500/40 px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2 text-sm" >
                        <Sparkles className="w-4 h-4 text-yellow-600" />
                        <span className="hidden sm:inline">Generate</span>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;