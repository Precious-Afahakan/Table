import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditDetails = ({ fetchedData, setFetchedData, setIsAuthenticated }) => {
  const { id } = useParams();
  const [inputVal, setInputVal] = useState({
    id: id,
    first_name: "",
    last_name: "",
    email: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const user = fetchedData.find((item) => item.id === Number(id));
    if (user) {
      setInputVal({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });
    } else {
      console.error("User not found");
    }
  }, [id, fetchedData]);

  const handleEdit = (e) => {
    e.preventDefault();
    const updatedData = fetchedData.map((item) =>
      item.id === Number(id) ? { ...item, ...inputVal } : item
    );
    setFetchedData(updatedData);
    setIsAuthenticated(true);
    navigate("/home");
  };
  return (
    <div>
      <h1>Update/edit user data</h1>
      <form onSubmit={handleEdit}>
        <input
          type="text"
          value={inputVal.first_name}
          onChange={(e) =>
            setInputVal({ ...inputVal, first_name: e.target.value })
          }
        />
        <input
          type="text"
          value={inputVal.last_name}
          onChange={(e) =>
            setInputVal({ ...inputVal, last_name: e.target.value })
          }
        />
        <input
          type="text"
          value={inputVal.email}
          onChange={(e) => setInputVal({ ...inputVal, email: e.target.value })}
        />
        <button>Edit</button>
      </form>
    </div>
  );
};

export default EditDetails;
