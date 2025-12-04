import NavBar from './NavBar'
 
import Footer from './Footer'
 
import axios from 'axios'
import { BASE_URL } from '../utils/constent'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
    
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const Body = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const fetchUser = async () => {
    try {
      if (userData) return;

      const response = await axios.get(
        BASE_URL + "/profile/view",
        { withCredentials: true }
      );
      dispatch(addUser(response.data));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        if (location.pathname !== "/login") {
          navigate("/login");
        }
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (location.pathname === "/login") return;
    fetchUser();
  }, [location.pathname]);  
  // ...


  return (
    <div>
      {userData && <NavBar />}
      <Outlet/>
      <Footer/>
    </div>
  )
};   

export default Body
 