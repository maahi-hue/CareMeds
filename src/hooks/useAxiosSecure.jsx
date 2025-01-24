import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          await handleLogout();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [handleLogout, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;
