import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./signin.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signin } from "../../redux/actions/userAction";
import CheckoutSteps from "../checkoutsteps/CheckoutSteps";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userss = useSelector((state) => state.users);
  const { users, loading, error } = userss;

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (users) {
      navigate(redirect);
    }
  }, [navigate, users, redirect]);

  return (
    <div style={{ marginTop: "2%" }}>
      <CheckoutSteps step1></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
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
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer? <Link to={`/signup`}>Create your account</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
