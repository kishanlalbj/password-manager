import { useUser } from "../contexts/AuthContext";
import { api } from "../utils";

const useAxiosInterceptors = () => {
  const { user, setUser } = useUser();

  api.interceptors.request.use(
    (config) => {
      if (user?.accessToken) {
        config.headers["Authorization"] = `Bearer ${user.accessToken}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401) {
        try {
          const res = await api.get("/api/auth/refresh-token");
          setUser({ accessToken: res.data.access_token });
          originalRequest.headers.authorization = `Bearer ${res.data.access_token}`;
          originalRequest._retry = true;

          return api(originalRequest);
        } catch (error) {
          setUser({ accessToken: "" });
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default useAxiosInterceptors;
