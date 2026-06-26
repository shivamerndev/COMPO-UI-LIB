import useAuth from "../hooks/useAuth"
import handleForm from "../../../utils/formHandler.utils"
import { useNavigate } from "react-router-dom"

const Register = () => {

  const { handleRegister } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
          <form onSubmit={handleForm(handleRegister)} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold bg-linear-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-2">
                Create Account
              </h2>
              <p className="text-gray-300 text-sm">Join us and start building amazing components</p>
            </div>

            <div>
              <input 
                type="text" 
                name="fullName" 
                placeholder="Enter Your Name" 
                required 
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 backdrop-blur-sm"
              />
            </div>

            <div>
              <input 
                name='email' 
                type="email" 
                placeholder='Enter Your Email' 
                required 
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 backdrop-blur-sm"
              />
            </div>

            <div>
              <input 
                name='password' 
                type="password" 
                placeholder='Enter Your Password' 
                required 
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 backdrop-blur-sm"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-linear-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Create Account
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-900 text-gray-400">Already have an account?</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full border-2 border-purple-500/50 hover:border-purple-500 text-purple-300 hover:text-purple-200 font-semibold py-3 px-4 rounded-lg transition duration-200 bg-transparent hover:bg-purple-500/10"
            >
              Sign In
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Register