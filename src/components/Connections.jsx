import axios from 'axios'
import { BaseURL } from '../utils/constants'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionsSlice';
import { Link } from 'react-router-dom';
// Import your background image
import ConnectionsBg from "../images/Connection.png";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BaseURL + "/user/connections", { withCredentials: true });
      dispatch(addConnections(res.data.data));
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchConnections();
  }, []);

  // Loading State with Background
  if (!connections) {
    return (
      <div 
        className="flex justify-center items-center h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${ConnectionsBg})` }}
      >
        <div className="absolute inset-0 bg-black/40 "></div>
        <span className="loading loading-infinity loading-lg text-primary z-10"></span>
      </div>
    );
  }

  // Empty State with Background
  if (connections.length === 0) {
    return (
      <div 
        className="flex flex-col justify-center items-center h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${ConnectionsBg})` }}
      >
        <div className="absolute inset-0 bg-black/50 "></div>
        <div className="z-10 bg-white/10 p-10 rounded-[2.5rem] border border-white/20 shadow-2xl text-center max-w-sm mx-4">
          <div className="text-5xl mb-4">🏃‍♂️</div>
          <h1 className="text-bold text-2xl text-white uppercase font-black tracking-tight">No Connections Yet</h1>
          <p className="text-white/60 mt-2">Find players on the feed and connect with them to start a match!</p>
          <Link to="/feed">
            <button className="btn btn-primary mt-6 rounded-full px-8">Go to Feed</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center pt-10 pb-32 px-4"
      style={{ backgroundImage: `url(${ConnectionsBg})` }}
    >
      {/* Subtle overlay for content readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60 pointer-events-none"></div>

      <h1 className="font-black text-4xl mb-10 text-white z-10 drop-shadow-2xl italic tracking-tighter uppercase">
        Your Arena Connections
      </h1>

      <div className="w-full max-w-xl space-y-4 z-10">
        {connections.map((connection) => (
          <div
            key={connection._id}
            className="flex items-center p-5 bg-white/10  border border-white/20 rounded-[1.5rem] shadow-xl hover:bg-white/20 transition-all duration-300 group"
          >
            {/* Avatar Container with Glow */}
            <div className="flex-shrink-0 relative">
               <div className="absolute -inset-1 bg-primary/30 rounded-full  opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img
                src={connection.photoUrl || "https://via.placeholder.com/150"}
                alt={`${connection.firstName}'s profile`}
                className="w-16 h-16 rounded-full object-cover border-2 border-primary/50 relative z-10"
              />
            </div>

            {/* User Info */}
            <div className="ml-5 flex-grow">
              <h2 className="text-xl font-black text-white leading-tight tracking-tight uppercase">
                {connection.firstName} {connection.lastName}
              </h2>
              <p className="text-xs text-primary font-bold uppercase tracking-widest mt-1">Connected</p>
            </div>

            {/* Chat Button */}
            <Link to={`/chat/${connection._id}`}>
              <button className="btn btn-primary btn-sm px-6 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                Chat
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Connections;