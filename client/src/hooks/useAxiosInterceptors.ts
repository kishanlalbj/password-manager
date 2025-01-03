import { useEffect } from "react";
import { useUser } from "../contexts/AuthContext";
import { api } from "../utils";
import { jwtDecode } from "jwt-decode";

const useAxiosInterceptors = () => {
  const { user, setUser } = useUser();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          // console.log("Setting accesstoken", user);
          config.headers["Authorization"] = `Bearer ${user?.accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401) {
          const res = await api.get("/api/auth/refresh-token");
          const decoded = jwtDecode(res.data.access_token);
          setUser({
            accessToken: res.data.access_token,
            decoded
          });
          originalRequest.headers.authorization = `Bearer ${res.data.access_token}`;
          originalRequest._retry = true;

          return api(originalRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(responseInterceptor);
      api.interceptors.response.eject(requestInterceptor);
    };
  }, [user]);

  return api;
};

export default useAxiosInterceptors;
