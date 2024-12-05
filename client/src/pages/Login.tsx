import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/AuthContext";
import useAxiosInterceptors from "../hooks/useAxiosInterceptors";
import axios from "axios";

const Login = () => {
  const api = useAxiosInterceptors();
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [showRegister, setShowRegister] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const [creds, setCreds] = useState({
    email: "",
    password: ""
  });

  const [registerCreds, setRegisterCreds] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const res = await axios.post(`/api/auth/login`, creds);

      setUser({ accessToken: res.data.access_token });
      navigate("/home");
      setCreds({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await axios.post("/api/auth/register", registerCreds);

      if (res.data.success) {
        alert("Registration Successful");
        setShowRegister(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreds((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "confirmPassword") setConfirmPasswordTouched(true);
    setRegisterCreds((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  useEffect(() => {
    const isAuth = async () => {
      const res = await api.get("/api/auth/me", { withCredentials: true });

      if (res.data.authenticated) {
        navigate("/home");
      }
    };

    isAuth();
  }, [api, navigate]);

  useEffect(() => {
    if (registerCreds.password) {
      if (registerCreds.password === registerCreds.confirmPassword)
        setPasswordMatch(true);
      else setPasswordMatch(false);
    }
  }, [registerCreds.password, registerCreds.confirmPassword]);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {!showRegister ? (
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
              <span
                role="button"
                className="ml-5"
                onClick={() => setShowRegister(true)}
              >
                Register
              </span>
            </div>
          </form>
        </div>
      ) : (
        <div className="card w-[25em]">
          <h1 className="text-3xl font-bold text-center">Register</h1>

          <form onSubmit={handleRegister}>
            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={registerCreds.email}
                onChange={handleRegisterChange}
                required
              ></input>
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={registerCreds.password}
                onChange={handleRegisterChange}
                required
              ></input>
            </div>

            <div>
              <label>Confirm Password</label>
              <input
                type="password"
                className={`${confirmPasswordTouched && !passwordMatch ? "border border-red-500" : ""}`}
                placeholder="Password"
                name="confirmPassword"
                value={registerCreds.confirmPassword}
                onChange={handleRegisterChange}
                required
              ></input>
              {!passwordMatch && (
                <p className="text-red-500 text-sm">Password doesn't match</p>
              )}
            </div>

            <div className="text-center mt-3">
              <Button type="submit">Register</Button>
              <span
                role="button"
                className="ml-5"
                onClick={() => setShowRegister(false)}
              >
                Login
              </span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
