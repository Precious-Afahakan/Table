import { useState, useEffect } from "react";
import "./Table.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const Table = ({ fetchedData, setFetchedData }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const itemsPerPage = 5;
  const navigate = useNavigate();
  useEffect(() => {
    if (fetchedData) {
      setFilteredData(fetchedData);
      setLoading(false);
    } else {
      setError("Failed to fetch data");
    }
  }, []);

  const filterData = () => {
    let result = [...fetchedData];

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

  useEffect(filterData, [searchValue, fromDate, toDate, fetchedData]);

  const handleRowClick = (row) => {
    navigate(`/details/${row.id}`, { state: row });
  };
  const handleAddNew = () => {
    navigate("/add");
  };
  const handleEdit = (row) => {
    navigate(`/edit/${row.id}`);
  };

  const handleDelete = (id) => {
    const updatedList = fetchedData.filter((item) => item.id !== id);
    setFetchedData(updatedList);
    setFilteredData(updatedList);
  };

  const lastListIndex = currentPage * itemsPerPage;
  const firstListIndex = lastListIndex - itemsPerPage;
  const currentListItems = filteredData.slice(firstListIndex, lastListIndex);

  const pages = Math.ceil(filteredData.length / itemsPerPage);

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
            onChange={(date) => setToDate(date)}
            isClearable
            placeholderText="Select end date"
            disabled={!fromDate}
            minDate={fromDate}
          />
        </label>

        <button onClick={() => handleAddNew()}>Add new table data</button>
      </div>

      <table>
        <thead>
          <tr className="headers">
            <th>Id</th>
            <th>Profile Picture</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentListItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <img
                  src={item.profile_picture}
                  alt="profile"
                  className="image"
                />
              </td>
              <td
                onClick={() => handleRowClick(item)}
              >{`${item.first_name} ${item.last_name}`}</td>
              <td onClick={() => handleRowClick(item)}>{item.email}</td>
              <td onClick={() => handleRowClick(item)}>{item.created_at}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
