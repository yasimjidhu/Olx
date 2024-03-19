import React, { useEffect, useContext, useState } from "react";
import { firebaseContext } from "../store/FirebaseContext";
import { ViewContext } from "../store/ViewContext";
import { doc, getDoc } from "firebase/firestore";

const ViewPost = () => {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(ViewContext);
  const { firebase } = useContext(firebaseContext);

  useEffect(() => {
    const { userId } = postDetails;
    const getUserDetails = async () => {
      try {
        const userDocRef = doc(firebase.firestore(), "users", userId);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserDetails(userDocSnap.data());
        } else {
          console.log("User document not found!");
        }
      } catch (error) {
        console.error("Error getting user details:", error);
      }
    };
    getUserDetails();
  }, [firebase, postDetails]);

  return (
    <div className="flex flex-col md:flex-row justify-around">
      <div className="mt-8 md:w-[1000px] sm:w-[400px] flex justify-center items-center">
        <img className="w-[600px]" src={postDetails.url} alt="" />
      </div>
      <div className="flex flex-col md:w-[400px]">
        <div className="border-2 border-black mt-14 p-5">
          <h1 className="font-bold text-black text-xl">
            {" "}
            <span className="ml-2">Price :</span>
            {postDetails.price}
          </h1>
          <h4 className="font-bold text-black text-xl">
            <span className="">Name:</span>
            {postDetails.name}
          </h4>
          <h4 className="font-bold text-black text-xl">
            <span className="">Category:</span>
            {postDetails.category}
          </h4>
          <h4 className="font-bold text-black text-xl">
            <span className="">Posted Date:</span>
            {postDetails.createdAt}
          </h4>
        </div>
        {userDetails && (
          <div className="border-1 border-black mt-2">
            <h1>Seller Details</h1>
            <p>{userDetails.userName}</p>
            <p>{userDetails.phoneNumber}</p>
            <p>{userDetails.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPost;
