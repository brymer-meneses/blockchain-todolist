import { useState } from "react";
import "./TaskInput.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface props {
   handleTaskCreation: (content: string) => void
}

function TaskInput(props: props) {
  const [input, setInput] = useState("");

  const handleInput = (event) => { 
    setInput(event.target.value);
  }

  const handleTaskAdd = () => {
    props.handleTaskCreation(input);
  }

  return <section className="task-input-container">
    <h1 className="task-input-text"> Create Task </h1>
    <div className="task-input">
      <input 
        onChange={handleInput}
        type="text"/>
      <FontAwesomeIcon 
        onClick={handleTaskAdd}
        className="task-add-icon" icon={faPlus} />
    </div>
  </section>;
}

export default TaskInput;
