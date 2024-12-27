import { useEffect, useState } from "react";
import Table from "./components/Table";
import Login from "./AuthPages/Login";
import Register from "./AuthPages/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DetailsPage from "./ViewPages/DetailsPage";
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
  const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/login" /> },
    {
      path: "/login",
      element: <Login setIsAuthenticated={setIsAuthenticated} />,
    },
    { path: "/details/:id", element: <DetailsPage /> },
    {
      path: "/add",
      element: (
        <AddNew
          fetchedData={fetchedData}
          setFetchedData={setFetchedData}
          setIsAuthenticated={setIsAuthenticated}
        />
      ),
    },
    {
      path: "/edit/:id",
      element: (
        <EditDetails
          setIsAuthenticated={setIsAuthenticated}
          fetchedData={fetchedData}
          setFetchedData={setFetchedData}
        />
      ),
    },
    {
      path: "/register",
      element: <Register setIsAuthenticated={setIsAuthenticated} />,
    },
    {
      path: "/home",
      element: isAuthenticated ? (
        <Table fetchedData={fetchedData} setFetchedData={setFetchedData} />
      ) : (
        <Navigate to="/login" />
      ),
    },
    { path: "*", element: <NotFound /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
