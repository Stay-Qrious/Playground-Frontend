import { useState } from "react";
import { BaseURL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import { motion, AnimatePresence } from "framer-motion";

const UserCard = ({ user }) => {
  const [swipeDirection, setSwipeDirection] = useState(0); // 0 = none, -1 = left, 1 = right
  const dispatch = useDispatch();

  if (!user) return null;
  const { firstName, lastName, photoUrl, about, age, skills } = user;

  const handleAction = async (status) => {
    // Set direction for the animation: Ignored moves left (-500), Interested moves right (500)
    setSwipeDirection(status === "interested" ? 500 : -500);

    try {
      await axios.post(BaseURL + "/request/send/" + status + "/" + user._id, {}, { withCredentials: true });
      
      // Wait a tiny bit for the animation to start before removing from Redux
      setTimeout(() => {
        dispatch(removeFeed(user._id));
        setSwipeDirection(0); // Reset for the next card
      }, 100);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={user._id}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ 
          x: swipeDirection, // Dynamically use the state
          opacity: 0, 
          rotate: swipeDirection / 20, // Tilts the card as it flies out
          transition: { duration: 0.3 } 
        }}
        className="card w-full max-w-sm bg-white/10 backdrop-blur-xl shadow-2xl rounded-[2.5rem] overflow-hidden border border-white/20 min-h-[600px] mb-10"
      >
        <figure className="relative h-80 w-full overflow-hidden">
          <img src={photoUrl || "https://via.placeholder.com/400"} alt="Profile" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-8">
            <h2 className="text-3xl font-black text-white uppercase italic">{firstName} {lastName}</h2>
            <span className="badge badge-primary font-bold mt-1">{age || "?"} YEARS</span>
          </div>
        </figure>

        <div className="card-body p-8 flex flex-col justify-between">
          <div className="space-y-6 text-left">
            <div>
              <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Player Bio</h3>
              <p className="text-sm text-white/80 leading-relaxed">{about || "Ready for a match!"}</p>
            </div>
            <div>
              <h3 className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] mb-3">Sports</h3>
              <div className="flex flex-wrap gap-2">
                {skills?.map((skill, i) => (
                  <span key={i} className="px-4 py-1.5 bg-white/5 text-white text-[10px] font-black rounded-full border border-white/10 uppercase">{skill}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-8 mt-auto">
            <button 
              className="btn btn-ghost border-white/10 text-white/50 rounded-2xl hover:bg-red-500/20 hover:text-red-400 font-black tracking-widest text-xs" 
              onClick={() => handleAction("ignored")}
            >
              Pass ⬅️
            </button>
            <button 
              className="btn btn-primary rounded-2xl shadow-lg shadow-primary/30 font-black tracking-widest text-xs" 
              onClick={() => handleAction("interested")}
            >
              Connect ➡️
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserCard;