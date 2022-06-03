import React from "react";
import Silder from "../../components/silder/Silder";
import Products from "../../components/productsItems/Products";
import Catagory from "../../components/catagories/Catagory";
function Home() {
  return (
    <div>
      <Silder />
      <Catagory />
      <Products />
    </div>
  );
}

export default Home;
