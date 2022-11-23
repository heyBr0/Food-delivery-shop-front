import { useContext, useRef, useState } from "react";
import { MyContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";
 import "../styles/profile.css"; 
import toast from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(MyContext);
  const [editMode, setEditMode] = useState(false);
  const firstNameRef = useRef();
  const profileRef = useRef();

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const updateUserProfile = () => {
    const data = new FormData();
    data.append("firstName", firstNameRef.current.value);
    data.append("image", profileRef.current.files[0]);

    fetch(`http://localhost:4000/users/${user._id}`, {
      method: "PATCH",
      headers: {token:localStorage.getItem("token")},
      body: data,
    })
    .then(res=>res.json())
    .then(result=>{
      console.log(result);
      if(result.success){
        toast.success("User profile updated!")
        setEditMode(false)
        setUser(result.data)
      }
    })
  };

  return (
    <div className="profileContainer">
      {user && (
        <>
          <h1>Profile</h1>
          <h3>{user.fullName}</h3>
          <h3>{user.email}</h3>

          {editMode ? (
            <label>
              First name:{" "}
              <input
                type="text"
                defaultValue={user.firstName}
                ref={firstNameRef}
              />
            </label>
          ) : (
            <p>{user.firstName}</p>
          )}

          {editMode ? (
            <label>
              Upload new image;
              <input type="file" ref={profileRef} />{" "}
            </label>
          ) : (
            <img src={user.profileImage} width="300" alt="profileImage" />
          )}

          {/*     <img src={user.profileImage} alt="profile" width="300" /> */}
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

          {editMode ? (
            <>
              <button onClick={updateUserProfile}>Save</button>{" "}
              <button onClick={() => setEditMode(false)}>Cancel</button>
            </>
          ) : (
            <button onClick={() => setEditMode(true)}>Update Profile</button>
          )}
          <button>Delete Profile</button>
          <button onClick={logout}>LOG OUT</button>
        </>
      )}
    </div>
  );
};

export default Profile;
