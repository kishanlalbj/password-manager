import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import { api } from "./utils";


const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.post('/api/logout');
    navigate("/");
  };

  return (
    <>
      <Header onLogout={handleLogout} />
      <div className="home-grid">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
