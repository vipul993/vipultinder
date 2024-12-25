import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();
    const reviewRequest =async ( status ,_id) =>{

      try{
   const res = axios.post(BASE_URL + "/request/review/" + status + "/"+ _id ,{},{withCredentials:true} );
   dispatch(removeRequest(_id));
      }catch(err) {

      }
    };
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addRequests(res.data.data));
    } catch (err) {}
  };
  useEffect(() => {
fetchRequests();
  },[]);
  if (!requests) return;
  if (requests.length == 0) return <h1>no requests found</h1>;
  return (
    <div className=" text-center my-10">
      <h1 className="text-bold text-3xl">requests</h1>
      {requests.map((request) => {
        const {_id,firstName , lastName , photoUrl,age,gender,about} = request.fromUserId;
        return (<div key={_id} className=" flex justify-between items-center m-4 p-4  rounded-lg bg-base-200 w-2/3 mx-auto">
           <div> <img alt="photo" className="w-30 h-30 rounded-full" src={photoUrl}/></div>
           <div className="text-left mx-4">
            <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
            <p>{about}</p>
            { age && gender && <p>{age + ","+ gender}</p>}
            </div>
            <div>
            <button className="btn btn-primary mx-2" onClick={() => reviewRequest("accepted",request._id)}>Accept</button>
            <button className="btn btn-secondary mx-2" onClick={() => reviewRequest("rejected",request._id)}>Reject</button>
            </div>
           
            </div>);
      })}
    </div>
  );
};


export default Requests;
