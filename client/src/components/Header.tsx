import { JwtPayload as BaseJwtPayload } from "jwt-decode";

interface JwtPayload extends BaseJwtPayload {
  email?: string;
}
import { LogOutIcon, ShieldIcon } from "lucide-react";
import { Link } from "react-router-dom";

type HeaderProps = {
  onLogout: () => void;
  user?: { accessToken: string; decoded: JwtPayload } | null | undefined;
};

const Header = ({ onLogout, user }: HeaderProps) => {
  return (
    <div className="text-slate-800 bg-primary shadow-sm h-14">
      <div className="container flex items-center justify-between h-full">
        <h1 className="font-mono font-semibold">
          <Link to="/home" className="text-white">
            <span className="flex items-center gap-2">
              <ShieldIcon /> Password Manager
            </span>
          </Link>
        </h1>

        {user?.accessToken && (
          <nav>
            <ul className="list-none flex items-center gap-5 text-white">
              <li>
                <p>{user?.decoded?.email}</p>
              </li>
              <li>
                <p role="button" onClick={onLogout}>
                  <LogOutIcon size={16} />
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
