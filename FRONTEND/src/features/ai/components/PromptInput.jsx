import { Send, Sparkles } from 'lucide-react'
import useGenerate from '../hook/useGenerate'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const PromptInput = () => {

  const [input, setInput] = useState('')
  const isChunking = useSelector(state => state.component.chunking)
  const { handleGenerate } = useGenerate()
  const token = useSelector(state => state.auth.accessToken)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (input.trim()) {
      setInput('')
      await handleGenerate({ prompt: input, token })
    }
  }


    return  <form onSubmit={handleSubmit} className='w-10/12 mx-auto my-4'>
        <div className='relative flex items-center group w-full'>
          <div className="absolute left-4 flex items-center pointer-events-none">
            <Sparkles size={16} className="text-blue-500/70 group-focus-within:text-cyan-400 group-hover:text-blue-400 transition-colors duration-300" />
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Ask for creating a React Component...'
            className='w-full pl-11 pr-12 py-3 bg-voilet-950 border border-slate-800 hover:border-slate-700/80 focus:border-cyan-500/60 focus:outline-none rounded-xl text-sm text-slate-100 placeholder-slate-500 transition-all duration-300 focus:ring-4 focus:ring-cyan-500/10 shadow-inner'
          />
          <button
            type='submit'
            disabled={!input.trim() || isChunking}
            className='absolute right-2 p-1.5 rounded-lg bg-purple-600 hover:bg-cyan-500 text-white disabled:opacity-40 disabled:bg-transparent disabled:text-slate-500 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-md disabled:shadow-none hover:shadow-purple-500/20 flex items-center justify-center'
            title="Send prompt"
          >
            <Send size={14} />
          </button>
        </div>
      </form>
}

export default PromptInput