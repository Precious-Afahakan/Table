import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./login.css";

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users"));
    setUserData(users);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  const goTo = useNavigate();

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
      const storedUser = userData.find((user) => user.email === userInfo.email);

      if (storedUser) {
        toast("User already exist, log in instead");
        goTo("/login");
        return;
      }

      if (!storedUser) {
        const newUsers = [...userData, userInfo];
        localStorage.setItem("users", JSON.stringify(newUsers));
      }

      toast("Registration successful, now you can log in!!");
      goTo("/login");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="form_style">
        <h1>Register!!!</h1>
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
          type="password"
          placeholder="Input your password..."
          onChange={(e) => handleChange(e)}
          name="password"
          value={userInfo.password}
        />
        {errors.password && (
          <span style={{ color: "red" }}>{errors.password}</span>
        )}
        <button className="button_style">Register</button>
        <span>
          Already registered? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
