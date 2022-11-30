import { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "../context/MyContext";
import "../styles/shop.css";
import toast, { Toaster } from "react-hot-toast";

const Records = () => {
  const { records, cart, setCart, setPage, page, user, setRecords } =
    useContext(MyContext);
  const [searchValue, setSearchValue] = useState("");
  const lastItem = useRef();

  const addItemIntoCart = (record) => {
    const foundItem = cart.find((item) => item._id === record._id);
    if (foundItem) {
      foundItem.quantity++;
      setCart([...cart]);
    } else {
      setCart([...cart, { ...record, quantity: 1 }]);
    }
  };

  // INTERSECTION OBSERVER
  useEffect(() => {
    /*     console.log(start, end); */
    const IB = new IntersectionObserver(
      (entry) => {
        console.log(entry[0].isIntersecting);
        if (entry[0].isIntersecting) {
          setPage((page) => page + 1);
        }
      },
      { rootMargin: "50px" }
    );
    lastItem.current && IB.observe(lastItem.current);
  }, [setPage]);

  // SEARCH
  const filteredData = records.filter((record) => {
    if (
      record.title.slice(0, searchValue.length).toLowerCase() ===
        searchValue.toLowerCase() ||
      record.title.slice(0, searchValue.length).toLowerCase() === "" ||
      record.title.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  });

  // ADMIN DELETE ITEM
  const adminDeleteItem = (id) => {
    if (id) {
      fetch(`/records/${id}`, {
        method: "DELETE",
        headers: { token: localStorage.getItem("token") },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            const newRecords = records.filter((item) => item._id !== id);
            setRecords(newRecords);
            toast.success("Item deleted");
          }
        });
    }
  };

  return (
    <>
      <div className="recordsContainer">
        <label id="labelSearch">
          <span id="spanSearch">Search:</span>

          <input
            id="searchBar"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="What are you looking for?"
          />
        </label>

        <section className="itemSection">
          {filteredData.map((record) => {
            return (
              <div key={record._id} className="shopCard">
                <>
                  <img src={record.img} alt="recordImage" width="300" />
                  <div className="container">
                    <h2>{record.title}</h2>
                    <h3>{record.price} €</h3>
                  </div>

                  <button onClick={() => addItemIntoCart(record)}>
                    Add to cart
                  </button>
                  {user && user.role === "admin" && (
                    <button onClick={() => adminDeleteItem(record._id)}>
                      Delete item
                    </button>
                  )}
                </>
              </div>
            );
          })}
          <span id="spanPages" ref={lastItem}>
            Pages fetched: {page}
          </span>
        </section>
        <Toaster position="bottom-center" />
      </div>
    </>
  );
};

export default Records;
