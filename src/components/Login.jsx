import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlice";
import { BaseURL } from "../utils/constants";
import SignUpImg from "../images/SignUp.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAuth = async () => {
    try {
      setError("");
      const endpoint = isLoginForm ? "/login" : "/signup";
      const payload = isLoginForm
        ? { email, password }
        : { firstName, lastName, email, password };

      const res = await axios.post(
        BaseURL + endpoint,
        payload,
        { withCredentials: true }
      );

      dispatch(setUser(res.data.data || res.data));
      navigate(isLoginForm ? "/feed" : "/profile");
    } catch (err) {
      setError(err.response?.data || "Authentication failed. Please try again.");
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center transition-all duration-500"
      style={{ backgroundImage: `url(${SignUpImg})` }}
    >
      {/* Darker Overlay for better contrast */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-black/60 backdrop-blur-[2px]"></div> */}

      {/* Glassmorphic Card */}
      <div className="card w-full max-w-md shadow-2xl bg-white/10 backdrop-blur border border-white/20 z-10 mx-4">
        <div className="card-body p-8">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-extrabold text-white drop-shadow-lg tracking-tight">
              {isLoginForm ? "Welcome Back" : "Join the Arena"}
            </h2>
            <p className="text-white/70 mt-2 text-sm">
              {isLoginForm ? "Enter your credentials to play" : "Create your account to start playing"}
            </p>
          </div>

          {error && (
            <div className="alert alert-error py-2 mb-4 bg-red-500/80 text-white border-none text-sm animate-bounce">
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            {!isLoginForm && (
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label py-1"><span className="label-text text-white font-semibold">First Name</span></label>
                  <input
                    type="text"
                    className="input input-bordered bg-white/10 text-white placeholder:text-white/40 focus:border-primary border-white/20"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label py-1"><span className="label-text text-white font-semibold">Last Name</span></label>
                  <input
                    type="text"
                    className="input input-bordered bg-white/10 text-white placeholder:text-white/40 focus:border-primary border-white/20"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="form-control grid grid-cols-4 items-center gap-4">
              <label className="label justify-start col-span-1 py-1">
                <span className="label-text text-white font-semibold text-lg">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered bg-white/10 text-white placeholder:text-white/40 focus:border-primary border-white/20 col-span-3 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="form-control grid grid-cols-4 items-center gap-4">
              <label className="label justify-start col-span-1 py-1">
                <span className="label-text text-white font-semibold text-lg">Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered bg-white/10 text-white placeholder:text-white/40 focus:border-primary border-white/20 col-span-3 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              className="btn btn-primary w-full text-lg font-bold shadow-lg transform transition-all active:scale-95 hover:scale-[1.02]"
              onClick={handleAuth}
            >
              {isLoginForm ? "Log In" : "Sign Up Now"}
            </button>
          </div>

          <div className="divider divider-neutral text-white/30 before:bg-white/10 after:bg-white/10 text-xs">OR</div>

          <div className="text-center">
            <button
              className="text-white hover:text-primary transition-colors font-medium text-sm"
              onClick={() => {
                setIsLoginForm(!isLoginForm);
                setError("");
              }}
            >
              {isLoginForm
                ? "Don't have an account? Sign Up"
                : "Already a member? Log In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;