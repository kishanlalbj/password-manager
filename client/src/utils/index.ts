import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  const token = localStorage.getItem("tkn");

  if (!token) return "";

  const decoded = jwtDecode<{ id: string; iat: number; exp: number }>(
    token ?? ""
  );
  const currentTime = Math.floor(Date.now() / 1000);

  if (decoded?.exp < currentTime) {
    console.log("I am expired");
    localStorage.removeItem("tkn");
    return null;
  }

  return token;
};

export const api = axios.create();
