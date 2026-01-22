import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import EditProfile from "./EditProfile";
import { BaseURL } from "../utils/constants";



const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (user) return;   

    try {
      const res = await axios.get(BaseURL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(setUser(res.data));
    } catch (e) {
      if (e.response?.status === 401) {
        navigate("/login");   
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []); 

  return (
    user ? (
      <div>
        <EditProfile user={user} />
      </div>
    ) : (
      <div>Loading...</div>
    )
  );

};

export default Profile;
