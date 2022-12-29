import Jumbotron from "../components/cards/Jumbotron";
import axios from "axios";
import { useState, useEffect } from "react";
import ProductCard from "../components/cards/ProductCard";

export default function Home() {
  //state
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      // I'm using data.products here becos I'm sending two things from backend which is cound and product
      setProducts(data.products);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const arr = [...products];
  const sortedBySold = arr.sort((a, b) => (a.sold < b.sold ? 1 : -1));

  return (
    <div>
      <Jumbotron title="Hello world" />

      <div className="row">
        <div className="col-md-6">
          <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">New Arrivals</h2>
          <div className="row">
          {products?.map((p) => (
          <div className="col-md-6" key={p._id}>
            <ProductCard p={p} />
          </div>
          ))}
          </div>
        </div>
        <div className="col-md-6">
        <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">Best Sellers</h2>
        <div className="row">
          {sortedBySold?.map((p) => (
          <div className="col-md-6" key={p._id}>
            <ProductCard p={p} />
          </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
