import { useState } from 'react'
import { useSelector } from 'react-redux'

const Sidebar = ({ setParams }) => {

    const components = useSelector((state) => state.component.components)

    const [active, setActive] = useState(null)

    return (
        <aside className="relative w-70 border-r border-violet-950/90 flex flex-col gap-1 px-3 flex-shrink-0 select-none">


            <div onClick={() => {
                setParams({})
                setActive(null)
            }} className={` relative flex border-b-1  items-center mb-4 gap-2.5 px-3 py-2 rounded-lg cursor-pointer border transition-all duration-150 overflow-hidden group ${active === null ? 'bg-violet-500/[0.12] border-violet-500/40' : 'bg-transparent border-violet-500/10 hover:bg-violet-500/[0.07] hover:border-violet-500/25'}`}>

                {active === null && (<div className="absolute left-0 top-[20%] bottom-[20%] w-0.5 rounded-full bg-gradient-to-b from-violet-500 to-cyan-400" />)}

                <p className={`text-sm px-3 font-medium truncate transition-colors duration-150 ${active === null ? 'text-violet-300' : 'text-slate-400 group-hover:text-slate-300'}`}>
                    Get started
                </p>

            </div>

            {/* header */}
            <div className="px-4 pb-2 border-b-1 border-violet-500/50">
                <div className="flex items-center gap-2">

                    <span className="text-sm  uppercase text-indigo-400 font-semibold">
                        components
                    </span>
                </div>
                <p className="text-sm text-slate-500 ">
                    {components.length} available
                </p>

            </div>



            {/* list */}
            <div className="flex flex-col gap-1">
                {components.map((comp) => {
                    const isActive = active === comp._id
                    return (<div key={comp._id} onClick={() => {
                        setParams({ c: comp._id }, { replace: true })
                        setActive(comp._id)
                    }} className={` relative flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer border transition-all duration-150 overflow-hidden group ${isActive ? 'bg-violet-500/[0.12] border-violet-500/40' : 'bg-transparent border-violet-500/10 hover:bg-violet-500/[0.07] hover:border-violet-500/25'}`}>

                        {isActive && (<div className="absolute left-0 top-[20%] bottom-[20%] w-0.5 rounded-full bg-gradient-to-b from-violet-500 to-cyan-400" />)}

                        <p className={`text-sm px-3 font-medium truncate transition-colors duration-150 ${isActive ? 'text-violet-300' : 'text-slate-400 group-hover:text-slate-300'}`}>
                            {comp.name}
                        </p>

                    </div>)
                })}
            </div>

            {components.length === 0 && (
                <p className="text-[11px] text-slate-600 text-center py-8 leading-relaxed">
                    No components yet
                </p>
            )}

            {/* bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-violet-500/5 to-transparent pointer-events-none" />
        </aside>
    )
}

export default Sidebar