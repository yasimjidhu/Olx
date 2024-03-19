import React, { useContext, useState } from "react";
import logo from "../assets/images/logo.svg";
import { Search, Plus } from "react-feather";
import { AuthContext } from "../store/FirebaseContext";
import { LogOut } from "react-feather";
import { auth } from "../firebase/config";
import { useNavigate, Link } from "react-router-dom";
import FetchQuery from "./FetchQuery";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleSearch = () => {
    setSearchValue(searchValue);
  };

  return (
    <>
      <div className="flex items-center justify-between w-full h-[45px] mt-2">
        <div className="w-1/12 flex items-center h-full mr-4">
          <img className="w-[60px] mx-auto" src={logo} alt="" />
        </div>
        <div className="relative w-2/12 flex items-center h-full mr-4">
          <Search className="absolute right-0 mx-auto bg-blue-950 text-white h-full w-[32px]" />
          <input
            className="h-full w-full  border-2 border-black px-2"
            type="text"
            placeholder="India"
          />
        </div>
        <div className="relative w-5/12 flex items-center h-full mr-4">
          <Search
            onClick={handleSearch}
            className="absolute right-0 text-white mx-auto bg-blue-950 h-full w-[32px] cursor-pointer"
          />
          <input
            className="h-full w-full  border-2 border-black px-2"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="search for car's, phones, bikes"
          />
          {/* Render FetchQuery component with searchValue prop */}
          <FetchQuery searchValue={searchValue} />
        </div>
        <div className="w-1/12 flex items-center h-full mr-2">
          <h1 className="font-bold uppercase">ENGLISH</h1>
        </div>
        <div className="w-1/12 flex items-center h-full mr-2">
          <a href="/login">
            <h1 className="font-bold text-sm uppercase border-b  border-black">
              {user ? user.displayName : "Login"}
            </h1>
          </a>
        </div>
        <div className="w-1/12 flex items-center justify-center h-full mr-2 rounded-3xl bg-white-600 border border-yellow-600 border-1">
          {user && (
            <span className="cursor-pointer" onClick={handleLogout}>
              <LogOut />
            </span>
          )}
        </div>
        <div className="w-1/12 flex items-center justify-center h-full mr-2 rounded-3xl bg-white-600 border border-yellow-600 border-1">
          <Link to="/create" className="flex items-center">
            <Plus />
            <h1 className="ml-1 font-bold uppercase">Sell</h1>
          </Link>
        </div>
      </div>
      <div className="flex justify-around mt-3">
        <h1>All Categories</h1>
        <h1>Cars</h1>
        <h1>Motorcycles</h1>
        <h1>Mobile Phones</h1>
        <h1>For Sale:House & Appartments</h1>
        <h1>Scooters</h1>
        <h1>Commercial & Other Vehicles</h1>
        <h1>For Rent:Houses & Appartments</h1>
      </div>
    </>
  );
};

export default Navbar;
