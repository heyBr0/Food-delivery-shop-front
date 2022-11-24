import { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "../context/MyContext";
import "../styles/shop.css";

const Records = () => {
  const { records, cart, setCart, setRecords } = useContext(MyContext);
  const [searchValue, setSearchValue] = useState("");
  const [start, setStart] = useState(5);
  const [end, setEnd] = useState(10);
  const lastItem = useRef();
  const containerRef = useRef();

  const addItemIntoCart = (record) => {
    const foundItem = cart.find((item) => item._id === record._id);
    if (foundItem) {
      foundItem.quantity++;
      setCart([...cart]);
    } else {
      setCart([...cart, { ...record, quantity: 1 }]);
    }
  };

  useEffect(() => {
    const loadingRecords = new IntersectionObserver(
      (entry) => {
        entry.forEach((item) => {
          console.log(item);
          if (item.isIntersecting) {
            fetch(
              `http://localhost:4000/records?page=1&start=${start}&end=${end}`
            )
              .then((res) => res.json())
              .then((result) => {
                console.log(result);
                setRecords((records) => {
                  return [...records, ...result];
                });
                setStart(end);
                setEnd(end + 5);
              });
          }
        });
      },
      { root: containerRef.current, rootMargin: "100px", threshold: "1.0" }
    );
    loadingRecords.observe(lastItem.current);
    return loadingRecords.unobserve(lastItem.current);
  }, []);

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

  return (
    <>
      <div className="recordsContainer" ref={containerRef}>
        <label id="labelSearch">
          Search:
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
        </section>

        <span ref={lastItem}>OK</span>
      </div>
    </>
  );
};

export default Records;
