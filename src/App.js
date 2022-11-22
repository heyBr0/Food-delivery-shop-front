import { useContext } from "react";
import { Link, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import Orders from "./components/Orders";
import Profile from "./components/Profile";
import Records from "./components/Records";
import Signup from "./components/Signup";
import { MyContext } from "./context/MyContext";
import "./styles/app.css";
import $ from "jquery";

function App() {
  const { cart, user } = useContext(MyContext);

  $(".panel").click(function () {
    $(".panel").removeClass("active");
    $(this).toggleClass("active");
  });

  $(".panel.active").click(function () {
    $(this).removeClass("active");
  });

  $(document).ready(function ($) {
    $(".home").first().addClass("active");
  });

  return (
    <div className="App">
      <div className="outer">
        <div className="home panel">
          <div>
            <aside>
              <Link to="/">Home</Link>
            </aside>
            <Homepage />
          </div>
        </div>

        <div className="records panel">
          <div>
            <aside>
              <Link to="/records">Shop</Link>
            </aside>
            <Records />
          </div>
        </div>
        {user ? (
          <>
            <div className="orders panel">
              <div>
                <aside>
                  <Link to="/orders">Orders</Link>
                </aside>
                <Orders />
              </div>
            </div>
            <div className="profile panel">
              <div>
                <aside>
                  <Link to="/profile">Profile</Link>
                </aside>
                <Profile />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="signup panel">
              <div>
                <aside>
                  <Link to="/signup">Signup</Link>
                </aside>
                <Signup />
              </div>
            </div>
            <div className="login panel">
              <div>
                <aside>
                  <Link to="/login">Login</Link>
                </aside>
                <Login />
              </div>
            </div>
          </>
        )}
        <div className="cart panel">
          <div>
            <aside>
              <Link to="/cart">
                Cart<sup>{cart.length}</sup>
              </Link>
            </aside>

            <Cart />
          </div>
        </div>
      </div>

      <Routes>
        {/* Client side routing */}
        <Route path="/" element={<Homepage />} />
        <Route path="/records" element={<Records />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
