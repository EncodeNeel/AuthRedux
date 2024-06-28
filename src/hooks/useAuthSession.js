import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/authSlice";

const useAuthSession = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      fetch("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            dispatch(setUser(data.user));
          }
        })
        .catch((err) => console.error(err));
    }
  }, [token, dispatch]);

  return token;
};

export default useAuthSession;
