import { useEffect, useState } from "react";
import Table from "./components/Table";
import Login from "./AuthPages/Login";
import Register from "./AuthPages/Register";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users"));
    if (!users) {
      localStorage.setItem("users", JSON.stringify([]));
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={isAuthenticated ? <Table /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
