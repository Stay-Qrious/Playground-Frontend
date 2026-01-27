import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BaseURL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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

  // Improved, high-energy sentence
  const sentence = "DITCH THE DRINK • GEAR UP • PLAY HARD";
  const words = sentence.split(" ");

  // Color mapping for a "fancy" look
  const getColor = (word) => {
    if (word === "•") return "text-primary";
    if (["DITCH", "SCREEN"].includes(word)) return "text-red-400";
    if (["GRAB", "GEAR"].includes(word)) return "text-blue-400";
    if (["START", "PLAYING"].includes(word)) return "text-green-400";
    return "text-white/60";
  };

  return (
    <div className="navbar bg-gradient-to-b from-[#0f172a] to-[#1e293b] backdrop-blur-xl sticky top-0 z-[100] px-6 h-20 border-b border-white/5 shadow-2xl grid grid-cols-3">
      
      {/* 1. LEFT: Logo Section */}
      <div className="flex justify-start items-center">
        <Link to="/feed" className="flex items-center gap-2 group">
          <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent group-hover:brightness-125 transition-all">
            PLAYGROUND
          </span> 
          <span className="text-2xl animate-bounce group-hover:scale-125 transition-transform">⛹️</span>
        </Link>
      </div>

      {/* 2. CENTER: Animated Text (One by One) */}
      <div className="flex justify-center items-center overflow-hidden">
        <div className="flex flex-wrap justify-center gap-x-2">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.5, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{
                delay: i * 0.2, // Staggers the appearance of each word
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 3, // Pauses before restarting the cycle
                repeatType: "reverse"
              }}
              className={`text-[11px] font-black uppercase tracking-[0.2em] italic ${getColor(word)}`}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>

      {/* 3. RIGHT: Player Info Section */}
      <div className="flex justify-end items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="hidden xl:flex flex-col items-end">
               <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Active Player</span>
               <span className="font-bold text-sm text-white">{user.firstName} {user.lastName}</span>
            </div>

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="avatar ring-2 ring-primary/40 ring-offset-2 ring-offset-[#0f172a] hover:scale-105 transition-all">
                <div className="w-10 rounded-full">
                  <img src={user.photoUrl || "https://via.placeholder.com/150"} alt="Avatar" />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1] p-3 shadow-2xl bg-[#1e293b] border border-white/10 rounded-2xl w-56">
                <li className="menu-title text-white/20 text-[10px] uppercase font-bold tracking-widest">Navigation</li>
                <li><Link to="/profile" className="py-2 text-white hover:bg-white/5">Profile Settings</Link></li>
                <li><Link to="/connections" className="py-2 text-white hover:bg-white/5">My Arena Connections</Link></li>
                <li><Link to="/requests" className="py-2 text-white hover:bg-white/5">Incoming Requests</Link></li>
                <div className="divider opacity-5 my-1"></div>
                <li><button onClick={handleLogout} className="text-red-400 font-bold hover:bg-red-500/10 py-2">Logout Transmission</button></li>
              </ul>
            </div>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary btn-sm rounded-full px-6 font-black uppercase italic tracking-widest">Join Arena</Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;