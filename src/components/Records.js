import { useContext } from "react";
import { MyContext } from "../context/MyContext";
import "../styles/shop.css"

const Records = () => {
  const { records, cart, setCart } = useContext(MyContext);

  const addItemIntoCart = (record) => {
    const foundItem = cart.find((item) => item._id === record._id);
    if (foundItem) {
      foundItem.quantity++;
      setCart([...cart]);
    } else {
      setCart([...cart, { ...record, quantity: 1 }]);
    }
  };

  return (
    <>
      <div className="recordsContainer">
          {records.map((record) => {
          return (
            <div key={record._id} className="card">
              <>
              <img src={record.img} alt="" width="300" />
              <div className="container">
              <h2>{record.title}</h2>
              <h3>{record.price} €</h3>

              </div>
             
              <button onClick={() => addItemIntoCart(record)}>
                Add to cart
              </button>
              </>             
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Records;
