import { useEffect, useState } from "react";
import Table from "./components/Table";
import Login from "./AuthPages/Login";
import Register from "./AuthPages/Register";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DetailsPage from "./ViewPages/DetailsPage";
import "react-toastify/dist/ReactToastify.css";
import EditDetails from "./ViewPages/EditDetails";
import NotFound from "./ViewPages/NotFound";
import axios from "axios";
import AddNew from "./ViewPages/AddNew";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users"));
    if (!users) {
      localStorage.setItem("users", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await axios.get("/mockData.json");
        const fetched = response.data;
        setFetchedData(fetched);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTableData();
  }, []);

  useEffect(() => {
    if (fetchedData.length > 0) {
      localStorage.setItem("fetchedData", JSON.stringify(fetchedData));
    }
  }, [fetchedData]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />

          <Route path="/details/:id" element={<DetailsPage />} />

          <Route
            path="/add"
            element={
              <AddNew
                fetchedData={fetchedData}
                setFetchedData={setFetchedData}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />

          <Route
            path="/edit/:id"
            element={
              <EditDetails
                setIsAuthenticated={setIsAuthenticated}
                fetchedData={fetchedData}
                setFetchedData={setFetchedData}
              />
            }
          />

          <Route
            path="/register"
            element={<Register setIsAuthenticated={setIsAuthenticated} />}
          />

          <Route
            path="/home"
            element={
              isAuthenticated ? (
                <Table
                  fetchedData={fetchedData}
                  setFetchedData={setFetchedData}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
