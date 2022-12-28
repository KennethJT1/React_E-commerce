import Jumbotron from "../components/cards/Jumbotron";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";

export default  function Home() {
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
  const sortedBySold = arr.sort((a,b) => (a.sold < b.sold ? 1 : -1));

    return (
      <div>
      <Jumbotron title="Hello world" />
      <h2>New Arrivals</h2>
      {products?.map(p=> (
        <div key={p._id}>
          <p>{p.name}</p>
          <p>{moment(p.createdAt).fromNow()}</p>
          <p>{p.sold} sold</p>
        </div>
      ))}

<h2>Best Sellers</h2>
      {sortedBySold?.map(p=> (
        <div key={p._id}>
          <p>{p.name}</p>
          <p>{moment(p.createdAt).fromNow()}</p>
          <p>{p.sold} sold</p>
        </div>
      ))}
      </div>
    );
  }
  