import { LogOutIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

type HeaderProps = { onLogout: () => void };

const Header = ({ onLogout }: HeaderProps) => {
  const [data, setData] = useState<{ email: string }>({
    email: ""
  });
  const { user } = useUser();

  useEffect(() => {
    try {
      const decoded: { email: string } = jwtDecode(user?.accessToken ?? "");
      setData(decoded);
    } catch (error) {
      if (error instanceof Error) console.log(error);
    }
  }, [user, user?.accessToken]);

  return (
    <div className="text-slate-800 bg-[#1a1a1a] shadow-sm h-14">
      <div className="container flex items-center justify-between h-full">
        <h1 className="font-mono font-semibold">
          <Link to="/home" className="text-white">
            Password Manager
          </Link>
        </h1>

        {data?.email && (
          <nav>
            <ul className="list-none flex items-center gap-5 text-white">
              <li>{data?.email ?? ""}</li>
              <li>
                <p role="button" onClick={onLogout}>
                  <LogOutIcon />
                </p>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Header;
