import useCompo from '../hooks/useCompo'
import { useEffect } from 'react'
import Navbar from '../../auth/components/Navbar'
import Sidebar from '../components/Sidebar'
import ComponentGuide from '../components/ComponentGuide'
import GetStarted from '../components/GetStarted'
import { useSearchParams } from 'react-router-dom'


const ComponentList = () => {

  const { handleGetComponents, handleGetCompoById } = useCompo()
  const [params, setParams] = useSearchParams()

  const compId = params.get("c")

  useEffect(() => { handleGetComponents() }, [])


  return (
    <main className="h-full w-full bg-slate-950 text-slate-100">
      <Navbar />

      <div className="flex h-10/12 w-full">
        <Sidebar setParams={setParams} />
        {compId ? <ComponentGuide handleGetCompoById={handleGetCompoById} compId={compId} /> : <GetStarted />}
      </div>
    </main>
  )
}

export default ComponentList
