import React, { useState } from "react";
import UserCard from "./userCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      const i = setInterval(() =>{
        setShowToast(false);
      },3000);
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <>
      <div className="flex justify-center my-10">
        <div>
          <div className="flex justify-center mx-10">
            <div className="card bg-base-300 w-96 shadow-xl">
              <div className="card-body">
                <h2 className="card-title justify-center">Edit Profile</h2>
                <div>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">First Name</span>
                    </div>

                    <input
                      type="text"
                      value={firstName}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">Last Name</span>
                    </div>

                    <input
                      type="text"
                      value={lastName}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">age</span>
                    </div>

                    <input
                      type="text"
                      value={age}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">gender</span>
                    </div>

                    <input
                      type="text"
                      value={gender}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">about</span>
                    </div>
                    <textarea className="textarea textarea-bordered" placeholder="Bio" value={about} onChange={(e) => setAbout(e.target.value)}/>

                   
                  </label>

                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">photoUrl</span>
                    </div>

                    <input
                      type="text"
                      value={photoUrl}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                  </label>
                </div>
                <p className="text-red-600"> {error}</p>
                <div className="flex justify-centre">
                  <button className="btn btn-primary " onClick={saveProfile}>
                    Save profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
