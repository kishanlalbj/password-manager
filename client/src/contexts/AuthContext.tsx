import { createContext, ReactNode, SetStateAction, useContext, useState } from "react";


type User = {
    user: {accessToken: string} | null,
    setUser: React.Dispatch<SetStateAction<null>>
}

const AuthContext = createContext<User>({
    user: null,
    setUser: () => {}
});

export const AuthContextProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState(null)


    return <AuthContext.Provider value={{user, setUser}}>
            {children}
    </AuthContext.Provider>
}

export const useUser = () => useContext(AuthContext);
