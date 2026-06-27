import { useState, useEffect, useRef } from 'react';
import { FaReact, FaJs, FaCss3 } from "react-icons/fa";
import { ChevronRight, Folder, FolderOpen, File, Earth, Zap } from 'lucide-react';
import useGenerate from '../hook/useGenerate';
import { EarthIcon, Code2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom';
import useCompo from '../../code/hooks/useCompo';
import { useSelector } from 'react-redux';
import { Plus } from 'lucide-react'

const FILE_ICONS = {
    jsx: <FaReact size={16} className="text-sky-500" />,
    tsx: <FaReact size={16} className="text-sky-500" />,
    css: <FaCss3 size={16} className="text-pink-400" />,
    js: <FaJs size={16} className="text-yellow-400" />,
};

function getIcon(name) {
    const ext = name.split('.').pop();
    return FILE_ICONS[ext] || <File size={16} className="text-zinc-400" />;
}

const Sidebar = ({ props }) => {

    const { handleGetMyProjects, handleUpdateComponent } = useCompo()
    const navigate = useNavigate()
    const Components = useSelector(state => state.component.components)
    // const { handleWebBuilder } = useGenerate()
    // const { setSearchParams, webBuilder } = props

    const [open, setOpen] = useState(true);
    const [selected, setSelected] = useState('my-project');
    const [renaming, setRenaming] = useState(false);
    const [renameVal, setRenameVal] = useState('');
    const [ctxTarget, setCtxTarget] = useState(null);
    const menuRef = useRef(null);
    const inputRef = useRef(null);
    let [editedObj, setEditedObj] = useState({
        _id: '',
        name: ''
    })

    const [width, setWidth] = useState(() => {
        const saved = localStorage.getItem('sidebarWidth');
        const parsed = parseInt(saved, 10);
        return !isNaN(parsed) ? parsed : 220;
    });

    useEffect(() => {
        localStorage.setItem('sidebarWidth', width);
    }, [width]);

    const isResizingRef = useRef(false);

    const startResizing = (mouseDownEvent) => {
        mouseDownEvent.preventDefault();
        isResizingRef.current = true;
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';

        const startWidth = width;
        const startX = mouseDownEvent.clientX;

        const doDrag = (mouseMoveEvent) => {
            if (!isResizingRef.current) return;
            const newWidth = startWidth + (mouseMoveEvent.clientX - startX);
            setWidth(Math.max(180, Math.min(300, newWidth)));
        };

        const stopDrag = () => {
            isResizingRef.current = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            document.removeEventListener('mousemove', doDrag);
            document.removeEventListener('mouseup', stopDrag);
        };

        document.addEventListener('mousemove', doDrag);
        document.addEventListener('mouseup', stopDrag);
    };

    const [files, setFiles] = useState([]);

    useEffect(() => {

        handleGetMyProjects()

        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setCtxTarget(null);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);


    useEffect(() => {
        let newArr = Components.map(c => {
            return {
                id: c._id,
                name: `${c.name}`,
                path: `${c.name}.jsx`
            }
        })
        setFiles(newArr)
    }, [Components])

    useEffect(() => {
        if (renaming && inputRef.current) inputRef.current.focus();
    }, [renaming]);

    const openCtx = (e, file) => {
        e.preventDefault();
        e.stopPropagation();
        setCtxTarget(file.path);

        setEditedObj({
            id: file.id,
            name: renameVal.trim()
        })
    };

    const startRename = () => {
        setRenameVal(ctxTarget);
        setRenaming(true);
        setCtxTarget(null);
    };

    const confirmRename = () => {
        if (!renameVal.trim()) return;
        setFiles(prev => prev.map(f => f.name === selected ? { ...f, name: renameVal.trim() } : f));
        setSelected(renameVal.trim());
        setRenaming(false);
        handleUpdateComponent(editedObj.id, { name: renameVal.split(".")[0].trim() });
    };

    const deleteFile = () => {
        setFiles(prev => prev.filter(f => f.name !== ctxTarget));
        setCtxTarget(null);
    };

    return (
        <aside style={{ width: `${width}px` }} className=" bg-[#111116] border-r border-[#1e1e2a] flex flex-col justify-between h-screen select-none relative group/sidebar" onContextMenu={e => e.preventDefault()}>


            <div onMouseDown={startResizing} className="absolute top-0 right-0 w-1.5 h-full cursor-col-resize hover:bg-violet-600/30 active:bg-violet-600/50 transition-colors duration-150 z-50 translate-x-1/2" />


            <Link to="/" className="flex p-4 items-center gap-2 cursor-pointer">
                <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-slate-900" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">CompoLab</span>
            </Link>

            <div className='w-full px-4 py-2'>
                <button onClick={() => navigate("/generate")} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-cyan-500/10 cursor-pointer hover:bg-cyan-500/20 active:scale-[0.98] text-cyan-400 rounded-md text-sm font-medium transition-all duration-150">
                    <Plus size={15} /> Generate New
                </button>
            </div>

            <div className="flex-1 overflow-y-auto py-2">
                <div onClick={() => setOpen(o => !o)} className="flex items-center gap-1.5 px-3 py-1.5 mx-1 rounded-[7px] cursor-pointer hover:bg-[#1e1535]">
                    <ChevronRight size={17} className={`text-amber-500 transition-transform duration-150 ${open ? 'rotate-90' : ''}`} />
                    {open ? <FolderOpen size={17} className="text-amber-500" /> : <Folder size={17} className="text-amber-500" />}
                    <span className="text-base text-purple-200 font-medium">my-project </span>
                </div>


                {open && (<div> {files.map(file => (<div onClick={() => { navigate(`/c/${file.id}`); }} onContextMenu={e => { setSelected(file.path); openCtx(e, file); }} key={file.path} className={`relative flex items-center gap-1.5 pl-10 py-1 rounded-[7px] cursor-pointer group ${selected === file.path ? 'bg-[#1a1530] text-violet-300' : 'text-[#7070a0] hover:bg-[#18181f] hover:text-[#a0a0c0]'}`}>
                    {getIcon(file.path)}
                    {renaming && selected === file.path ? (<input ref={inputRef} type="text" onClick={e => e.stopPropagation()} value={renameVal} onChange={e => setRenameVal(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === 'Enter') confirmRename();
                            if (e.key === 'Escape') setRenaming(false);
                        }}
                        onBlur={confirmRename} className="bg-[#0d0d12] border border-violet-600 rounded-[5px] px-1.5 py-0 text-violet-300 outline-none w-28 font-sans" />
                    ) : (<span className=" truncate">{file.path}</span>)}


                    {ctxTarget === file.path && (
                        <div ref={menuRef} onClick={e => e.stopPropagation()} className="absolute left-6 top-7 z-50 w-44 bg-[#1a1a24] border border-[#2a2a38] rounded-xl py-1.5 shadow-2xl">
                            <button onClick={startRename} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#9090b8] hover:bg-[#22222f] hover:text-violet-300 transition-colors">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                Rename
                            </button>
                            <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#9090b8] hover:bg-[#22222f] hover:text-violet-300 transition-colors">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                                Copy path
                            </button>
                            <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#9090b8] hover:bg-[#22222f] hover:text-violet-300 transition-colors">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" /></svg>
                                New file
                            </button>
                            <div className="h-px bg-[#2a2a38] my-1" />
                            <button onClick={deleteFile} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-[#2a1218] hover:text-red-300 transition-colors">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>
                                Delete
                            </button>
                        </div>
                    )}

                </div>
                ))}
                </div>
                )}
            </div>

{/* 
            <div className=' flex justify-center py-8'>
                <div className='flex items-center gap-2 bg-slate-900/60 border border-slate-800/80 px-3 py-2 rounded-full hover:border-slate-800 transition-all duration-300 shadow-sm'>
                    <Earth size={15} className={`transition-colors duration-300 ${webBuilder ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span className={'text-xs  font-medium select-none' + (webBuilder && " text-cyan-500")}>Web Builder</span>

                    <button className={`relative cursor-pointer inline-flex h-5 w-10 items-center rounded-full transition-all duration-300 ease-out border border-white/10 ${webBuilder
                        ? "bg-linear-to-r from-violet-600 to-purple-500 shadow-lg shadow-violet-500/25"
                        : "bg-slate-700/80 hover:bg-slate-600"
                        }`}
                        onClick={() => {
                            handleWebBuilder()
                            if (webBuilder) {
                                setSearchParams({}, { replace: true })
                            } else {
                                setSearchParams({ web: "true" }, { replace: true })
                            }
                        }}>
                        <span className={`flex items-center justify-center h-4 w-4 rounded-full bg-white shadow-md transition-all duration-300 ease-out ${webBuilder ? "translate-x-5" : "translate-x-0.5"}`}>
                            {webBuilder ? <EarthIcon size={12} className="text-violet-500" /> : <Code2 size={12} className="text-cyan-400" />}
                        </span>
                    </button>
                </div>
            </div> */}

        </aside>
    );
};

export default Sidebar;