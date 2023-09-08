import { useContext, useState } from "react"
import { createNewTransaction } from "../services/transactions"
import UserContext from "../context/UserContext"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { NewTransferStyles } from "./styles/NewTransferStyles"


type UserProps = {
  token: string,
  username: string,
  name: string,
  balance: number
}

const NewTransfer = () => {
  const [user, setUser] = useContext(UserContext)
  const navigate = useNavigate()

  const [receiver, setReceiver] = useState('')
  const [amount, setAmount] = useState('')
  const [beneficiary, setBeneficiary] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const transactionData = {
      sender: user?.username,
      amount,
      receiver,
      beneficiary
    }

    try {
      const { data } = await createNewTransaction(transactionData, user?.token)
      const { checkedSender } = data
      const updatedUser: UserProps = { ...user, ...checkedSender }
      setUser(updatedUser)
      setReceiver('')
      setAmount('')
      setBeneficiary(false)
      
    } catch (error) {
      if(error instanceof AxiosError){
        const message = error.response?.data.error
        if(message === 'Token Expired') {
          localStorage.removeItem('user')
          navigate('/login')
        }
      }

      console.log(error);
    }
  }

  return (
    <NewTransferStyles>
      <h4>New Transfer</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="receiver">Beneficiary:</label>
          <input 
            type="text" 
            name="beneficiary" 
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="receiver">Amount:</label>
          <input 
            type="number" 
            name="amount" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="beneficiary">Add as Beneficiary:</label>
          <input type="checkbox" checked={beneficiary} onChange={() => setBeneficiary(!beneficiary)} name="beneficiary" id="" />
        </div>
        <button>Send</button>
      </form>
    </NewTransferStyles>
  )
}

export default NewTransfer