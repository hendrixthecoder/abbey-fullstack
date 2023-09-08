import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <nav>
        <Link to='/'>Home</Link>
        <Link to='/transactions'>Transactions</Link>
        <Link to='/friends'>Beneficiaries</Link>
        <Link to='/update-profile'>Edit Profile</Link>
    </nav>
  )
}

export default NavBar