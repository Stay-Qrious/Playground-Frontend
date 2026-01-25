import { useState } from "react";
import { setUser } from "../utils/userSlice";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BaseURL } from "../utils/constants";
// Import your creative background image
import EditProfileBg from "../images/EditProfile.png";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [skills, setSkills] = useState(user.skills || []);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(BaseURL + "/profile/edit", 
        { firstName, lastName, age, about, photoUrl, skills }, 
        { withCredentials: true }
      );
      dispatch(setUser(res.data.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setError(null);
    } catch (e) {
      console.log(e);
      setError(e.response.data || "Something went wrong");
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed py-10 px-4 flex justify-center items-start relative"
      style={{ backgroundImage: `url(${EditProfileBg})` }}
    >
      {/* Visual Overlay for contrast - ensures form readability */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl z-10">
        
        {/* FORM SIDE - Upgraded to Glassmorphism */}
        <div className="card bg-white/10 backdrop-blur-xl shadow-2xl flex-[1.5] border border-white/20 rounded-[2.5rem] overflow-hidden">
          <div className="card-body p-8 md:p-10">
            <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-8">Player Settings</h2>

            <div className="space-y-6">
              {/* Names Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">First Name</label>
                  <input type="text" className="input input-bordered bg-black/20 border-white/10 text-white rounded-xl focus:border-primary transition-all" 
                    value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">Last Name</label>
                  <input type="text" className="input input-bordered bg-black/20 border-white/10 text-white rounded-xl focus:border-primary transition-all" 
                    value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>

              {/* Age & Photo Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">Age</label>
                  <input type="number" className="input input-bordered bg-black/20 border-white/10 text-white rounded-xl focus:border-primary transition-all" 
                    value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">Profile Photo URL</label>
                  <input type="text" className="input input-bordered bg-black/20 border-white/10 text-white rounded-xl focus:border-primary transition-all" 
                    value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                </div>
              </div>

              {/* Full Width Fields */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] ml-1">Sports & Skills</label>
                <input type="text" className="input input-bordered bg-black/20 border-white/10 text-white rounded-xl focus:border-secondary transition-all" 
                  value={skills.join(", ")} placeholder="React, Node, Java..."
                  onChange={(e) => setSkills(e.target.value.split(",").map(s => s.trim()))} />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] ml-1">About Me</label>
                <textarea className="textarea textarea-bordered bg-black/20 border-white/10 text-white h-32 resize-none rounded-xl focus:border-secondary transition-all" 
                  value={about} onChange={(e) => setAbout(e.target.value)} />
              </div>
            </div>

            {error && (
              <div className="alert alert-error bg-red-500/20 border-red-500/50 text-red-200 py-2 mt-4 rounded-xl text-xs font-bold uppercase italic">
                <span>{error}</span>
              </div>
            )}

            <div className="card-actions justify-end mt-10">
              <button onClick={saveProfile} className="btn btn-primary btn-md px-12 rounded-full font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                Update Profile
              </button>
            </div>
          </div>
        </div>

        {/* PREVIEW SIDE - Sticky on Desktop */}
        <div className="flex flex-col items-center lg:sticky lg:top-10 flex-1">
          <div className="bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 mb-6">
            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Live Preview</p>
          </div>
          <UserCard user={{ firstName, lastName, age, about, photoUrl, skills }} isPreview={true} />
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center z-[100]">
          <div className="alert alert-success bg-gradient-to-r from-green-500 to-emerald-600 text-white border-none shadow-2xl font-black uppercase tracking-widest text-xs px-10 rounded-full">
            <span>✓ Profile Saved!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;