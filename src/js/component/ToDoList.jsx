import React, { useState, useEffect } from "react";

//create your first component
const ToDoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  let host = "https://assets.breatheco.de/apis/fake/todos/user/";
  let user = "georgi";

  const agregarTarea = async (e) => {
    let url = host + user
    //Aquí vamos a agregar todo lo del input
    if (inputValue === "") {
      return;
    }
    if (e.key === "Enter") {
      setTodos([...todos, {
        "label": inputValue,
        "done": false
      }]);
      setInputValue("");
      const request = {
        method: "PUT",
        redirect: "follow",
        body: JSON.stringify([...todos, {
          "label": inputValue,
          "done": false
        }]),
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(url, request);
    }
    //Hacer el PUT. (Generar de vuelta un nuevo array y agregarle de vuelta la nueva)
  
  };

  async function devolverTareas()  {
    const url = host + user;
    const request = {
      method: "GET",
      redirect: "follow",
    };
    const response = await fetch(url, request);
    if (response.ok) {
      const responseJSON = await response.json();
      console.log(responseJSON)
      setTodos(responseJSON)
      
      
    } else {
      console.log("error", error);
    }
  }

  //Aquí voy a generar el useEffect() para que se renderice la lista

  useEffect(() => {
    devolverTareas();
  }, []);

  return (
    <div className="container">
      <h1>My To-Do List</h1>
      <input
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        onKeyPress={agregarTarea}
        placeholder="What do you need to do?"
      ></input>

      <ul>
        {todos.map((item, index) => (
          <li
            key={index}
            className="d-flex justify-content-between hidden-icon"
          >
            {item.label}
          </li>
        ))}
      </ul>

      <div className="task-left">
        <span>
          {todos.length === 0
            ? "No tasks, add a task"
            : todos.length + " Item Left"}
        </span>
      </div>
    </div>
  );
};

export default ToDoList;
