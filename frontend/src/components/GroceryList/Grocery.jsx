import './Grocery.css';
import { useState } from 'react';

const Grocery = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Tomatoes', isCompleted: false },
    { id: 2, text: 'Garlic', isCompleted: false },
    { id: 3, text: 'Banana', isCompleted: false }
  ]);

  const toggleComplete = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, isCompleted: !item.isCompleted } : item));
  };

  return (
    <div className="grocery-wrapper">
      <div className="list-container">
        <ul className="my-list1">
          {items.map((item) => (
            <li key={item.id} className={`value-1 ${item.isCompleted ? 'completed' : ''}`}>
              <input 
                type="checkbox" 
                checked={item.isCompleted} 
                onChange={() => toggleComplete(item.id)} 
              />
              {item.text}
            </li>
          ))}
        </ul>
        <div className="input-for-grocerylist">
          <input type="text" placeholder="Add a new item..." />
          <button className="add-button">Add</button>
        </div>
      </div>
    </div>
  );
}

export default Grocery;
