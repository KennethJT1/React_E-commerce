import { useState, useEffect } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import axios from "axios";
import ProductCard from "../components/cards/ProductCard";
import { Checkbox, Radio } from "antd";
import { prices } from "../Price";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]); //category
  const [radio, setRadio] = useState([]); // Radio

  useEffect(() => {
    if (!checked.length || !radio.length) loadProducts();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) loadFilteredProducts();
  }, [checked, radio]);


  const loadFilteredProducts = async () => {
    try {
      const { data } = await axios.post("/filtered-products", {
        checked,
        radio,
      });

      console.log("Filtered products=> ", data);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data.products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheck = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }

    setChecked(all);
  };

  return (
    <>
      <Jumbotron title="Hello World" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
              Filter by categories
            </h2>
            <div className="row p-5">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleCheck(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>

            <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
              Filter by Price
            </h2>
            <div className="row p-5">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {prices.map((p) => (
                  <div key={p._id} style={{ marginLeft: "8px" }}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>

            <div className="p-5 pt-0">
              <button className="btn btn-outline-secondary col-12" onClick={()=> window.location.reload()}>Reset</button>
            </div>
          </div>

          <div className="col-md-9">
            <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
              {products?.length} products
            </h2>
            <div className="row" style={{ height: "100vh", overflow: "scroll"}}>
              {products?.map((p) => (
                <div className="col-md-4" key={p?._id}>
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
