import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/constent'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Body = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector((state)=>state.user)
  const fetchUser = async()=>{
    try{
      if(userData){
        return;
      }
      const response = await axios.get(BASE_URL+"/profile/view", {withCredentials: true})
      dispatch(addUser(response.data))
    }

    catch (error) {
      if (error.response && error.response.status === 401) {
        if (location.pathname !== "/login") {
          navigate("/login");
        }
      } else {
        console.log(error);
      }
    }

  };

  useEffect(()=>{
    if (location.pathname === "/login") return;
    fetchUser();
  },[location.pathname])

  return (
    <div>
      {userData && <NavBar />}
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body
 