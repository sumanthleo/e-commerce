import React, { useState } from "react";
import "./filterPage.css";
import Products from "../../components/productsItems/Products";
import { useLocation } from "react-router-dom";
function FilterPage() {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({});

  const handlefilter = (e) => {
    const { value } = e.target;
    setFilters({ ...filters, [e.target.name]: value });
  };
  return (
    <div className="filter-container">
      <div className="filterHeaders">
        <div className="left-filters">
          Choose your Color:
          <select name="color" id="colorandSize" onChange={handlefilter}>
            <option disabled>Color:</option>
            <option>white</option>
            <option>black</option>
            <option>red</option>
            <option>blue</option>
            <option>yellow</option>
            <option>green</option>
          </select>
          <select name="size" id="colorandSize" onChange={handlefilter}>
            <option disabled>Size:</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
            <option>XXL</option>
          </select>
        </div>
        <div className="right-filters">
          Choose your price:
          <select
            name="sort"
            id="colorandSize"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="" disabled>
              Sort:
            </option>
            <option>Low to High</option>
            <option>High to Low</option>
          </select>
        </div>
      </div>
      <Products cat={cat} filters={filters} sort={sort} />
    </div>
  );
}

export default FilterPage;
