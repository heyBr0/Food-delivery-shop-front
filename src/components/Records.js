import { useContext } from "react";
import { MyContext } from "../context/MyContext";

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
      <h1>Records</h1>

      <div>
        {records.map((record) => {
          return (
            <div key={record._id}>
              <h2>{record.title}</h2>
              <img src={record.img} alt="" width="200" />
              <h3>{record.author}</h3>
              <p>{record.price} €</p>
              <button onClick={() => addItemIntoCart(record)}>
                Add to cart
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Records;
