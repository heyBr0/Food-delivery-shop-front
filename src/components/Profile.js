import React, { useContext } from "react";
import { MyContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
 import "../styles/profile.css"; 

export default function Profile() {
  const { user, setUser } = useContext(MyContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const editProfile = () => {
    navigate("/editprofileuser");
  };

  const deleteOrder = (id)=>{
    fetch(`/orders/${id}`, 
    {
      method: "DELETE",
      headers:{token: localStorage.getItem("token")}
    })
    .then(res=>res.json())
    .then(result=>{
      if(result.success){
        setUser(result.data)
        toast.success("Order deleted")
      }
    })
  }

  return (
    <div className="profileContainer">
      <h1>Welcome to your Profile</h1>
      {user && (
        <>
          <h2>{user.fullName}</h2>
          <p>{user.email}</p>
          <img src={user.profileImage} width="300" alt="profileImage" />
          <div>
            <button onClick={editProfile}>Update Profile</button>
            <button onClick={logout}>Logout</button>
            <button id="deleteUser">Delete User</button>
          </div>
          <h2>User Orders ({user.orders.length})</h2>
          <ul>
            {user.orders.map((order) => {
              return (
                <ul key={order._id}>
                  <h3>Invoice Nr.:{order._id}</h3>
                  <h4>Total price: {order.totalPrice} €</h4>           
                  <button onClick={()=>deleteOrder(order._id)}>Delete order</button>
                </ul>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
