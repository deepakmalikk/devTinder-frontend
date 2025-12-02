import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constent"; // ensure this is set to backend + "/api"

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      const res = await axios.post(
        // baseURL should be like: "https://devtinder-backend-1-f97o.onrender.com/api"
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      // backend might return user as res.data or res.data.data depending on implementation
      const userData = res?.data?.data ?? res?.data ?? null;

      if (!userData) {
        throw new Error("Invalid response from server");
      }

      dispatch(addUser(userData));
      return navigate("/feed");
    } catch (err) {
      console.error("Login error:", err);
      setError(err?.response?.data || err.message || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );

      const userData = res?.data?.data ?? res?.data ?? null;
      if (!userData) {
        throw new Error("Invalid response from server");
      }

      dispatch(addUser(userData));
      return navigate("/profile");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err?.response?.data || err.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center my-20">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <div className="flex flex-col gap-4">
            {!isLoginForm && (
              <>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </>
            )}
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email ID:</span>
              </div>
              <input
                type="text"
                value={emailId}
                placeholder="Enter Email ID"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                placeholder="Enter Password"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center m-2">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>

          <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm ? "New User? Signup Here" : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
