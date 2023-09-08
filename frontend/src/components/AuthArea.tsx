import NewTransfer from "./NewTransfer"
import { AuthViewStyles } from "./styles/AuthView"
import { Navigate } from "react-router-dom"
import Balance from "./Balance"
import { useContext } from "react"
import UserContext from "../context/UserContext"
import NavBar from "./NavBar"


const AuthArea = () => {
  const [user] = useContext(UserContext)

  if(!user) {
    return <Navigate to='/login'/>
  }
  
  return (
    <AuthViewStyles>
      <NavBar />
      <h1>Welcome {user.name}!</h1>
      <Balance />
      <NewTransfer />
    </AuthViewStyles>
  )
}

export default AuthArea