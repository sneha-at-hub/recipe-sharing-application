import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Grocery.css";
import { FaShoppingBasket } from "react-icons/fa";

function Grocery() {
  const [grocerytodos, setgrocerytodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [menuIndex, setMenuIndex] = useState(null);

  // Fetch groceries from the backend
  useEffect(() => {
    axios.get("http://localhost:8000/api/groceries/")
      .then((response) => setgrocerytodos(response.data))
      .catch((error) => console.error(error));
  }, []);

  const addgrocerytodo = () => {
    if (input.trim()) {
      axios.post("http://localhost:8000/api/groceries/", { text: input, completed: false })
        .then((response) => {
          setgrocerytodos([...grocerytodos, response.data]);
          setInput("");
        })
        .catch((error) => console.error(error));
    }
  };

  const togglegrocerytodo = (index) => {
    const grocerytodo = grocerytodos[index];
    axios.patch(`http://localhost:8000/api/groceries/${grocerytodo.id}/`, {
      completed: !grocerytodo.completed,
    })
      .then((response) => {
        const newgrocerytodos = [...grocerytodos];
        newgrocerytodos[index] = response.data;
        setgrocerytodos(newgrocerytodos);
      })
      .catch((error) => console.error(error));
  };

  const deletegrocerytodo = (index) => {
    const grocerytodo = grocerytodos[index];
    axios.delete(`http://localhost:8000/api/groceries/${grocerytodo.id}/`)
      .then(() => {
        const newgrocerytodos = [...grocerytodos];
        newgrocerytodos.splice(index, 1);
        setgrocerytodos(newgrocerytodos);
        setMenuIndex(null);
      })
      .catch((error) => console.error(error));
  };

  const startEditgrocerytodo = (index) => {
    setEditIndex(index);
    setEditText(grocerytodos[index].text);
    setMenuIndex(null);
  };

  const saveEditgrocerytodo = (index) => {
    const grocerytodo = grocerytodos[index];
    axios.patch(`http://localhost:8000/api/groceries/${grocerytodo.id}/`, {
      text: editText,
    })
      .then((response) => {
        const newgrocerytodos = [...grocerytodos];
        newgrocerytodos[index] = response.data;
        setgrocerytodos(newgrocerytodos);
        setEditIndex(null);
        setEditText("");
      })
      .catch((error) => console.error(error));
  };

  const filteredgrocerytodos = grocerytodos.filter((grocerytodo) =>
    filter === "all"
      ? true
      : filter === "completed"
      ? grocerytodo.completed
      : !grocerytodo.completed
  );

  return (
    <div className="grocery-app">
      <div className="main-container-grocery">
        <div className="grocery-input-container">
          <input
            type="text"
            className="grocery-input"
            placeholder="Add your grocery list to buy"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="grocery-add-btn" onClick={addgrocerytodo}>
            +
          </button>
        </div>

        <div className="grocery-controls">
          <FaShoppingBasket
            style={{
              fontSize: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              color: "red",
              marginLeft: "5px",
            }}
          />
          <h1 style={{ fontSize: "20px", margin: "0", marginLeft: "-500px" }}>
            My Shopping List
          </h1>
          <div className="another-control">
            <button
              className="grocery-complete-all-btn"
              onClick={() =>
                setgrocerytodos(
                  grocerytodos.map((grocerytodo) => ({
                    ...grocerytodo,
                    completed: true,
                  }))
                )
              }
            >
              MARK ALL COMPLETED
            </button>
            <select
              className="grocery-filter"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div>
        </div>

        <ul className="grocery-list">
          {filteredgrocerytodos.map((grocerytodo, index) => (
            <li
              key={index}
              className={`grocery-item ${
                grocerytodo.completed ? "completed" : ""
              }`}
            >
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    className="grocery-edit-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button
                    className="grocery-save-btn"
                    onClick={() => saveEditgrocerytodo(index)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="grocery-item-text">
                    {index + 1}. {grocerytodo.text}
                  </span>
                  <button
                    className="grocery-complete-btn"
                    onClick={() => togglegrocerytodo(index)}
                  >
                    {grocerytodo.completed ? "Undo" : "Complete"}
                  </button>
                  <div className="grocery-menu">
                    <button
                      className="grocery-menu-btn"
                      onClick={() =>
                        setMenuIndex(menuIndex === index ? null : index)
                      }
                    >
                      &#x2022;&#x2022;&#x2022;
                    </button>
                    {menuIndex === index && (
                      <ul className="grocery-dropdown">
                        <li onClick={() => startEditgrocerytodo(index)}>
                          Edit
                        </li>
                        <li onClick={() => deletegrocerytodo(index)}>Delete</li>
                      </ul>
                    )}
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Grocery;
