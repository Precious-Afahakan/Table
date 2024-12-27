import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>404</h1>
      <p>
        <strong>Page not found</strong>
      </p>
      <p>
        <Link to={"/home"}>Go back</Link>
      </p>
    </div>
  );
};

export default NotFound;
