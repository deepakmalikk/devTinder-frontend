// src/components/Body.jsx
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constent";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect, useState } from "react";

const Body = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const [authChecking, setAuthChecking] = useState(false);
  const [authCheckedOnce, setAuthCheckedOnce] = useState(false);

  const fetchUser = async () => {
    try {
      setAuthChecking(true);
      const response = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(response.data));
    } catch (error) {
      // If unauthorized, clear user
      if (error.response && error.response.status === 401) {
        dispatch(removeUser());
      } else {
        console.log(error);
      }
    } finally {
      setAuthChecking(false);
      setAuthCheckedOnce(true);
    }
  };

  // 1) On first load in ANY tab, check if the user is logged in (cookie-based)
  useEffect(() => {
    if (!authCheckedOnce) {
      fetchUser();
    }
  }, [authCheckedOnce]);

  // 2) Protect routes: if not logged in and not on /login, go to /login
  useEffect(() => {
    if (!authCheckedOnce) return; // wait until we checked auth at least once

    const isLoginRoute = location.pathname === "/login";

    if (!userData && !isLoginRoute) {
      navigate("/login", { replace: true });
    }
  }, [userData, location.pathname, authCheckedOnce, navigate]);

  // 3) If logged in and somehow on /login, redirect to /feed
  useEffect(() => {
    if (!authCheckedOnce) return;

    const isLoginRoute = location.pathname === "/login";

    if (userData && isLoginRoute) {
      navigate("/feed", { replace: true });
    }
  }, [userData, location.pathname, authCheckedOnce, navigate]);

  // Optional: simple loader while checking auth
  if (!authCheckedOnce && authChecking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {userData && <NavBar />}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
