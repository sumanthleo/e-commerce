import React, { useEffect, useState } from "react";
import "./products.css";
import axios from "axios";
import Product from "./Product";

function Products({ cat, filters, sort }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get(
        cat
          ? `https://swiggy-clone-app.herokuapp.com/product?category=${cat}`
          : "https://swiggy-clone-app.herokuapp.com/product"
      );
      setProducts(response.data);
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
    return () => {};
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "Low to High") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <div className="productconatiner">
      <span className="headingText">TRENDING PRODUCTS FOR : {cat}</span>
      <div className="product-itemssss">
        {cat
          ? filteredProducts.map((item) => (
              <Product key={item._id} item={item} />
            ))
          : products
              .slice(2, 8)
              .map((item) => <Product key={item._id} item={item} />)}
      </div>
    </div>
  );
}

export default Products;
