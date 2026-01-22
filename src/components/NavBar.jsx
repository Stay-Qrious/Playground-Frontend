import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BaseURL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

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


  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/feed" className="btn btn-ghost text-xl">DevTinder 👨‍💻</Link>
      </div>

      <div className="flex gap-2">
        {user ? (
          <div className="flex items-center gap-3">
            <span className="font-medium">
              Welcome, {user.firstName} {user.lastName}
            </span>

            <div className="dropdown dropdown-end mx-5">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={
                      user.photoUrl ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <span className="font-medium">Welcome, Guest</span>
        )}
      </div>
    </div>
  );
};

export default NavBar;
