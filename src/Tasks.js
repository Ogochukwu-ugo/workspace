import { RiDeleteBinLine } from "react-icons/ri";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { useState } from "react";

const Tasks = ({ title, body, complete, id, handleComplete, handleDelete }) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
    handleComplete(id);
  };

  return (
    <li>
      <div className="todo-lists">
        <div
          className="task-added"
          style={{ textDecoration: complete ? "line-through" : "none" }}
        >
          <h4
            style={{
              color: "#273c75 "
            }}
          >
            {title}
          </h4>
          <p
            style={{
              color: "#7f8fa6"
            }}
          >
            {body}
          </p>
        </div>
        <div className="icons">
          <RiDeleteBinLine className="icon" onClick={() => handleDelete(id)} />
          {complete ? (
            <FaToggleOn
              className="icon active"
              style={{
                marginLeft: 5 + "px"
              }}
              onClick={handleToggle}
            />
          ) : (
            <FaToggleOff
              className="icon"
              style={{
                marginLeft: 5 + "px"
              }}
              onClick={handleToggle}
            />
          )}
        </div>
      </div>
    </li>
  );
};
export default Tasks;
