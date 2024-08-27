import React, { useState } from 'react';
import './Grocery.css';

function Grocery() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [menuIndex, setMenuIndex] = useState(null); // Track which menu is open

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    setMenuIndex(null); // Close menu after deleting
  };

  const startEditTodo = (index) => {
    setEditIndex(index);
    setEditText(todos[index].text);
    setMenuIndex(null); // Close menu after starting edit
  };

  const saveEditTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].text = editText;
    setTodos(newTodos);
    setEditIndex(null);
    setEditText('');
  };

  const filteredTodos = todos.filter(todo =>
    filter === 'all' ? true : filter === 'completed' ? todo.completed : !todo.completed
  );

  return (
    <div className="grocery-app">
      <div className="grocery-input-container">
        <input
          type="text"
          className="grocery-input"
          placeholder="Add Todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="grocery-add-btn" onClick={addTodo}>+</button>
      </div>
      
     
  
      <div className="grocery-controls">
        <h2>My Shopping List</h2>
        <div className="another-control">
        <button className="grocery-complete-all-btn" onClick={() => setTodos(todos.map(todo => ({ ...todo, completed: true })))}>
          MARK ALL COMPLETED
        </button>
        <select className="grocery-filter" onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

        </div>

      <ul className="grocery-list">
        {filteredTodos.map((todo, index) => (
          <li key={index} className={`grocery-item ${todo.completed ? 'completed' : ''}`}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  className="grocery-edit-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button className="grocery-save-btn" onClick={() => saveEditTodo(index)}>Save</button>
              </>
            ) : (
              <>
                <span className="grocery-item-text">{index + 1}. {todo.text}</span>
                <button className="grocery-complete-btn" onClick={() => toggleTodo(index)}>
                  {todo.completed ? 'Undo' : 'Complete'}
                </button>
                <div className="grocery-menu">
                  <button className="grocery-menu-btn" onClick={() => setMenuIndex(menuIndex === index ? null : index)}>
                    &#x2022;&#x2022;&#x2022;
                  </button>
                  {menuIndex === index && (
                    <ul className="grocery-dropdown">
                      <li onClick={() => startEditTodo(index)}>Edit</li>
                      <li onClick={() => deleteTodo(index)}>Delete</li>
                    </ul>
                  )}
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Grocery;
