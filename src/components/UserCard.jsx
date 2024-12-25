import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";

const UserCard = ({user}) => {
   const {_id,firstName , lastName ,photoUrl,about ,age,gender} = user;
   const dispatch = useDispatch();
   const handleSendRequest = async( status , _id)  =>{
    try{
  const res = await axios.post(BASE_URL + "/request/send/"+ status +"/" + _id , {},{withCredentials:true});
  dispatch(removeUserFromFeed(_id));
    } catch(err) {

    }
   }
  return (
    <div className="card bg-base-300 w-96 shadow-xl my-2">
      <figure>
        <img
          src={photoUrl}
          alt="photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        { age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-centre m-4">
          <button className="btn btn-secondary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
          <button className="btn btn-primary" onClick={() => handleSendRequest("interested", _id)}> Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
