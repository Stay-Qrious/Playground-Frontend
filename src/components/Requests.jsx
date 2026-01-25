import { BaseURL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// Import the background image
import RequestsBg from "../images/Requests.png";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (requestId, action) => {
    try {
      await axios.post(BaseURL + `/request/review/${action}/${requestId}`, {}, { withCredentials: true });
      dispatch(removeRequest(requestId));
    } catch (error) {
      console.error(`Error ${action} request:`, error);
    }
  }

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BaseURL + "/user/requests/received", { withCredentials: true });
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  // Loading State with Background
  if (!requests) {
    return (
      <div 
        className="flex justify-center items-center h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${RequestsBg})` }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <span className="loading loading-spinner loading-lg text-primary z-10"></span>
      </div>
    );
  }

  // Empty State with Background
  if (requests.length === 0) {
    return (
      <div 
        className="flex flex-col justify-center items-center h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${RequestsBg})` }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>
        <div className="z-10 bg-white/10 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/20 shadow-2xl text-center max-w-sm mx-4">
          <div className="text-5xl mb-4">🔔</div>
          <h1 className="text-2xl text-white uppercase font-black tracking-tight">All Caught Up!</h1>
          <p className="text-white/60 mt-2">No new connection requests at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center pt-10 pb-32 px-4"
      style={{ backgroundImage: `url(${RequestsBg})` }}
    >
      {/* Visual Overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/70 pointer-events-none"></div>

      <h1 className="font-black text-4xl mb-10 text-white z-10 drop-shadow-2xl italic tracking-tighter uppercase">
        Connection Requests
      </h1>

      <div className="w-full max-w-4xl space-y-6 z-10">
        {requests.map((request) => {
          const { firstName, lastName, photoUrl, about, gender, age, skills } = request.fromUserId;

          return (
            <div
              key={request._id}
              className="flex flex-col md:flex-row items-center p-6 bg-white/10 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/10 hover:border-primary/50 transition-all duration-300 group"
            >
              {/* Profile Picture with Ring */}
              <div className="avatar">
                <div className="w-24 h-24 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2 transition-transform duration-500 group-hover:scale-110">
                  <img src={photoUrl} alt={firstName} className="object-cover" />
                </div>
              </div>

              {/* User Details */}
              <div className="flex-1 mt-6 md:mt-0 md:ml-10 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-3 justify-center md:justify-start">
                  <h2 className="text-3xl font-black text-white tracking-tight uppercase">
                    {firstName} {lastName}
                  </h2>
                  <div className="badge badge-secondary font-bold uppercase text-[10px]">
                    {gender} • {age}
                  </div>
                </div>

                <p className="mt-3 text-white/70 italic text-sm leading-relaxed max-w-md">
                  "{about || "Hey! I'm looking for teammates."}"
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 mt-5 justify-center md:justify-start">
                  {skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/20 text-white text-[10px] font-black rounded-full border border-primary/30 uppercase tracking-widest"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row md:flex-col gap-3 mt-8 md:mt-0 md:ml-6 w-full md:w-auto">
                <button 
                  className="btn btn-ghost flex-1 md:btn-sm text-white/50 hover:text-error hover:bg-error/10 border-white/10 font-bold uppercase text-xs" 
                  onClick={() => reviewRequest(request._id, "rejected")}
                >
                  Reject
                </button>
                <button 
                  className="btn btn-primary flex-1 md:btn-sm px-10 rounded-xl shadow-lg shadow-primary/20 font-black uppercase text-xs" 
                  onClick={() => reviewRequest(request._id, "accepted")}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Requests;