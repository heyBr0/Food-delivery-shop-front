import { useEffect, useState } from "react";
import { MyContext } from "./MyContext";
import { useNavigate } from "react-router-dom";

const Container = (props) => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
console.log(records);
  useEffect(() => {
    //onload effect
    fetch("http://localhost:4000/records?page=1&start=0&end=5")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setRecords(result);
      });

    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:4000/users/checkusertoken", {
        method: "GET",
        headers: { token: token },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            console.log(result);
            setUser(result.data);
          } else {
            navigate("/login");
          }
        });
    }
  }, []);
  return (
    <MyContext.Provider
      value={{ records, setRecords, cart, setCart, user, setUser }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default Container;
