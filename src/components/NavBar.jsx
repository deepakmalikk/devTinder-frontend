import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { clearFeed } from '../utils/feedSlice';
import { removeConnections } from '../utils/connectionSlice';
import { clearRequest } from '../utils/requestSlice';
import { BASE_URL } from '../utils/constent';
import { removeUser } from '../utils/userSlice';
import logo from '../assets/devtinder-logo.svg';

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false); // controls dropdown open/close

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + '/logout',
        {},
        { withCredentials: true }
      );

      dispatch(removeUser());        // clear logged-in user
      dispatch(clearFeed());         // clear feed data
      dispatch(removeConnections()); // clear connections
      dispatch(clearRequest());      // clear requests

      setOpen(false);                // close dropdown
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  // If no user, don't show navbar
  if (!user) return null;

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-full">
      <div className="navbar bg-base-300 shadow-sm">
        <div className="w-full max-w-6xl mx-auto px-4 flex justify-between items-center">
          {/* Left: Logo */}
          <div className="flex items-center gap-2 flex-1">
            <Link
              to="/feed"
              className="btn btn-ghost text-xl flex items-center gap-2"
            >
              <img src={logo} alt="devTinder" className="h-8" />
            </Link>
          </div>

          {/* Center: Main nav links (Home, Matches, Requests) */}
          <div className="hidden sm:flex gap-4 mr-6">
            <Link
              to="/feed"
              className={`btn btn-ghost btn-sm ${
                isActive('/feed') ? 'btn-active' : ''
              }`}
            >
              Home
            </Link>

            <Link
              to="/connection"
              className={`btn btn-ghost btn-sm ${
                isActive('/connection') ? 'btn-active' : ''
              }`}
            >
              Matches
            </Link>

            <Link
              to="/request"
              className={`btn btn-ghost btn-sm ${
                isActive('/request') ? 'btn-active' : ''
              }`}
            >
              Requests
            </Link>
          </div>

          {/* Right: User section */}
          <div className="flex items-center gap-3">
            {/* Welcome text (hidden on very small screens) */}
            <p className="hidden sm:flex text-sm md:text-lg items-center">
              Welcome,&nbsp;
              <span className="font-semibold">{user.firstName}</span>
            </p>

            {/* Avatar dropdown: only Profile + Logout */}
            <div
              className="dropdown dropdown-end"
              onBlur={() => setOpen(false)}
            >
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
                onClick={() => setOpen((prev) => !prev)} // toggle dropdown
              >
                <div className="w-10 rounded-full">
                  <img alt="user Photo" src={user.photoUrl} />
                </div>
              </div>

              {open && (
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link
                      to="/profile"
                      className="justify-between"
                      onClick={() => setOpen(false)} // close on click
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile nav links below navbar */}
      <div className="sm:hidden bg-base-300 border-t border-base-200">
        <div className="flex justify-around py-2">
          <Link
            to="/feed"
            className={`btn btn-ghost btn-xs ${
              isActive('/feed') ? 'btn-active' : ''
            }`}
          >
            Home
          </Link>
          <Link
            to="/connection"
            className={`btn btn-ghost btn-xs ${
              isActive('/connection') ? 'btn-active' : ''
            }`}
          >
            Matches
          </Link>
          <Link
            to="/request"
            className={`btn btn-ghost btn-xs ${
              isActive('/request') ? 'btn-active' : ''
            }`}
          >
            Requests
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
