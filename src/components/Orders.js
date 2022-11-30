import React, { useContext } from "react";
import { MyContext } from "../context/MyContext";
import DeliveryGif from "../styles/images/icons8-delivery.gif";
import "../styles/orders.css";

const Orders = () => {
  const { user } = useContext(MyContext);

  return (
    <div className="ordersContainer">
      <div id="h1Orders">
        <h1>Your Orders ({user && user.orders.length})</h1>
      </div>
      <img src={DeliveryGif} alt="delivery" width="64px" />

      <ul id="allOrders">
        {user &&
          user.orders.map((order) => {
            return (
              <ul id="ordersArticle" key={order._id} /* style={{ outline: "1px solid black" }} */>
                <h3>Invoice Nr.:{order._id}</h3>
                <h4>Total price: {order.totalPrice} €</h4>
                <div id="ordersItems">
                  {order.records.map((item) => {
                    return (
                      <div key={item._id} id="orderImages2">
                        <h3>{item.title}</h3>
                        <img src={item.img} alt="itemImage" width="150"></img>
                      </div>
                    );
                  })}{" "}
                </div>
                <br />
                <br />
              </ul>
            );
          })}
      </ul>
    </div>
  );
};

export default Orders;
