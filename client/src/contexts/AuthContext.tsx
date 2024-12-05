/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useState } from "react";

// type User = {
//   user: { accessToken: string } | null;
//   setUser: React.Dispatch<SetStateAction<null | TUser>>;
// };

type TUser =
  | {
      accessToken: string;
    }
  | undefined;

const AuthContext = createContext<{
  user: { accessToken: string } | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<TUser>>;
}>({
  user: { accessToken: "" },
  setUser: () => {}
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser>({ accessToken: "" });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);
