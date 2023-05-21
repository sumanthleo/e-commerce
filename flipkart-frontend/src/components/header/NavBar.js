import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../redux/actions/userAction";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
function NavBar() {
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [data, setData] = useState([]);

  const cartss = useSelector((state) => state.cart);
  const { cart } = cartss;

  const userSignin = useSelector((state) => state.users);
  const { users } = userSignin;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://e-commerce-u66b.onrender.com/product"
      );
      setData(response.data);
    };
    fetchData();
  }, []);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Link to={"/"}>
          <img
            src="https://media.istockphoto.com/vectors/online-shop-logo-design-template-vector-id1150644423?k=20&m=1150644423&s=612x612&w=0&h=xKnuj3AhBbMAjxnJdT6Mh7o4BDIGaEwyol33tRwG7mU="
            alt=""
            className="image-Logo"
          />
        </Link>
      </div>
      <div className="search">
        <div className="searchInputs">
          <input
            type="text"
            placeholder="Search for items"
            value={wordEntered}
            onChange={handleFilter}
          />
          <div className="searchIcon">
            {filteredData.length === 0 ? (
              <SearchIcon />
            ) : (
              <CloseIcon id="clearBtn" onClick={clearInput} />
            )}
          </div>
        </div>
        {filteredData.length !== 0 && (
          <div className="dataResult">
            {filteredData.slice(0, 15).map((value, key) => {
              return (
                <a
                  className="dataItem"
                  href={`http://localhost:3000/single/${value._id}`}
                  target="_self"
                >
                  <p>{value.title} </p>
                </a>
              );
            })}
          </div>
        )}
      </div>

      <div className="navbar-links">
        <ul className="list" style={{ display: "flex", marginRight: "30px" }}>
          <Link to={"/"} className="link">
            <li className="listitems">Home</li>
          </Link>
          <Link to={"/cart"} className="link">
            <li
              className="listitems"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Cart
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Badge badgeContent={cart && cart.length} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </span>
            </li>
          </Link>
        </ul>
        {users ? (
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {users.username}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <Link to={"/orderhistory"} className="link">
                <MenuItem onClick={handleClose}>My Orders</MenuItem>
              </Link>
              <Link to={"/"} className="link">
                <MenuItem onClick={handleClose}>
                  <button onClick={signoutHandler}>SignOut</button>
                </MenuItem>
              </Link>
            </Menu>
          </div>
        ) : (
          <Link to="/login" className="link">
            <button style={{ padding: "10px", backgroundColor: "transparent" }}>
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;
