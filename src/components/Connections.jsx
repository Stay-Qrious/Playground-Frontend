import axios from 'axios'
import { BaseURL } from '../utils/constants'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionsSlice';


const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {

      const res = await axios.get(BaseURL + "/user/connections", { withCredentials: true });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) {
    return (
      <div className="flex justify-center my-10"><h1 className=" text-bold text-2xl " >No Connections Found</h1></div>
    )
  }

  return (
    <div className="flex flex-col items-center my-10 px-4">
      <h1 className="font-bold text-3xl mb-8 text-white-800">Connections...</h1>

      <div className="w-full max-w-md space-y-4">
        {connections.map((connection) => (
          <div
            key={connection._id}
            className="flex items-center p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Avatar Container */}
            <div className="flex-shrink-0">
              <img
                src={connection.photoUrl}
                alt={`${connection.firstName}'s profile`}
                className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100"
              />
            </div>

            {/* User Info */}
            <div className="ml-4 flex-grow">
              <h2 className="text-lg font-semibold text-gray-900 leading-tight">
                {connection.firstName} {connection.lastName}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

}

export default Connections