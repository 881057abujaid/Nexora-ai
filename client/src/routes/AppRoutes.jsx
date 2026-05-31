import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Bots from "../pages/Bots";
import Chat from "../pages/Chat";
import Home from "../pages/Home";
import { ImageOff } from "lucide-react";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/bots"
                    element={
                        <ProtectedRoutes>
                            <Bots />
                        </ProtectedRoutes>
                    }
                />
                <Route
                    path="/chat/:id"
                    element={
                        <ProtectedRoutes>
                            <Chat />
                        </ProtectedRoutes>
                    }
                />
            </Routes>
        </Router>
    );
};

export default AppRoutes;