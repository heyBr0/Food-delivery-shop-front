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
import EditProfileUser from "./components/EditProfileUser";
import AdminPanel from "./components/AdminPanel";
import Favicon from "./styles/images/favicon.jpeg"
import Shop from "./styles/images/shop32.png"
import Delivery from "./styles/images/delivery32.png"
import SignupPic from "./styles/images/signup32.png"
import LoginPic from "./styles/images/login32.png"
import CartPic from "./styles/images/cart32.png"
import ProfilePic from "./styles/images/user32.png"
import AdminPic from "./styles/images/admin32.png"

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
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "black",
                  borderLeft: "3px solid black",
                  padding: "0.5rem",
                }}
              >
                FoodClick <img src={Favicon} alt="logo" />
              </Link>
            </aside>
            <Homepage />
          </div>
        </div>

        <div className="records panel">
          <div>
            <aside>
              <Link
                to="/records"
                style={{
                  textDecoration: "none",
                  color: "black",
              /*     borderLeft: "1px solid black",
                  borderRight: "1px solid black", */
                  padding: "0.5rem",
                }}
              >
                Shop <img src={Shop} alt="shop" />
              </Link>
            </aside>
            <Records />
          </div>
        </div>
        {user ? (
          <>
            <div className="orders panel">
              <div>
                <aside>
                  <Link
                    to="/orders"
                    style={{
                      textDecoration: "none",
                      color: "white",
                   /*    borderLeft: "1px solid black",
                      borderRight: "1px solid black", */
                      padding: "0.5rem",
                    }}
                  >
                    Orders <img src={Delivery} alt="Delivery" />
                  </Link>
                </aside>
                <Orders />
              </div>
            </div>
            <div className="profile panel">
              <div>
                <aside>
                  <Link
                    to="/profile"
                    style={{
                      textDecoration: "none",
                      color: "white",
                    /*   borderLeft: "1px solid black",
                      borderRight: "1px solid black", */
                      padding: "0.5rem",
                    }}
                  >
                    Profile  <img src={ProfilePic} alt="profilePic" />
                  </Link>
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
                  <Link
                    to="/signup"
                    style={{
                      textDecoration: "none",
                      color: "white",
                 /*      borderLeft: "1px solid black",
                      borderRight: "1px solid black", */
                      padding: "0.5rem",
                    }}
                  >
                    Signup  <img src={SignupPic} alt="signupPic" />
                  </Link>
                </aside>
                <Signup />
              </div>
            </div>
            <div className="login panel">
              <div>
                <aside>
                  <Link
                    to="/login"
                    style={{
                      textDecoration: "none",
                      color: "white",
                  /*     borderLeft: "1px solid black",
                      borderRight: "1px solid black", */
                      padding: "0.5rem",
                    }}
                  >
                    Login <img src={LoginPic} alt="loginPic" />
                  </Link>
                </aside>
                <Login />
              </div>
            </div>
          </>
        )}
        {user && user.role === "admin" ? (
          <div className="admin panel">
            <div>
              <aside>
                <Link
                  to="/admin"
                  style={{
                    textDecoration: "none",
                    color: "white",                  
                    borderRight: "1px solid black",
                    padding: "0.5rem",
                  }}
                >
                  Admin Panel  <img src={AdminPic} alt="adminPic" />
                </Link>
              </aside>

              <AdminPanel />
            </div>
          </div>
        ) : (
          <div className="cart panel">
            <div>
              <aside>
                <Link
                  to="/cart"
                  style={{
                    textDecoration: "none",
                    color: "white",                  
             
                  }}
                >
                  Cart<sup>{cart.length}</sup><br /><img src={CartPic} alt="cartPic" />
                </Link>
              </aside>

              <Cart />
            </div>
          </div>
        )}
      </div>

      <Routes>
        {/* Client side routing */}
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/records" element={<Records />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofileuser" element={<EditProfileUser />} />
      </Routes>
    </div>
  );
}

export default App;
