import { useContext, useEffect, useState } from "react";
import { fetchUser } from "../services/user";
import UserContext from "../context/UserContext";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";


const Balance = () => {
  const navigate = useNavigate()
  const [user, setUser] = useContext(UserContext)
  const [balance, setBalance] = useState(0)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const { data } = await fetchUser(user?.token, user?.username)
        setIsLoading(false)
        setBalance(data.balance)
        
      } catch (error) {
        if(error instanceof AxiosError){
          const message = error.response?.data.error
          if(message === 'Token Expired') {
            localStorage.removeItem('user')
            navigate('/login')
          }
        }
        
        setIsLoading(false)
        console.log(error);
      }
    }

    fetchBalance()
  }, [user, setUser, navigate]);

  return (
    <section>
      {
        isLoading 
        ? <div>Fetching balance...</div>
        : (
          <div>Balance is N{balance}</div>
        )
      }
    </section>
  )
};

export default Balance;
