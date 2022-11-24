import React, { useContext } from "react";
import toast, {Toaster} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/MyContext";
import "../styles/editProfile.css"; 

const EditProfileUser = () => {
  const { user, setUser } = useContext(MyContext);
  const navigate = useNavigate();

  const sendUpdateRequest = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    fetch(`http://localhost:4000/users/${user._id}`, {
      method: "PATCH",
      headers: { token: localStorage.getItem("token") },
      body: data,
    })
    .then(res=>res.json())
    .then(result=>{
      if(result.success){
        toast.success("User profile updated!")
        setUser(result.data)
        setTimeout(()=>{
          navigate("/profile")
        }, 2000)
      } else{
        toast.error(result.message)
      }
    })
  };

  const cancel =()=>{
    navigate("/profile")
  }
  return (
    <div className="editProfileContainer">
    
      <form onSubmit={sendUpdateRequest}>
      <h1>Edit user profile</h1>
        <label>
          First name:{" "}
          <input
            type="text"
            name="firstName"
            defaultValue={user.firstName}
          ></input>
        </label>
        <br />
        <label>
          Last name:{" "}
          <input
            type="text"
            name="lastName"
            defaultValue={user.lastName}
          ></input>
        </label>
        <br />
        <label>
          Password:{" "}
          <input
            type="password"
            name="password"
            placeholder="*********"
          ></input>
        </label>
        <br />
        <label>
          Profile Image: <input type="file" name="image"></input>
        </label>
        <br />
        <img src={user.profileImage} width="100" alt="profileImage" />
        <br />
        <button>Save changes</button>
        <button onClick={cancel}>Cancel</button>
      </form>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default EditProfileUser;
