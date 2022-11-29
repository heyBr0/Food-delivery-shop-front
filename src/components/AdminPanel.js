import { useContext } from "react";
import { MyContext } from "../context/MyContext";
import "../styles/adminPanel.css";

const AdminPanel = () => {
  const { setRecords, records } = useContext(MyContext);
  const addingNewRecord = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    fetch("/records", {
      method: "POST",
      headers: { token: localStorage.getItem("token") },
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        setRecords([result.record, ...records]);
      });
  };
  return (
    <div id="adminPanel">
      <div id="h1Admin">
        <h1>AdminPanel</h1>
      </div>
      <h3>Add new product: </h3>
      <form onSubmit={addingNewRecord}>
        <label>
          Title:
          <input type="text" name="title" />
        </label>
        <br />
        <label>
          Price:
          <input type="number" name="price" />
        </label>
        <br />
        <label>
          Author:
          <input type="text" name="author" />
        </label>
        <br />
        <label>
          Year:
          <input type="number" name="year" />
        </label>
        <br />
        <label>
          Record Image:
          <input type="file" name="image" />
        </label>
        <br />
        <button>Add new Record</button>
      </form>

    </div>
  );
};

export default AdminPanel;
