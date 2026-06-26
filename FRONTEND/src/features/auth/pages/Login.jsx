import React from 'react'
import useAuth from '../hooks/useAuth'
import handleForm from "../../../utils/formHandler.utils"
import { useNavigate } from "react-router-dom"


const Login = () => {

  const { handleLogin } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
          <form onSubmit={handleForm(handleLogin)} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-300 text-sm">Sign in to your account to continue</p>
            </div>

            <div>
              <input
                name='email'
                type="email"
                placeholder='Enter Your Email'
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 backdrop-blur-sm"
              />
            </div>

            <div>
              <input
                name='password'
                type="password"
                placeholder='Enter Your Password'
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 backdrop-blur-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Login
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-900 text-gray-400">Don't have an account?</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/register')}
              className="w-full border-2 border-blue-500/50 hover:border-blue-500 text-blue-300 hover:text-blue-200 font-semibold py-3 px-4 rounded-lg transition duration-200 bg-transparent hover:bg-blue-500/10"
            >
              Sign Up
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login