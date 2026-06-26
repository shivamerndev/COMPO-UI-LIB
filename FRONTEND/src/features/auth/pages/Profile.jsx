import { useSelector } from 'react-redux'
import ComponentCard from '../../code/components/ComponentCard'
import { useNavigate } from 'react-router-dom'
import useCompo from '../../code/hooks/useCompo'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Preview from '../../code/pages/Preview'
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
    default: 3,
    1280: 2,
    768: 2,
    640: 1,
};



const Profile = () => {


    const components = useSelector((state) => state.component.components)
    const navigate = useNavigate()
    const { handleGetSavedComponents } = useCompo()

    useEffect(() => {
        handleGetSavedComponents()
    }, [])

    return (
        <div className='bg-black h-screen '>
            <Navbar />

            <div className=" h-10/13  w-10/13   mx-auto">

                <h1 className="text-xl mb-6 mt-4 font-bold text-white">Saved Components</h1>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="flex scrollbar-none overflow-y-auto gap-4"
                    columnClassName="space-y-2"
                >
                    {components.map((comp) => (
                        <div
                            key={comp._id}
                            onClick={() => navigate(`/c/${comp._id}`)}
                            className="cursor-pointer overflow-hidden rounded-xl border relative bg-white">
                            <div className='flex  text-white absolute z-10 w-full  justify-between'>
                                {comp.visibility === "public" && <button className='text-green-500 text-white px-2 py-1 rounded-md'>✅</button>} {comp.visibility === "private" && <button className='text-red-500 text-white px-2 py-1 rounded-md'>❌</button>}
                            </div>
                            <Preview code={comp.code} />
                        </div>
                    ))}
                </Masonry>
            </div>
        </div>
    )
}

export default Profile