import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BaseURL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BaseURL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    // Added Glassmorphism: bg-opacity, backdrop-blur, and a subtle bottom border
    <div className="navbar bg-base-100/70  sticky top-0 z-[100] px-4 md:px-8 border-b border-white/10 shadow-2xl">
      <div className="flex-1">
        {/* Logo: Changed to uppercase, bold tracking, and a primary-to-accent gradient text */}
        <Link 
          to="/feed" 
          className="btn btn-ghost text-2xl font-black tracking-tighter hover:bg-transparent"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-accent">
            PLAYGROUND
          </span> 
          <span className="ml-1 transform hover:rotate-12 transition-transform">⛹️</span>
        </Link>
      </div>

      <div className="flex gap-2">
        {user ? (
          <div className="flex items-center gap-3">
            {/* Username: Added a pill-shaped background and subtle border */}
            <div className="hidden sm:flex items-center px-4 py-1.5 bg-white/5 border border-white/10 rounded-full shadow-inner">
               <span className="text-xs font-bold text-white/50 mr-2 uppercase tracking-tighter">Player:</span>
               <span className="font-semibold text-sm text-white">
                {user.firstName} {user.lastName}
              </span>
            </div>

            <div className="dropdown dropdown-end mx-2">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar ring-2 ring-primary/50 ring-offset-2 ring-offset-base-100 hover:scale-110 transition-all duration-300"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={
                      user.photoUrl ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-200/95 backdrop-blur-xl rounded-2xl z-[1] mt-4 w-60 p-3 shadow-2xl border border-white/10"
              >
                <li className="menu-title text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">Navigation</li>
                <li>
                  <Link to="/profile" className="flex justify-between py-2 active:bg-primary">
                    Profile
                    <span className="badge badge-primary badge-sm font-bold animate-pulse">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections" className="py-2">Connections</Link>
                </li>
                <li>
                  <Link to="/requests" className="py-2">Requests</Link>
                </li>
                <div className="divider opacity-10 my-1"></div>
                <li>
                  <a 
                    onClick={handleLogout} 
                    className="text-error font-bold hover:bg-error/10 py-2"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex items-center px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
            <span className="text-sm font-bold text-white/70">Welcome, Guest</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;