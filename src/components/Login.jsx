import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlice";
import { BaseURL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      console.log("Submitting...");
      const res = await axios.post(
        BaseURL + "/login",
        { email, password },
        { withCredentials: true }
      );
      console.log("Response:", res.data);
      dispatch(setUser(res.data));
      navigate("/feed");
    } catch (err) {
      console.error("Authentication failed:", err);
      setError(err.response?.data || "Something went wrong");
    }
  };
  const handleSignup = async () => {
    try {
      console.log("Signing up...");
      const res = await axios.post(
        BaseURL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      console.log("Signup Response:", res.data.data);
      dispatch(setUser(res.data.data));
      navigate("/profile");

    } catch (err) {
      console.error("Signup failed:", err);
      setError(err.response?.data || "Something went wrong");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title flex justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>

          {!isLoginForm && (
              <div className="flex space-x-4">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-lg">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-lg">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </div>
          )}

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg">Email</legend>
            <input
              type="text"
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg">Password</legend>
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>

          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignup}>
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <div className="mt-4 text-center">
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setIsLoginForm(!isLoginForm)}
            >
              {isLoginForm ? "Create an account" : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
