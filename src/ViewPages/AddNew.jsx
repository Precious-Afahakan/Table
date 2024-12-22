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
    profile_picture: null,
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

      const updatedData = [...fetchedData, newData];
      setFetchedData(updatedData);
      //localStorage.setItem("fetchedData", JSON.stringify(updatedData));
      toast("Data added successfully");
      setIsAuthenticated(true);
      navigate("/home");
    } else {
      toast("Please fill in all fields!");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInputValue({ ...inputValue, profile_picture: reader.result });
      };
      reader.readAsDataURL(file);
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
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {inputValue.profile_picture && (
          <img
            src={inputValue.profile_picture}
            alt="Profile Preview"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        )}
        <button>Add new</button>
      </form>
    </div>
  );
};

export default AddNew;
