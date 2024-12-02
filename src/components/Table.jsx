import { useState, useEffect } from "react";
import axios from "axios";
import "./Table.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Table = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedRow, setClickedRow] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/mockData.json");
        const fetchedData = response.data;
        setData(fetchedData);
        setFilteredData(fetchedData);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filterData = () => {
    let result = [...data];

    if (searchValue) {
      result = result.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }

    if (fromDate || toDate) {
      result = result.filter((item) => {
        const itemDate = new Date(item.created_at);
        return (
          (!fromDate || itemDate >= fromDate) && (!toDate || itemDate <= toDate)
        );
      });
    }

    setFilteredData(result);
    setCurrentPage(1);
  };

  useEffect(filterData, [searchValue, fromDate, toDate, data]);

  const handleRowClick = (row) => {
    setClickedRow(row);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setClickedRow(null);
  };

  const lastListIndex = currentPage * itemsPerPage;
  const firstListIndex = lastListIndex - itemsPerPage;
  const currentListItems = filteredData.slice(firstListIndex, lastListIndex);

  const pages = Math.ceil(filteredData.length / itemsPerPage);

  const handleToDateChange = (newToDate) => {
    if (fromDate && newToDate < fromDate) {
      alert("The 'To' date cannot be earlier than the 'From' date.");
      return;
    }
    setToDate(date);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        className="inputy"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <div className="date-picker-container">
        <label>
          From:
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            isClearable
            placeholderText="Select start date"
          />
        </label>
        <label>
          To:
          <DatePicker
            selected={toDate}
            onChange={handleToDateChange}
            isClearable
            placeholderText="Select end date"
          />
        </label>
      </div>

      <table>
        <thead>
          <tr className="headers">
            <th>Id</th>
            <th>Profile Picture</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {currentListItems.map((item) => (
            <tr key={item.id} onClick={() => handleRowClick(item)}>
              <td>{item.id}</td>
              <td>
                <img src={item.profile_picture} alt="" />
              </td>
              <td>{`${item.first_name} ${item.last_name}`}</td>
              <td>{item.email}</td>
              <td>{item.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              X
            </button>
            <h2>User Details</h2>
            <p>
              <strong>ID:</strong> {clickedRow.id}
            </p>
            <p>
              <strong>Name:</strong> {clickedRow.first_name}{" "}
              {clickedRow.last_name}
            </p>
            <p>
              <strong>Email:</strong> {clickedRow.email}
            </p>
            <p>
              <strong>Created At:</strong> {clickedRow.created_at}
            </p>
          </div>
        </div>
      )}

      <nav className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${pages}`}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === pages}
        >
          Next
        </button>
      </nav>
    </>
  );
};

export default Table;
