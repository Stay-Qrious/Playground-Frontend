import Footer from "./Footer"
import NavBar from "./NavBar"
import { Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../utils/userSlice"
import axios from "axios"
import { BaseURL } from "../utils/constants"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

axios.defaults.withCredentials = true;

const Body = () => {

    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const UserData = useSelector((store) => store.user);

    const fetchUser = async () => {
        if (UserData) return;
        try {
            const res = await axios.get(BaseURL + "/profile/view", { withCredentials: true });
            dispatch(setUser(res.data.data));
        } catch (e) {
            if (e.response?.status === 401) {
                Navigate("/login");
            }
        }
    }


    useEffect(() => {
        fetchUser();
    }, [])


    return (
        <div>
            <NavBar />

            <Outlet />

            <Footer />
        </div>

    )
}

export default Body;