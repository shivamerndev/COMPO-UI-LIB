const tagColors = [
  'bg-blue-500/15 text-blue-300 border-blue-500/25',
  'bg-purple-500/15 text-purple-300 border-purple-500/25',
  'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  'bg-amber-500/15 text-amber-300 border-amber-500/25',
  'bg-pink-500/15 text-pink-300 border-pink-500/25',
]

const themeIcon = { light: '☀️', dark: '🌙', system: '💻' }

const ComponentCard = ({ component, onView, onDelete, deleting }) => {
  const { _id, name, props, visibility } = component

  return (
    <article onClick={() => onView(_id)} className="group flex flex-col h-fit gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg transition-all duration-200 hover:border-blue-500/30 hover:bg-white/8 hover:shadow-blue-500/10">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-white">{name}</h3>


          <div className="mt-1.5 flex flex-wrap items-center gap-2">

            {/* Public / Private */}
           {visibility && <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${visibility === "public"
                ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300'
                : 'border-slate-500/25 bg-slate-500/10 text-slate-400'
                }`}
            >
              {visibility === "public" ? '🌐 Public' : '🔒 Private'}
            </span>}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete(_id)
          }}
          disabled={deleting}
          className="rounded-full border cursor-pointer border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {deleting ? '...' : 'Delete'}
        </button>
      </div>

      {/* props */}
      {props.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {props.map((tag, i) => (
            <span
              key={tag}
              className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${tagColors[i % tagColors.length]}`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

    </article>
  )
}

export default ComponentCard
