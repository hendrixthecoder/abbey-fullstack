import { useContext, useEffect, useState } from "react";
import { fetchAllTransactions } from "../services/transactions";
import { TransactionStyles } from "./styles/TransactionsViewStyled";
import UserContext from "../context/UserContext";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";


type TransactionProps = {
  id: string;
  amount: number;
  date: Date;
  reciever: {
    username: string;
  };
  sender: {
    username: string;
  };
};

const Transactions = () => {
  const navigate = useNavigate()
  const [user] = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  console.log(user);
  

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await fetchAllTransactions(user?.token);
        setTransactions(data);
        setIsLoading(false);

      } catch (error) {
        if(error instanceof AxiosError){
          const message = error.response?.data.error
          if(message === 'Token Expired' || message === 'jwt malformed') {
            localStorage.removeItem('user')
            navigate('/login')
          }
        }

        console.log(error);
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [user, navigate]);

  return (
    <>
    <NavBar/>
    <TransactionStyles>
      <h4>Transactions</h4>
      {isLoading ? (
        <div>Fetching transactions...</div>
      ) : transactions.length > 1 ? (
        <table>
          <thead>
            <tr>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction: TransactionProps) => (
              <tr key={transaction.id}>
                <td>{transaction.sender.username}</td>
                <td>{transaction.reciever.username}</td>
                <td>N{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No transaction records found</div>
      )}
    </TransactionStyles>
    </>
  );
};

export default Transactions;
