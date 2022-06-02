import React from "react";
import "./products.css";
import { Link } from "react-router-dom";

function Product({ item }) {
  return (
    <div className="product-items">
      <Link to={`/single/${item._id}`} className="link">
        <div className="imageProduct">
          <img src={item.image} alt="" className="product-image" />
        </div>
        <div className="product-details">
          <div className="titileName">{item.title}</div>
          <div className="productdesc">{item.description}</div>
          <div className="productPrice">${item.price}</div>
        </div>
      </Link>
    </div>
  );
}

export default Product;
