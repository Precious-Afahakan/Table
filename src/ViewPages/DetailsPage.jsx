import { useLocation } from "react-router-dom";

const DetailsPage = () => {
  const { state: user } = useLocation();
  return (
    <div>
      <h1>{user.first_name}'s details</h1>
      <p>
        <img
          src={user.profile_picture}
          alt=""
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
      </p>
      <p>
        <strong>ID:</strong>
        {user.id}
      </p>

      <p>
        <strong>First name:</strong>
        {user.first_name}
      </p>
      <p>
        <strong>Last name:</strong>
        {user.last_name}
      </p>
      <p>
        <strong>Created at:</strong>
        {user.created_at}
      </p>
    </div>
  );
};

export default DetailsPage;
