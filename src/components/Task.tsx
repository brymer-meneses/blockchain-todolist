import "./Task.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";


interface Task {
  isCompleted: boolean;
  content: string;
  index: number;
  handleTaskDeletion: (index: number) => void;
  handleTaskCompletion: (index: number) => void;
}

function Task(props: Task) {
  const [isCompleted, setIsCompleted] = useState(props.isCompleted);

  const handleFinish = (event) => {
    setIsCompleted(!isCompleted)
    props.handleTaskCompletion(props.index)
  }

  const handleDelete = () => {
    props.handleTaskDeletion(props.index);
  }

  const color = isCompleted ?  "#404C57" : "#BDD4EA" ;
  const textDecoration = isCompleted ? "line-through" : "";
  const logo = isCompleted ? faCircleCheck : faCircle;



  return <div draggable className="task"> 
    <h1 style={{color: color, textDecoration: textDecoration}}>{props.content}</h1>
    <div className="task-buttons">
      <FontAwesomeIcon style={{color: color}} className="button" onClick={handleDelete} icon={faXmark} />
      <FontAwesomeIcon style={{color: color}} className="button" onClick={handleFinish} icon={logo} />
    </div>
  </div>
}

export default Task;
