import { useState } from "react";

import Jumbotron from "../components/cards/Jumbotron";
import axios from "axios";
import toast from "react-hot-toast";

export default function Register() {
  //state
  const [name, setName] = useState("Kenneth");
  const [email, setEmail] = useState("Kenneth@gmail.com");
  const [password, setPassword] = useState("qqqqq");
        
  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      const res = await axios.post(`${process.env.REACT_APP_API}/register`, {
        name,
        email,
        password,
      });
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Jumbotron title="Register" />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <input
              type="text"
              className="form-control mb-4 p-2"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control mb-4 p-2"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                className="form-control mb-4 p-2"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className='btn btn-primary type="submit" '>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
