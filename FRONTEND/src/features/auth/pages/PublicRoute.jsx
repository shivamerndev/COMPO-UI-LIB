import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const PublicRoute = () => {

  const user = useSelector(state => state.auth.user)

  return user ? <Navigate to={"/"} replace /> : <Outlet />
}

export default PublicRoute