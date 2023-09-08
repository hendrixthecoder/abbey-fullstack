import { useEffect, useState, useContext } from "react"
import { fetchAllFriends } from "../services/friends"
import UserContext from "../context/UserContext"
import NavBar from "./NavBar"
import { FriendsStyle } from "./styles/FriendsStyles"

type FriendProps = {
  username: string
}

const Friend: React.FC<{ friend: FriendProps }> = ({ friend }) => {
  
  return (
    <li>
      {friend.username}
    </li>
  )
}

const Friends = () => {
  const [user, setUser] = useContext(UserContext)
  const [friends, setFriends] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    const fetchFriends = async () => {
      try {        
        const { data } = await fetchAllFriends(user?.username)
        
        setFriends(data)
        setIsLoading(false)

      } catch (error) {
        setIsLoading(false)
        console.log(error);
      }
    }

    fetchFriends()
  }, [user, setUser])
  
  
  return (
    <>
      <NavBar/>
    <FriendsStyle>
        <h4>Friends</h4>
        {
          isLoading 
            ? <p>Fetching friends...</p>
            : (
              <div>
                {
                  friends.length > 0 
                    ? friends.map((friend, index) => <Friend key={index} friend={friend}/>)
                    : <p>You have no friends try saving a friend by adding to friends list when making a transfer.</p>
                }
              </div>
            )
        }
    </FriendsStyle>
    </>
  )
}

export default Friends