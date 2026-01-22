import { BaseURL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, about, age, skills } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async(status) => {
    try{
      const res = await axios.post(BaseURL + "/request/send/" + status + "/" + user._id, {}, { withCredentials: true });
      dispatch(removeFeed(user._id));

    }
    catch(e){
      console.log(e);
    }
  }
  if(!user) return <div>No user data</div>

  return (
    <div className="card w-full max-w-sm bg-[#1e293b] shadow-2xl rounded-3xl overflow-hidden border border-slate-700 min-h-[550px]">
      {/* Visual Header */}
      <figure className="relative h-72 w-full">
        <img 
          src={photoUrl || "https://via.placeholder.com/400"} 
          alt="Profile" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] via-transparent to-transparent" />
        <div className="absolute bottom-4 left-6">
          <h2 className="text-2xl font-bold text-white leading-tight">
            {firstName} {lastName}
          </h2>
          <p className="text-slate-400 text-sm font-semibold">{age ? `${age} Years Old` : "Player"}</p>
        </div>
      </figure>

      <div className="card-body p-6 flex flex-col justify-between">
        <div className="space-y-4">
          {/* About Section */}
          <div className="relative">
            <h3 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">About Me</h3>
            <div className="max-h-24 overflow-y-auto pr-1 text-sm text-slate-300 leading-relaxed custom-scrollbar">
              {about || "No bio provided."}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Tech Stack</h3>
            <div className="flex flex-wrap gap-1.5">
              {skills?.length > 0 ? (
                skills.map((skill, i) => (
                  <span key={i}  className="px-3 py-1 bg-indigo-900/30 text-indigo-300 text-xs font-bold rounded-md border border-indigo-500/50 uppercase tracking-wider">
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-[10px] text-slate-600 italic">No skills listed</span>
              )}
            </div>
          </div>
        </div>

        {/* Consistent Actions */}
        <div className="grid grid-cols-2 gap-3 pt-6 border-t border-slate-700/50">
          <button className="btn btn-outline btn-sm border-slate-600 text-slate-400 rounded-xl hover:bg-slate-700" onClick={() => handleSendRequest("ignored")}>Ignore</button>
          <button className="btn btn-primary btn-sm rounded-xl" onClick={() => handleSendRequest("interested")}>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;