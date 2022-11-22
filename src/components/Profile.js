import { useContext } from "react";
import { MyContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css"

const Profile = () => {
  const { user, setUser } = useContext(MyContext);
  const navigate= useNavigate()

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/")
  };

  return (
    <div className="profileContainer">
      {user && (
        <>
        <h1>Profile</h1> 
          <h3>{user.fullName}</h3>
          <h3>{user.email}</h3>
          <img src={user.profileImage} alt="profile" width="300" />
          <h4>User orders:</h4>
          {
            <ul>
              {user.orders.map((order) => {
                return (
                  <div key={order._id}>
                    <h3>{order._id}</h3>
                    <button>delete order</button>
                  </div>
                );
              })}
            </ul>
          }
          <button>Update Profile</button>
          <button>Delete Profile</button>
          <button onClick={logout}>LOG OUT</button>
        </>
      )}
    </div>
  );
};

export default Profile;
