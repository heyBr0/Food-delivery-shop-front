import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/MyContext";
import "../styles/home.css";
import Berlin1 from "../styles/images/Berlin1.jpg";
import Berlin2 from "../styles/images/Berlin2.jpg";

const Homepage = () => {
  const { user } = useContext(MyContext);
  const navigate = useNavigate()

  return (
    <>
      <div className="homeContainer">
        <section id="homeSection">
          FoodClick is a carefully curated
          <span className="startupSpan">startup food delivery app</span>, food
          hall & community space open year-round at Berliner Straße 25. Support
          Small Business this weekend :)
        </section>
        <div id="images">
          <img src={Berlin1} alt="imageSpace1" />
          <p>
            Retail Market Hours: <br />
            Fri– Sun: 11:00AM - 7:00PM
          </p>
          <p>
            Food Hall Hours: <br />
            Mon – Thurs: 11:00AM - 6:00PM <br />
            Fri– Sun: 11:00AM - 7:00PM
          </p>
          <img src={Berlin2} alt="imageSpace2" />
        </div>
        <section id="footerSection">
          Merging retail, food, art, and culture,
          <span className="startupSpan">FoodClick Market</span> highlights top 
          retail and design concepts, restaurants, and up-and-coming players in
          the centre of Berlin community.
        </section>
        {user ? (
          <>
            <p className="para">Interested in becoming a client?</p>
            <p className="para">Please check out our Shop</p>
            <div className="footerButtons1">
            <button className="footerLink" 
            onClick={()=>navigate("/records")}
            >To the Shop</button>

            </div>
          </>
        ) : (
          <>
            <p className="para">Interested in becoming a client?</p>
            <p className="para">Please Sign In or Login to proceed</p>
            <div className="footerButtons2">
            <button className="footerLink2"
             onClick={()=>navigate("/signup")}>Sign Up</button>
            <button className="footerLink2"
             onClick={()=>navigate("/login")}>Login</button>
            </div>
          
          </>
        )}
      </div>
    </>
  );
};

export default Homepage;
