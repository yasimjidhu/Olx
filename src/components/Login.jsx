import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import colorLogo from "../assets/images/color-logo.png";
import { useNavigate } from "react-router-dom";
import { firebaseContext } from "../store/FirebaseContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { firebase } = useContext(firebaseContext);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
            title: "error occured",
            text: error.message,
            icon: error,
            confirmButtonText: "OK",
            confirmButtonColor: "red",
          });

      });
  };

  const redirectTSignup = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className="w-full h-lvh flex justify-center items-center">
        <div className="w-[300px] h-[500px] border-2 border-black">
          <img className="w-[280px] mx-auto mt-5" src={colorLogo} alt="" />
          <form onSubmit={handleLogin}>
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
              Login
            </button>
            <h1
              onClick={redirectTSignup}
              className="m-auto text-center mt-2 font-bold cursor-pointer"
            >
              Signup
            </h1>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
