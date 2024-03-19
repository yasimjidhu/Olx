import React, { useEffect, useContext } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { AuthContext, firebaseContext } from "./store/FirebaseContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Sell from "./pages/SellPage";
import ViewPostPage from "./pages/ViewPostPage";
import Post from "./store/ViewContext";

function App() {
  const { user, setUser } = useContext(AuthContext);
  const { firebase } = useContext(firebaseContext);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  });
  return (
    <Post>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create" element={<Sell />} />
          <Route path="/view" element={<ViewPostPage />} />
        </Routes>
      </Router>
    </Post>
  );
}

export default App;
