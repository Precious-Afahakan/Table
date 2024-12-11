import { useState } from "react";
import "./style.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddNew = ({ fetchedData, setFetchedData, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    created_at: new Date(),
  });

  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleAddNew = (e) => {
    e.preventDefault();
    if (
      inputValue.first_name.trim() &&
      inputValue.last_name.trim() &&
      inputValue.email.trim()
    ) {
      const newData = {
        ...inputValue,
        id: fetchedData.length + 1,
        created_at: formatDate(new Date()),
      };

      const update = [...fetchedData, newData];

      setFetchedData(update);
      toast("Data added successfully");
      setIsAuthenticated(true);
      navigate("/home");
    } else {
      toast("Please fill in all fields!");
    }
  };

  return (
    <div>
      <form className="add_new" onSubmit={handleAddNew}>
        <input
          type="text"
          placeholder="Input first name"
          value={inputValue.first_name}
          onChange={(e) =>
            setInputValue({ ...inputValue, first_name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Input last name"
          value={inputValue.last_name}
          onChange={(e) =>
            setInputValue({ ...inputValue, last_name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Input email"
          value={inputValue.email}
          onChange={(e) =>
            setInputValue({ ...inputValue, email: e.target.value })
          }
        />
        <button>Add new</button>
      </form>
    </div>
  );
};

export default AddNew;
