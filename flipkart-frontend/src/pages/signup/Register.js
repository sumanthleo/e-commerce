import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/userAction";
import "./register.css";
function Register(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userss = useSelector((state) => state.users);
  const { users, loading, error } = userss;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(username, email, password));
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (users) {
      navigate("/");
    }
  }, [navigate, users]);
  return (
    <div style={{ marginTop: "5%" }}>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Signup / Register</h1>
        </div>
        {loading && (
          <h1
            style={{
              color: "red",
              backgroundColor: "black",
              textAlign: "center",
            }}
          >
            {loading}
          </h1>
        )}
        {error && (
          <h4
            style={{
              color: "red",
              backgroundColor: "black",
              textAlign: "center",
            }}
          >
            {error}
          </h4>
        )}
        <div>
          <label htmlFor="email">UserName</label>
          <input
            type="username"
            id="username"
            placeholder="Enter username"
            required
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button
            className="primary"
            type="submit"
            style={{ backgroundColor: "rgb(170, 252, 145)" }}
          >
            Sign Up
          </button>
          <div>
            Already have an account? <Link to={`/login`}>Sign-In</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
