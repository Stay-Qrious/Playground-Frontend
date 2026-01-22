import { useState } from "react";
import { setUser } from "../utils/userSlice";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BaseURL } from "../utils/constants";

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
    <div className="min-h-screen bg-[#0f172a] py-10 px-4 flex justify-center items-start">
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl">
        
        {/* FORM SIDE - Perfectly Aligned */}
        <div className="card bg-[#1e293b] shadow-xl flex-[1.5] border border-slate-700 h-full">
          <div className="card-body p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>

            <div className="space-y-5">
              {/* Names Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">First Name</label>
                  <input type="text" className="input input-bordered bg-[#0f172a] w-full" 
                    value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Last Name</label>
                  <input type="text" className="input input-bordered bg-[#0f172a] w-full" 
                    value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>

              {/* Age & Photo Grid - Mapped to match Names Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Age</label>
                  <input type="number" className="input input-bordered bg-[#0f172a] w-full" 
                    value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Profile Photo URL</label>
                  <input type="text" className="input input-bordered bg-[#0f172a] w-full" 
                    value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                </div>
              </div>

              {/* Full Width Fields */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Skills</label>
                <input type="text" className="input input-bordered bg-[#0f172a]" 
                  value={skills.join(", ")} placeholder="React, Node, Java..."
                  onChange={(e) => setSkills(e.target.value.split(",").map(s => s.trim()))} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">About Me</label>
                <textarea className="textarea textarea-bordered bg-[#0f172a] h-28 resize-none" 
                  value={about} onChange={(e) => setAbout(e.target.value)} />
              </div>
            </div>

            {error && <p className="text-red-400 text-xs mt-4">{error}</p>}

            <div className="card-actions justify-end mt-6">
              <button onClick={saveProfile} className="btn btn-primary btn-md px-8">Save Changes</button>
            </div>
          </div>
        </div>

        {/* PREVIEW SIDE - Scaled to match Form */}
        <div className="flex flex-col items-center lg:sticky lg:top-10 flex-1">
          {/* <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Preview</p> */}
          <UserCard user={{ firstName, lastName, age, about, photoUrl, skills }} isPreview={true} />
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success bg-indigo-600 text-white border-none shadow-2xl font-bold">
            <span>Profile Saved!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;