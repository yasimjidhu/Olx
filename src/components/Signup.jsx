

import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import colorLogo from "../assets/images/color-logo.png";
import "../pages/Signup.css";
import { firebaseContext } from "../store/FirebaseContext";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase/config";
import { doc, collection, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to track loading state
  const { firebase } = useContext(firebaseContext);
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set isLoading to true when signup starts
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save the user to Firestore
      const userCollection = collection(db, "users");
      await setDoc(doc(userCollection, user.email), {
        id: user.uid,
        userName: userName,
        email: email,
        phoneNumber: number,
      });

      // Update the user profile with the username
      await updateProfile(user, {
        displayName: userName,
      });

      // Navigate to the login page
      navigate("/login");
    } catch (error) {
      Swal.fire({
        title: "Error occurred",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "red",
      });
      console.error("Error in signing up:", error.message);
    } finally {
      setIsLoading(false); // Set isLoading back to false after signup completes (whether success or error)
    }
  };

  return (
    <div className="w-full h-lvh flex justify-center items-center">
      <div className="w-[300px] h-[500px] border-2 border-black">
        <img className="w-[150px] mx-auto mt-5" src={colorLogo} alt="" />
        <form onSubmit={handleSubmit}>
          <div className="">
            <label className="block ml-2" htmlFor="User Name">
              UserName
            </label>
            <input
              className="input-field"
              type="text"
              placeholder="john"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="">
            <label className="block ml-2" htmlFor="User Name">
              Email
            </label>
            <input
              className="input-field"
              type="email"
              placeholder="john@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="">
            <label className="block ml-2" htmlFor="User Name">
              Phone Number
            </label>
            <input
              className="input-field"
              type="number"
              placeholder="9876543210"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="">
            <label className="block ml-2" htmlFor="User Name">
              Password
            </label>
            <input
              className="input-field ml-2"
              type="password"
              placeholder="enter a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="bg-green-950 w-[90%] ml-2 mr-2 py-2 text-white">
            Signu Up
          </button>
          <h1
            onClick={redirectToLogin}
            className="m-auto text-center mt-2 font-bold cursor-pointer "
          >
            Login
          </h1>
          {/* Show the loading spinner when isLoading is true */}
          {isLoading && (
            <div className="flex justify-center  mt-10 ">
              <ClipLoader
                color={"#000"}
                loading={isLoading}
                size={35}
                className="m-2"
              />
              <h1 className="text-pink-700 font-bold m-2">
                Authenticating.......
              </h1>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
