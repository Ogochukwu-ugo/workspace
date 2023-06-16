import React, { useState, useEffect } from "react";
import Tasks from "./Tasks";

const getTodoLists = () => {
  const todos = localStorage.getItem("data");
  if (todos) {
    return JSON.parse(todos);
  } else {
    return [];
  }
};

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [todoList, setTodoList] = useState(getTodoLists());

  const handleTask = (e) => {
    e.preventDefault();
    const id = todoList.length + 1;
    const newTask = {
      id: id,
      title: title,
      body: body,
      complete: false
    };
    setTodoList([...todoList, newTask]);
    setTitle("");
    setBody("");
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(todoList));
  }, [todoList]);

  const completedTask = todoList.filter((task) => task.complete).length;
  const pendingTask = todoList.length - completedTask;

  const handleComplete = (id) => {
    let list = todoList.map((task) => {
      if (task.id === id) {
        return { ...task, complete: !task.complete };
      } else {
        return task;
      }
    });
    setTodoList(list);
  };

  const handleDelete = (id) => {
    const filtered = todoList.filter((task) => {
      return task.id !== id;
    });
    setTodoList(filtered);
  };

  return (
    <div className="main-form">
      <form onSubmit={handleTask}>
        <label>Title :</label>
        <input
          type="text"
          placeholder="Enter new task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Description :</label>
        <textarea
          placeholder="Enter new task details"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        ></textarea>
        <button type="submit">Add</button>
      </form>
      <div className="tasks">
        <h2>Tasks</h2>
        <div className="counts">
          <h3>Pending - {pendingTask}</h3>
          <h3>Completed - {completedTask}</h3>
        </div>
        <ul>
          {todoList.map((todo) => {
            return (
              <Tasks
                key={todo.id}
                title={todo.title}
                body={todo.body}
                complete={todo.complete}
                id={todo.id}
                handleComplete={handleComplete}
                handleDelete={handleDelete}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CreateTask;
