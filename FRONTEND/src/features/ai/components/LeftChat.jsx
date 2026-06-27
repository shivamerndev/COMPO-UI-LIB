import { Clock, Trash2 } from "lucide-react"
import { useState } from "react"

const INITIAL_CHATS = [
  { id: 1, title: 'Create a Button Component', date: 'Today', tag: 'JSX' },
  { id: 2, title: 'Build a Form with Validation', date: 'Yesterday', tag: 'Form' },
  { id: 3, title: 'Design a Navigation Bar', date: '2 days ago', tag: 'Nav' },
  { id: 4, title: 'Modal Dialog Component', date: '3 days ago', tag: 'UI' },
]

const TAG_COLORS = {
  JSX: 'bg-sky-950 text-sky-400',
  Form: 'bg-violet-950 text-violet-400',
  Nav: 'bg-teal-950 text-teal-400',
  UI: 'bg-amber-950 text-amber-400',
}

const grouped = (chats) =>
  chats.reduce((acc, chat) => {
    acc[chat.date] = acc[chat.date] ? [...acc[chat.date], chat] : [chat]
    return acc
  }, {})

const LeftChat = ({ onNewChat, tokenCount = '999k', props }) => {



  const [chats, setChats] = useState(INITIAL_CHATS)
  const [active, setActive] = useState(1)
  const [search, setSearch] = useState('')

  const filtered = chats.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase())
  )

  const groups = grouped(filtered)

  const deleteChat = (e, id) => {
    e.stopPropagation()
    setChats(prev => prev.filter(c => c.id !== id))
    if (active === id) setActive(null)
  }

  return (
    <div className=" bg-[#0f0f14] border-r border-[#1e1e2a] flex flex-col select-none">



      {/* Chat list */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {Object.keys(groups).length === 0 && (
          <p className=" text-[#3d3d55] text-center mt-8">No chats found</p>
        )}

        {Object.entries(groups).map(([date, items]) => (
          <div key={date}>
            <div className="flex items-center gap-2 px-2 mb-2">
              <Clock size={10} className="text-[#3d3d55]" />
              <span className="text-[10px] uppercase tracking-widest text-[#3d3d55]">{date}</span>
            </div>

            <div className="space-y-0.5">
              {items.map(chat => (
                <div
                  key={chat.id}
                  onClick={() => setActive(chat.id)}
                  className={`group flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150
                    ${active === chat.id
                      ? 'bg-[#1e1535] text-violet-300'
                      : 'text-[#7070a0] hover:bg-[#18181f] hover:text-[#a0a0c0]'
                    }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors
                    ${active === chat.id ? 'bg-violet-500' : 'bg-[#2d2d45]'}`}
                  />

                  <div className="flex-1 min-w-0">
                    <p className=" truncate font-medium">{chat.title}</p>
                    {chat.tag && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded mt-1 inline-block font-medium ${TAG_COLORS[chat.tag] ?? 'bg-zinc-800 text-zinc-400'}`}>
                        {chat.tag}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={e => deleteChat(e, chat.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-red-950 text-[#3d3d55] hover:text-red-400 transition-all flex-shrink-0"
                    aria-label="Delete chat"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default LeftChat