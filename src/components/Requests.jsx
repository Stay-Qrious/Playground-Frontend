import { BaseURL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addRequests,removeRequest } from "../utils/requestsSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (requestId, action) => {
    try {
      const res = await axios.post(BaseURL + `/request/review/${action}/${requestId}`, {}, { withCredentials: true });
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

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="font-bold text-2xl text-gray-500">No Requests Found</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center my-10 px-4 min-h-screen">
      <h1 className="font-bold text-3xl mb-8 text-white">Connection Requests</h1>

      <div className="w-full max-w-3xl space-y-4">
        {requests.map((request) => {

          const { firstName, lastName, photoUrl, about, gender, age, skills } = request.fromUserId;
          console.log(request.fromUserId);

          return (
            <div
              key={request._id}
              className="flex flex-col md:flex-row items-center p-6 bg-base-300 rounded-2xl shadow-xl border border-gray-700 hover:border-indigo-500 transition-all"
            >
              {/* Profile Picture */}
              <div className="avatar">
                <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={photoUrl} alt={firstName} className="object-cover" />
                </div>
              </div>

              {/* User Details */}
              <div className="flex-1 mt-4 md:mt-0 md:ml-8 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <h2 className="text-2xl font-bold text-white">
                    {firstName} {lastName}
                  </h2>
                  <div className="badge badge-secondary badge-outline capitalize">
                    {gender} • {age}
                  </div>
                </div>

                <p className="mt-2 text-gray-400 italic">
                  {about || "No bio provided."}
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                  {skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-900/30 text-indigo-300 text-xs font-bold rounded-md border border-indigo-500/50 uppercase tracking-wider"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 md:mt-0 md:ml-4">
                <button className="btn btn-ghost text-error hover:bg-error/10" onClick={() => reviewRequest(request._id, "rejected")}>
                  Reject
                </button>
                <button className="btn btn-primary px-8" onClick={() => reviewRequest(request._id, "accepted")}>
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