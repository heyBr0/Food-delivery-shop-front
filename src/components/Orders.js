import React, { useContext } from "react";
import { MyContext } from "../context/MyContext";

 import "../styles/orders.css" 

const Orders = () => {
  const { user } = useContext(MyContext);

  return (
    <div className="ordersContainer">
      <div id="h1Orders">

      <h1 >Your Orders ({user && user.orders.length})</h1>
      </div>

      <ul>
        {user && user.orders.map((order) => {
          return (
            <ul key={order._id} style={{border:"1px solid black"}}>
              <h3>Invoice Nr.:{order._id}</h3>
              <h4>Total price: {order.totalPrice} €</h4>
              <div id="ordersItems" >
                Items:{" "}
                {order.records.map((item) => {
                  return (
                    <div key={item._id} >
                      <h3>{item.title}</h3>
                      <img src={item.img} alt="itemImage" width="100"></img>                    
                    </div>
                    
                  );
                })}{" "}
              </div>
              <br/><br/>
            </ul>
          );
        })}
      </ul>
    </div>
  );
};

export default Orders;
