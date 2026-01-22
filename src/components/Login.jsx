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
  
  // FIX 1: Defined the missing error state
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      setError(""); // Clear previous errors
      const res = await axios.post(
        BaseURL + "/login",
        { email, password },
        { withCredentials: true }
      );
      // We use the cleaned data (firstName, lastName, etc.) from your new backend
      dispatch(setUser(res.data.data)); 
      navigate("/feed");
    } catch (err) {
      console.error("Authentication failed:", err);
      // FIX 2: Correctly accessing error message from your Backend response
      setError(err.response?.data || "Something went wrong");
    }
  };

  const handleSignup = async () => {
    try {
      setError("");
      const res = await axios.post(
        BaseURL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      dispatch(setUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      console.error("Signup failed:", err);
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title flex justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>

          {/* FIX 3: Added a visual error message for the user */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

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
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignup}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <div className="mt-4 text-center">
            <button
              className="text-blue-500 hover:underline"
              onClick={() => {
                setIsLoginForm(!isLoginForm);
                setError(""); // Clear error when switching forms
              }}
            >
              {isLoginForm
                ? "Create an account"
                : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;