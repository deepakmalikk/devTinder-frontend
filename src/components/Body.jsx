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

  useEffect(() => {
    if (!authCheckedOnce) {
      fetchUser();
    }
  }, [authCheckedOnce]);

  useEffect(() => {
    if (!authCheckedOnce) return;

    const isLoginRoute = location.pathname === "/login";

    if (!userData && !isLoginRoute) {
      navigate("/login", { replace: true });
    }
  }, [userData, location.pathname, authCheckedOnce, navigate]);

  useEffect(() => {
    if (!authCheckedOnce) return;

    const isLoginRoute = location.pathname === "/login";

    if (userData && isLoginRoute) {
      navigate("/feed", { replace: true });
    }
  }, [userData, location.pathname, authCheckedOnce, navigate]);

  if (!authCheckedOnce && authChecking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {userData && <NavBar />}

      {/* Main content grows and pushes footer down */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Body;
