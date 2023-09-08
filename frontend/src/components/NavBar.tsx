import { Link } from "react-router-dom"
import styled from 'styled-components'
import { useNavigate } from "react-router-dom"


const NavbarStyles = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: black;
  border: none;
  
  & a {
    text-decoration: none;
    font-size: 0.7rem;
  }

  & button {
    color: white;
    background-color: transparent;
    border: none;
    padding: 4px;
  }
`

const NavBar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <NavbarStyles>
      <Link to='/'>Home</Link>
      <Link to='/transactions'>Transactions</Link>
      <Link to='/friends'>Beneficiaries</Link>
      <Link to='/update-profile'>Edit Profile</Link>
      <button onClick={handleLogout}>Log Out</button>
    </NavbarStyles>

  )
}

export default NavBar