import { ReactNode, createContext, useState } from "react";

type UserProps = {
    token?: string,
    username?: string,
    name?: string,
    balance?: number,
    friends?: string[],
    first_name?: string,
    last_name?: string
}

const UserContext = createContext<[UserProps | null, React.Dispatch<React.SetStateAction<UserProps | null>>]>([null, () => null])

export default UserContext

export const UserContextProvider: React.FC<{ children : ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<UserProps | null>(null)

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}