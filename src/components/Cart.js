import React, { useContext } from "react";
import { MyContext } from "../context/MyContext";

const Cart = () => {
  const { cart, setCart } = useContext(MyContext);

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

  return (
    <>
      <h1>My Cart</h1>
      <div>
        {cart.map((record) => {
          return (
            <div key={record._id}>
              <h2>{record.title}</h2>
              <img src={record.img} alt="" width="100" />
              <p>{record.price} €</p>
              <p>
                {" "}
                Quantity:
                <button onClick={() => decrementQuantity(record._id)}>
                  {" "}
                  -{" "}
                </button>
                {record.quantity}
                <button onClick={() => incrementQuantity(record._id)}>
                  {" "}
                  +{" "}
                </button>
              </p>
            </div>
          );
        })}
      </div>
      <h1>
        Total:{" "}
        {cart.reduce((acc, item) => (acc += item.price * item.quantity), 0)} €
      </h1>
    </>
  );
};

export default Cart;
