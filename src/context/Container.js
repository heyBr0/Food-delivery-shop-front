import { useEffect, useState } from "react";
import { MyContext } from "./MyContext";
import { useNavigate } from "react-router-dom";

const Container = (props) => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(0)
console.log(page);

useEffect(()=>{
  fetch(`/records?page=${page}`)
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
    setRecords([...records, ...result.data]);
  });
}, [page])

  useEffect(() => {
    //onload effect
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/users/checkusertoken", {
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
  }, [navigate]);
  return (
    <MyContext.Provider
      value={{ records, setRecords, cart, setCart, user, setUser, page, setPage }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default Container;
