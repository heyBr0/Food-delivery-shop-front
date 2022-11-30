import React, { useContext } from "react";
import { MyContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
 import "../styles/cart.css"; 

const Cart = () => {
  const navigate = useNavigate();
  const { cart, setCart, user, setUser } = useContext(MyContext);
  const totalPrice = cart.reduce(
    (acc, item) => (acc += item.price * item.quantity),
    0
  );

  const decrementQuantity = (id) => {
    const foundItem = cart.find((item) => item._id === id);
    if (foundItem.quantity === 1) {
      setCart(cart.filter((item) => item._id !== id));
    } else {
      foundItem.quantity--;
      setCart([...cart]);
    }
  };

  const incrementQuantity = (id) => {
    const foundItem = cart.find((item) => item._id === id);
    if (foundItem) {
      foundItem.quantity++;
      setCart([...cart]);
    }
  };
  // order => {records: [cart], totalPrice: number}
  const placeOrder = () => {
    if (!user) {
      navigate("/login");
    } else if (cart.length > 0) {
      fetch("/orders", {
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: cart.map((record) => record._id),
          totalPrice: totalPrice,
          userId: user._id,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            console.log(result.data);
            setUser(result.data);
            toast.success("Order placed successfully");
            setCart([]);
            setTimeout(() => {
              navigate("/orders");
            }, 2000);
          } else {
            toast.error("Something went wrong");
          }
        });
    }
  };

  return (
    <>
      <div className="cartContainer">
        <div id="h1Cart">
        <h1>My Cart</h1>

        </div>
        <h2>
          Total:
          {totalPrice} €
        </h2>
        <button onClick={placeOrder} className="placeOrder">
          Place Order
        </button>
        <div id="cartGrid">
          {cart.map((record) => {
            return (
              <div key={record._id} className="cardFinal">
                <img src={record.img} alt="" width="300" />
                <div className="container">
                  <h2>{record.title}</h2>
                  <h3>{record.price} €</h3>
                </div>

                <div className="inline">
                  <button onClick={() => decrementQuantity(record._id)}>
                    -
                  </button>
                  {record.quantity}
                  <button onClick={() => incrementQuantity(record._id)}>
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <Toaster position="bottom-center" />
      </div>
    </>
  );
};

export default Cart;
