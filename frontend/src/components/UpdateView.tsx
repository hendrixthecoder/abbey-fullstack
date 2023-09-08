import UserContext from "../context/UserContext";
import { useContext, useState } from "react";
import { updateUser } from "../services/user";
import NavBar from "./NavBar";
import { UpdateViewStyle } from "./styles/UpdateViewStyles";
import { Navigate } from "react-router-dom";

const UpdateView = () => {
  const user = JSON.parse(localStorage.getItem('user')!)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setUser] = useContext(UserContext); 
  const [first_name, setFirstName] = useState(user?.first_name)
  const [last_name, setLastName] = useState(user?.last_name)
  const [password, setPassword] = useState('')


  if(!user){
    return <Navigate to='/login'/>
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { first_name, last_name, password }

    try {
      const { data } = await updateUser(formData, user?.token)
      const updatedUser = { ...user, ...data }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setUser(updatedUser)

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar/>
      <UpdateViewStyle>
      <h3>Update Info</h3>
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="first_name">First Name:</label>
            <input 
                type="text" 
                id="first_name" 
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="last_name">Last Name:</label>
            <input 
                type="text" 
                id="last_name" 
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="last_name">Password:</label>
            <input 
                type="text" 
                id="last_name" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button>Submit</button>
      </form>
    </UpdateViewStyle>
    </>
  );
};

export default UpdateView;
