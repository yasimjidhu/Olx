import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, where, query, getDocs } from "firebase/firestore";
import Posts from "./Posts";

const FetchQuery = ({ searchValue }) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Create a query based on the searchValue
        const q = query(
          collection(db, "products"),
          where("name", "==", searchValue)
        );

        // Execute the query
        const querySnapshot = await getDocs(q);

        // Extract data from query snapshot
        const data = querySnapshot.docs.map((doc) => doc.data());
        setSearchResults(data);
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch data only if searchValue is not empty
    // eslint-disable-next-line react/prop-types
    if (searchValue.trim() !== "") {
      fetchData();
    } else {
      // Reset search results if searchValue is empty
      setSearchResults([]);
    }
  }, [searchValue]); // Only depend on searchValue for fetching data
  // return(
  //   // <>{searchResults.length > 0 && <Posts searchResults={searchResults} />}</>
  // )
};

export default FetchQuery;
