import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingGif from "../../images/Loading.gif";

export function Loading() {
  //state
  const [count, setCount] = useState(3);
  //hook
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    //redirect once count === 0
    count === 0 && navigate("/login");

    //cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
      <img src={LoadingGif} alt="Loading" style={{ width: "400px" }} />
    </div>
  );
}
