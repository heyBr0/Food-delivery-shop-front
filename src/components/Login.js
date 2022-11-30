import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { MyContext } from "../context/MyContext";
 import "../styles/login.css"  

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(MyContext);

  const loginUser = (e) => {
    e.preventDefault()
    fetch("/users/login", 
    {method : "POST", 
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({email: e.target.email.value, password: e.target.password.value})})
    .then(res=>{
      const token = res.headers.get("token")
      localStorage.setItem("token", token)
      return res.json()
    })     
   
    .then(result=>{
      if (result.success) {
        toast.success("You successfully logged in ");
        setUser(result.data)
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } else {
        toast.error("Something is wrong, please try again");
       /*  toast.error(JSON.stringify(result.message)); */
      }
      console.log(result.data);
    })
  };

  return (
    <div className="loginContainer">
   
      <form
        encType="multipart/form-data"
        onSubmit={loginUser} 
      >
            <h1>Please log in:</h1> 
        <label>
          Email: <input type="email" name="email" required></input>
        </label>
        <br />
        <label>
          Password: <input type="password" name="password" required></input>
        </label>
        <br />
        <button>Login</button>
      </form>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Login;
