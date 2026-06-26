import { getUserService, googleAuthService, loginService, logoutService, refreshTokenService, registerService } from '../services/auth.service'
import { useDispatch } from "react-redux"
import { setAccessToken, setUser } from '../auth.slice'
import {useNavigate} from "react-router-dom"


const useAuth = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleGoogleAuth = async (response) => {
    const token = await googleAuthService(response.credential);
    dispatch(setAccessToken(token));
    navigate("/")
  };


  const handleRegister = async (data) => {

    const res = await registerService(data)

    let token = res.data.data.accessToken

    dispatch(setAccessToken(token))
    navigate("/")
  }

  const handleLogin = async (data) => {

    const res = await loginService(data)

    let token = res.data.data.accessToken

    dispatch(setAccessToken(token))
    navigate("/")
  }

  const handleGetUser = async () => {
    try {
      let { data } = await getUserService()
      dispatch(setUser(data.data))
    } catch (error) {
      console.log(error.message)
      dispatch(setUser(null))
    }
  }

  const handleLogout = async () => {
    try {
      let { data } = await logoutService()
      console.log(data)
    } catch (error) {
      console.error("Logout failed on server:", error)
    } finally {
      dispatch(setUser(null))
      dispatch(setAccessToken(null))
    }
  }

  const handleRefreshToken = async () => {
    let res = await refreshTokenService()
    return res.data.data.accessToken
  }


  return { handleRegister, handleLogin, handleGetUser, handleLogout, handleRefreshToken, handleGoogleAuth }
}

export default useAuth