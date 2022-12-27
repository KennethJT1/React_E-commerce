import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminProducts() {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [products, setProducts] = useState([]);

  useEffect(()=> {
    loadProducts();
  }, []);

  const loadProducts = async()=> {
    try {
        const { data } = await axios.get('/product');
        setProducts(data);
        // console.log(data);
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <>
      <Jumbotron
        title={` Hello  ${auth?.user?.name}`}
        subtitle="Admin Dashboard"
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Products</div>
            show list of products... {products.length}
          </div>
        </div>
      </div>
    </>
  );
}
