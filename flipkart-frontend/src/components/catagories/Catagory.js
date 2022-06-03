import React from "react";
import { Link } from "react-router-dom";
import "./cata.css";

function Category() {
  return (
    <div className="category-container">
      <span className="heading">CATEGORIES:</span>
      <div className="category">
        <div className="category-lists">
          <Link to={"/filter/women"} className="link">
            <img
              src="https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/13997534/2021/4/14/7de4e650-41bd-44c5-903d-491ae5f084951618377595406-plusS-Women-Green-Regular-Fit-Ruffled-Satin-Finish-Partywear-1.jpg"
              alt=""
              className="category-image"
            />
            <span className="categoryText">WOMEN</span>
          </Link>
        </div>

        <div className="category-lists">
          <Link to={"/filter/kids"} className="link">
            <img
              src="https://n3.sdlcdn.com/imgs/a/n/1/Best-Clothing-Cream-Party-Wear-SDL875483617-1-d63a4.jpg"
              alt=""
              className="category-image"
            />
            <span className="categoryText">KIDS</span>
          </Link>
        </div>
        <div className="category-lists">
          <Link to={"/filter/mens"} className="link">
            <img
              src="https://images.bestsellerclothing.in/data/selected/60-sku-23-july/207462602_g1.jpg?width=415&height=550&mode=fill&fill=blur&format=auto"
              alt=""
              className="category-image"
            />
            <span className="categoryText">MEN</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Category;
