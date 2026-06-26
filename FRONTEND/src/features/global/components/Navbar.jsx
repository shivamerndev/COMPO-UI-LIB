import { Zap, LogOut, User, Sparkles } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../auth/hooks/useAuth';

const Navbar = () => {

    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.user);
    const { handleLogout } = useAuth();

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

                {user ? (
                    <div className="flex items-center gap-4">

                        {user.role === "user" && <Link
                            to="/pricing"
                            className='relative inline-flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-cyan-500/20 border border-cyan-500/25 hover:border-cyan-500/40 rounded-full text-cyan-200 text-sm font-semibold no-underline cursor-pointer transition-all duration-300 shadow-md hover:shadow-cyan-500/10 hover:-translate-y-0.5 active:translate-y-0 group'>
                            <Sparkles size={16} className={" group-hover:rotate-12 transition-transform duration-300 " + (user.role === "admin" ? "text-yellow-600" : "text-cyan-400")} />
                            <span>Token : {user.aiCredits}</span>
                        </Link>}

                        <div onClick={() => navigate("/profile")} className={`flex items-center gap-3 cursor-pointer rounded-md border border-slate-700 px-4 py-1.5 transition-all duration-200 hover:scale-105 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 ${user.role === "admin" ? "bg-gradient-to-r from-cyan-600/30 to-purple-600/30" : "bg-slate-800/80 hover:bg-slate-700/80"}`}> <div className={"w-6 h-6 rounded-full bg-cyan-400 flex items-center justify-center font-bold text-sm shadow-md " + (user.role === "admin" ? "text-yellow-600" : "text-pink-400")}>
                            {user?.fullName ? (
                                user.fullName[0].toUpperCase()
                            ) : (
                                <User size={14} />
                            )}
                        </div>

                            <span className="hidden sm:inline text-sm font-semibold text-gray-100">
                                {user?.fullName}
                            </span>
                        </div>

                        <button onClick={handleLogout} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2 text-sm" >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>) : (<button onClick={() => navigate('/g/login')} className="bg-cyan-400 cursor-pointer hover:bg-cyan-500 text-slate-900 px-6 py-2 rounded-lg font-semibold transition flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Login
                    </button>)
                }
            </div>
        </nav>
    )
}

export default Navbar;