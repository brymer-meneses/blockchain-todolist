import { useState } from "react";
import "./TaskInput.css"

function TaskInput() {
  const [input, setInput] = useState("");
  const [tip, setTip] = useState("Create task.");

  const refreshTip = () => {
    if (input.trim() === '' || input.length === 0) {
      setTip("Create task.");
    } else {
      setTip("Press enter to submit task.");
    }
  }

  const handleChange = (event) => {
    setInput(event.target.value);
    refreshTip();
  }

  const handleSubmit = (event) => {
    if (event.key == "Enter") {
       setInput('')
    }
    refreshTip();
  }


  return <section className="task-input-container">
    <h1 className="task-input-text"> {tip} </h1>
    <input 
      onChange={handleChange} 
      onKeyDown={handleSubmit}
      value={input}
      className="task-input" type="text"/>
  </section>;
}

export default TaskInput;
