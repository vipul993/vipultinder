import { useState } from "react";
import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "something went wrong");
    }
  };
  const handleSignUp =  async () =>{
    try{
const res = await axios.post(BASE_URL +"/signup",{firstName,lastName,emailId,password},{withCredentials:true});
dispatch(addUser( res.data.data));
return navigate("/profile");
    } catch(err){
      setError(err?.response?.data || "something went wrong");
    }
  };
  return (
    <div className="flex justify-center">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "SignUp"}
          </h2>
          <div>
            {!isLoginForm && (
              <>
                <label className="form-control w-full max-w-xs py-1">
                  <div className="label">
                    <span className="label-text">firstName</span>
                  </div>

                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs py-1">
                  <div className="label">
                    <span className="label-text">lastname</span>
                  </div>

                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </>
            )}
            <label className="form-control w-full max-w-xs py-1">
              <div className="label">
                <span className="label-text">Email Id</span>
              </div>

              <input
                type="text"
                value={emailId}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs py-1">
              <div className="label">
                <span className="label-text">password</span>
              </div>

              <input
                type="password"
                value={password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <p className="text-red-600"> {error}</p>
          <div className="flex justify-centre">
            <button className=" m-auto btn btn-primary " onClick={ isLoginForm? handleLogin: handleSignUp}>
              {isLoginForm? "login": "signup"}
            </button>
          </div>
          <p className="m-auto cursor-pointer my-1" onClick={() =>setIsLoginForm((value) =>!value)}> {isLoginForm? "new user? signup here": "existing user? login here"}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
