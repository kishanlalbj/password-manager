import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { api } from "../utils";
import { useUser } from "../contexts/AuthContext";
import useAxiosInterceptors from "../hooks/useAxiosInterceptors";

const Login = () => {
  useAxiosInterceptors();
  const navigate = useNavigate();
  const {setUser} = useUser();

  const [creds, setCreds] = useState({
    email: "john_doe@gmail.com",
    password: "test",
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const res = await api.post(`/api/auth/login`, creds);

      setUser({accessToken: res.data.access_token})
      navigate("/home");
      setCreds({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreds((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const isAuth = async () => {
      const res = await api.get('/api/auth/me');

      if (res.data.authenticated) navigate("/home");
    };

    isAuth();
  }, [navigate]);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="card w-[25rem]">
        <h1 className="text-3xl font-bold text-center">Login</h1>

        <form onSubmit={handleLogin}>
          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={creds.email}
              onChange={handleChange}
              required
            ></input>
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={creds.password}
              onChange={handleChange}
              required
            ></input>
          </div>

          <div className="text-center mt-3">
            <Button type="submit">Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
