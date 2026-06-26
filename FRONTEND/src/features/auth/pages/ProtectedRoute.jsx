import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {

    const user = useSelector(state => state.auth.user)
    const isLoading = useSelector(state => state.auth.isLoading)

    if (isLoading) return <h1>Loading...</h1>

    if (!user) {
        return <Navigate to={"/g/login"} replace={true} />        
    }

    return <Outlet />
}

export default ProtectedRoute