import React, { useState, useEffect, useContext } from "react";
import { Heart } from "react-feather";
import { firebaseContext } from "../store/FirebaseContext";
import { getFirestore, collection, getDocs, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { ViewContext } from "../store/ViewContext";
import { useNavigate } from "react-router-dom";

const Posts = ({searchResults}) => {
  const { firebase } = useContext(firebaseContext);
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(ViewContext);
  const navigate = useNavigate();

  const setPostDetailsAndNavigate = (product) => {
    setPostDetails(product);
    navigate("/view");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsCollection = collection(db, "products");
        const snapShot = await getDocs(productsCollection);
        const allProducts = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(allProducts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className=" w-full h-full flex flex-col ml-2 mr-2 mt-4">
      <h1 className="text-start ml-4 mb-3 text-black text-2xl font-bold py-2">
        Quick View
      </h1>
      <div className="flex flex-wrap justify-between">
        {products.map((product) => (
          <div
            onClick={() => setPostDetailsAndNavigate(product)}
            key={product.id}
            className="bg-gray-200 w-1/6 relative flex justify-center items-center flex-col mx-4 mb-5 shadow-sm rounded-md cursor-pointer"
          >
            <img className="w-[200px]" src={product.url} alt="product" />
            <p className="absolute right-3 top-3">
              <Heart className="w-[22px] cursor-pointer" />
            </p>
            <h2 className="font-bold">{product.name}</h2>
            <h2>{product.price}</h2>
            <h5>{product.category}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
