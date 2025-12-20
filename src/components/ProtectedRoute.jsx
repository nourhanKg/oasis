import { useNavigate } from "react-router"

import useUser from "../features/Authentication/useUser"
import Spinner from "../components/Spinner"
export default function ProtectedRoute({children}) {
  const navigate = useNavigate()
  const {user, isLoading, isAuthenticated} = useUser()
    // const session = JSON.parse(localStorage.getItem("sb-ykwriqrhfexrsqxxvjok-auth-token"))
    // const isAuthenticated = session?.user?.role === "authenticated"
    if(isLoading) return <Spinner />
    if(!isAuthenticated) {
        navigate("/login")
        return
    }
  return (
    <>
        {children}
    </>
  )
}
