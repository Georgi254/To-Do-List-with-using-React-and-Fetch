import React, { useState } from "react";

//create your first component
const ToDoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  return (
    <div className="container">
      <h1>My To-Do List</h1>
      <ul>
        <li>
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setTodos(todos.concat(inputValue));
                setInputValue("");
              }
            }}
            placeholder="What do you need to do?"
          ></input>
        </li>
        {todos.map((item, index) => (
          <li className="d-flex justify-content-between hidden-icon">
            {item}{" "}
            <span>
              <i
                class="far fa-trash-alt"
                onClick={() =>
                  setTodos(
                    todos.filter((t, currentIndex) => index != currentIndex)
                  )
                }
              ></i>
            </span>
          </li>
        ))}
        <div className="task-left">
        <span>
              {todos.length === 0 ? "No tasks, add a task" : todos.length + " Item Left"}
          </span>
        </div>
      </ul>
    </div>
  );
};

export default ToDoList;
