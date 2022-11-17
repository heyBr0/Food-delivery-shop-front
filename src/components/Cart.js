import React, { useContext } from "react";
import { MyContext } from "../context/MyContext";

const Cart = () => {
  const { cart } = useContext(MyContext);
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
              <p> Quantity: {record.quantity}</p>
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
