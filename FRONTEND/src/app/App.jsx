import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import useAuth from "../features/auth/hooks/useAuth"
import { ToastContainer } from 'react-toastify'

const App = () => {

  const { handleGetUser } = useAuth()

  useEffect(() => {
   handleGetUser()
  }, [])



  return (
  <div className='h-screen w-full'>
    <ToastContainer/>
    <Outlet />
    </div>
    )
}

export default App