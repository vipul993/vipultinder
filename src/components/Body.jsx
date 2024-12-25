import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status == 401) {
        Navigate("/login");
      }
      console.error(err);
    }
  };
  useEffect(() => {
    
    fetchUser();
  }, []);
  return (
    <div>
      <Navbar />
     <div  style={{
    backgroundImage: "url(https://wallup.net/wp-content/uploads/2015/12/59578-landscape-forest-mountain-sun_rays.jpg)",
  }}><Outlet/></div> 
      <Footer />
    </div>
  );
};

export default Body;
