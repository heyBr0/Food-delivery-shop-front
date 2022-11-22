import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "../styles/signup.css"

const Signup = () => {
  /*   const formRef = useRef(); */
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    // send data to backend

    fetch("http://localhost:4000/users", {
      method: "POST",
      /*  headers: { "Content-Type": "application/json" }, */
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          toast.success("You successfully signed up ");
          setTimeout(() => {
            navigate("/login");
          }, 2500);
        } else {
          toast.error(JSON.stringify(result.message));
        }
        console.log(result);
      });
  };
  return (
    <div className="signupContainer">
     <h1>Sign up new user</h1> 
      <form
        encType="multipart/form-data"
        onSubmit={registerUser} /* ref={formRef} */
      >
        <label>
          First name: <input type="text" name="firstName" required></input>
        </label>
        <br />
        <label>
          Last name: <input type="text" name="lastName" required></input>
        </label>
        <br />
        <label>
          Email: <input type="email" name="email" required></input>
        </label>
        <br />
        <label>
          Password: <input type="password" name="password" required></input>
        </label>
        <br />
        <label>
          Profile Image: <input type="file" name="image"></input>
        </label>
        <br />
        <button>Sign up</button>
      </form>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Signup;
