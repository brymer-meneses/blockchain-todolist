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
    if (input.trim() === '' || input.length === 0) return;
    setInput('')
    props.handleTaskCreation(input);
  }

  return <section className="task-input-container">
    <h3> Create Task </h3>
    <div className="task-input">
      <input 
        onChange={handleInput}
        value={input}
        type="text"/>
      <FontAwesomeIcon 
        onClick={handleTaskAdd}
        className="add-icon" icon={faPlus} />
    </div>
  </section>;
}

export default TaskInput;
