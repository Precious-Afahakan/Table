import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./login.css";

const Login = ({ setIsAuthenticated }) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState(null);
  const [isPasswordHidden, setIsPassword] = useState(true);

  const toggleVisibility = () => {
    setIsPassword(!isPasswordHidden);
  };

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users"));
    setUserData(users);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const moveTo = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const inputChecker = {};

    if (!userInfo.email.trim()) {
      inputChecker.email = "Email is required";
    } else if (!emailRegex.test(userInfo.email)) {
      inputChecker.email = "Email format is not valid";
    }

    if (!userInfo.password.trim()) {
      inputChecker.password = "Password is required";
    } else if (userInfo.password.length < 6) {
      inputChecker.password = "Password must be at least 6 chracters long";
    }

    setErrors(inputChecker);

    if (Object.keys(inputChecker).length === 0) {
      const foundUser = userData.find(
        (user) =>
          user.email === userInfo.email && user.password === userInfo.password
      );

      if (!foundUser) {
        toast("Invalid credentials, register or check credentials,");
        return;
      }
      if (foundUser) {
        toast("Welcome home!!");
        setIsAuthenticated(true);
        moveTo("/home");
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="form_style">
        <h1>Login</h1>
        <div className="input-container">
          <input
            className="input_style"
            type="email"
            placeholder="Input your email..."
            onChange={(e) => handleChange(e)}
            name="email"
            value={userInfo.email}
          />
          {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}

          <input
            className="input_style"
            type={isPasswordHidden ? "password" : "text"}
            placeholder="Input your password..."
            onChange={(e) => handleChange(e)}
            name="password"
            value={userInfo.password}
          />
          <span onClick={() => toggleVisibility()} className="toggle">
            {isPasswordHidden ? "Show" : "Hide"}
          </span>
          {errors.password && (
            <span style={{ color: "red" }}>{errors.password}</span>
          )}
          <button className="button_style">Login</button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
