import { LogOutIcon } from "lucide-react";
import { Link } from "react-router-dom";

type HeaderProps = {
  onLogout: () => void;
  user?: { accessToken: string } | null | undefined;
};

const Header = ({ onLogout, user }: HeaderProps) => {
  return (
    <div className="text-slate-800 bg-[#1a1a1a] shadow-sm h-14">
      <div className="container flex items-center justify-between h-full">
        <h1 className="font-mono font-semibold">
          <Link to="/home" className="text-white">
            Password Manager
          </Link>
        </h1>

        {user?.accessToken && (
          <nav>
            <ul className="list-none flex items-center gap-5 text-white">
              {/* <li>{user?.email ?? ""}</li> */}
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
