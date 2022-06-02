import React, { useEffect, useState } from "react";
import axios from "axios";
import "./singlePost.css";
import { addToCart } from "../../../redux/actions/cartAction";

import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
function SinglePost() {
  const location = useLocation().pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get(
        "https://swiggy-clone-app.herokuapp.com/product/" + location
      );

      setProduct(response.data);
    };
    getProducts();
  }, [location]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  return (
    <div className="containerPost">
      <span className="title">{product.category}</span>
      <Link to={"/cart"}>
        <button className="GOTOCART" style={{ marginTop: "10px" }}>
          CHECK OUT CART
        </button>
      </Link>
      <div className="post-container">
        <div className="post-img">
          <img src={product.image} alt="" className="postImgBox" />
        </div>
        <div className="post-desc">
          <div className="titleheading">
            <div className="title">{product.title}</div>
          </div>
          <div className="desc">
            <p>{product.description}</p>
          </div>
          <div className="price">
            <span className="price-tag">₹</span>
            <span className="price-tag">{product.price}</span>
          </div>
          <div className="filters">
            <span className="filtertext">filters:</span>
            <span className="filterselect">
              <select
                name=""
                id="colorSelect"
                onChange={(e) => setColor(e.target.value)}
              >
                {product.color?.map((c) => (
                  <option value={c} key={c}>
                    {c}
                  </option>
                ))}
              </select>
            </span>
            <span className="filterSize">
              <select name="" id="sizeSelect">
                {product.size?.map((s) => (
                  <option
                    key={s}
                    value={s}
                    // name={s}
                    // onClick={() => setSize(s)}
                  >
                    {s}
                  </option>
                ))}
              </select>
            </span>
          </div>
          <div className="addtocart">
            <button className="addtocartbtn" onClick={handleClick}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
