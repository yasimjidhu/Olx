import React, { useState, useContext, } from "react";
import { firebaseContext, AuthContext } from "../store/FirebaseContext";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Sell = () => {
  const { firebase } = useContext(firebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);
  const date = new Date();

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!image) {
        setError("No image selected");
        return;
      }

      setUploading(true);

      const storage = getStorage();
      const storageRef = ref(storage, `/images/${image?.name}`);

      // Upload image
      await uploadBytes(storageRef, image);

      // Get download URL for the uploaded image
      const url = await getDownloadURL(storageRef);

      // save the product data to the firestore
      const productData = {
        name,
        category,
        price,
        url,
        userId: user.uid,
        createdAt: date.toDateString(),
      };

      const productsCollectionRef = collection(db, "products");
      await addDoc(productsCollectionRef, productData);
      setDownloadURL(url);

      setName("");
      setCategory("");
      setPrice("");
      setImage(null);
      setDownloadURL("");
      setError("");

      navigate('/')
    } catch (error) {
      setError(error.message);
      Swal.fire({
        title: "Error occurred",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "red",
      });
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="rounded-lg p-6 border-2 border-black">
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              type="text"
              placeholder="BMW"
              className="block w-full border rounded-sm border-black py-1 px-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block font-bold">
              Category
            </label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id="category"
              type="text"
              placeholder="Cars"
              className="block w-full border rounded-sm border-black py-1 px-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block font-bold">
              Price
            </label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              id="price"
              type="number"
              placeholder="100000"
              className="block w-full border rounded-sm border-black py-1  px-2"
            />
          </div>
          <div>
            {image ? (
              <img
                src={image ? URL.createObjectURL(image) : ""}
                width="250px"
                height="200px"
                alt="Posts"
              />
            ) : (
              ""
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="posts" className="block font-bold">
              Posts
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              id="posts"
              type="file"
              className="block w-full "
            />
          </div>
          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="bg-green-950 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-md mx-auto"
            >
              Upload and Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sell;
