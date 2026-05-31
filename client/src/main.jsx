import React from "react";
import Toast from "./components/Toaster";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Toast />
        <App />
    </React.StrictMode>
);