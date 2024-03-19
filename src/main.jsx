import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import Context from "./store/FirebaseContext";

// Import the Firebase app instance directly
import { firebaseContext } from "./store/FirebaseContext";
import { app } from "./firebase/config";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <firebaseContext.Provider value={{ app }}>
      <Context>
        <App />
      </Context>
    </firebaseContext.Provider>
  </React.StrictMode>
);
