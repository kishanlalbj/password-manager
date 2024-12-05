import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import { useUser } from "./contexts/AuthContext";
import useAxiosInterceptors from "./hooks/useAxiosInterceptors";

const Layout = () => {
  const api = useAxiosInterceptors();
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleLogout = async () => {
    const res = await api.post("/api/auth/logout");
    if (res.data.success) {
      setUser({ accessToken: "" });
      navigate("/");
    }
  };

  return (
    <>
      <Header onLogout={handleLogout} user={user} />

      <div className="home-grid">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
