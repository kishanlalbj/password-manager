/* eslint-disable react-refresh/only-export-components */
import { JwtPayload } from "jwt-decode";
import { createContext, ReactNode, useContext, useState } from "react";

type TUser =
  | {
      accessToken: string;
      decoded: JwtPayload;
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
  const [user, setUser] = useState<TUser>({
    accessToken: "",
    decoded: {}
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);
