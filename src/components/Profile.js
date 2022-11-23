import React, { useContext } from "react";
import { MyContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";
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
          <h2>User Orders </h2>
          <ul>
            {user.orders.map((order) => {
              return (
                <div key={order._id}>
                  <h3>{order._id}</h3>
                  <button>Delete order</button>
                </div>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
