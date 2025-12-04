import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { clearFeed } from '../utils/feedSlice'
import { removeConnections } from '../utils/connectionSlice'
import { clearRequest } from '../utils/requestSlice' 
import { BASE_URL } from '../utils/constent'
import { useNavigate } from 'react-router-dom'
import { removeUser } from '../utils/userSlice'
import logo from '../assets/devtinder-logo.svg'
const NavBar = () => {
  const user = useSelector((store)=>store.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
    const handleLogout = async() => {
        try {
          const response = await axios.post(BASE_URL+"/logout",
            {}, 
            {withCredentials: true}); 
            dispatch(removeUser());        // clear logged-in user
            dispatch(clearFeed());         // clear feed data
            dispatch(removeConnections()); // clear connections
            dispatch(clearRequest());      // clear requests
          
        
          navigate("/login")
        } catch (error) {
          console.log(error)
        } 
    }
   return (
  handleLogout && (
    <div className="w-full">
      <div className="navbar bg-base-300 shadow-sm">
        {/* Wrapper to center content and add side padding */}
        <div className="w-full max-w-6xl mx-auto px-4 flex justify-between items-center">
          
          {/* Left: Logo */}
          <div className="flex-1">
            <Link to="/feed" className="btn btn-ghost text-xl">
              <img src={logo} alt="devTinder" className="h-8" />
            </Link>
          </div>

          {/* Right: User section */}
          {user && (
            <div className="flex items-center gap-2">
              {/* Hide welcome text on very small screens */}
              <p className="hidden sm:flex text-sm md:text-lg items-center">
                Welcome,&nbsp;
                <span className="font-semibold">{user.firstName}</span>
              </p>

              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="user Photo"
                      src={user.photoUrl}
                    />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/profile" className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/connection">Connection</Link>
                  </li>
                  <li>
                    <Link to="/request">Request</Link>
                  </li>
                  <li>
                    {/* Use button semantics for accessibility */}
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
);

}

export default NavBar;