import "./Task.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";


interface Task {
  isCompleted: boolean;
  content: string;
}

function Task(props: Task) {
  const [isCompleted, setIsCompleted] = useState(props.isCompleted);

  const handleClick = (event) => {
    setIsCompleted(!isCompleted)
  }

  const textColor = isCompleted ?  "#404C57" : "#BDD4EA" ;
  const textDecoration = isCompleted ? "line-through" : "";
  const logo = isCompleted ? faCircleCheck : faCircle;



  return <div className="task"> 
    <h1 style={{color: textColor, textDecoration: textDecoration}}>{props.content}</h1>
    <FontAwesomeIcon className="task-icon" onClick={handleClick} icon={logo} />
  </div>
}

export default Task;
