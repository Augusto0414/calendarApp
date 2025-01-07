import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../store/store";
import calendarApi from "../api/calendarApi";
import { checkingCredentials, clearErrorMessage, login, logout } from "../store/auth/authSlice";
import { onLogout } from "../store/calendar/calendarSlice";

interface User {
  email: string;
  password: string;
}

export const useAuthStore = () => {
  const { status, errorMessage, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }: User) => {
    dispatch(checkingCredentials());
    try {
      const { data } = await calendarApi.post("/auth", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(login({ name: data.name, uid: data.uid }));
      console.log({ data });
    } catch (error) {
      dispatch(logout("Credenciales invalidas"));
      setTimeout(() => dispatch(clearErrorMessage()), 20);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(logout());
    try {
      const { data } = await calendarApi.get("/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(login({ name: data.name, uid: data.uid }));
    } catch (err) {
      localStorage.clear();
      dispatch(logout());
    }
  };
  const logoutUser = () => {
    localStorage.clear();
    dispatch(onLogout());
    dispatch(logout());
  };

  return {
    status,
    user,
    startLogin,
    errorMessage,
    checkAuthToken,
    logoutUser,
  };
};
