import { useContext } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Orders from "./components/Orders";
import Records from "./components/Records";
import { MyContext } from "./context/MyContext";


function App() {
  const{cart} = useContext(MyContext)
  return (
    <BrowserRouter>
      <div className="App">
        <ul>
          <li>
            <Link to="/">Home</Link>{" "}
          </li>
          <li>
            {" "}
            <Link to="/records">Records</Link>{" "}
          </li>
          <li>
            {" "}
            <Link to="/orders">Orders</Link>{" "}
          </li>
          <li>
            {" "}
            <Link to="/login">Login</Link>{" "}
          </li>
          <li>
            {" "}
            <Link to="/cart">Cart<sup>{cart.length}</sup></Link>{" "}
          </li>
        </ul>
      </div>

      <Routes>
     {   /* Client side routing */}
        <Route path="/" element={<HomePage />} />
        <Route path="/records" element={<Records />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
