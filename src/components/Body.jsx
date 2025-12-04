// src/components/Body.jsx
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constent";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect, useState } from "react";

const Body = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(response.data));
    } catch (error) {
      // If unauthorized, force login
      if (error.response && error.response.status === 401) {
        if (location.pathname !== "/login") {
          navigate("/login", { replace: true });
        }
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Whenever path changes, if it's not /login and we have no user, try to fetch user
  useEffect(() => {
    if (location.pathname === "/login") return;

    if (!userData) {
      fetchUser();
    }
  }, [location.pathname]);

  // If user becomes null (e.g. after logout), and we are on a protected route, go to login
  useEffect(() => {
    if (!userData && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
  }, [userData]);

  // Optional: show simple loading while checking auth
  if (loading && location.pathname !== "/login" && !userData) {
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
