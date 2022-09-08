import "./Task.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";


interface Task {
  isCompleted: boolean;
  content: string;
}

function Task(props: Task) {
  const textColor = props.isCompleted ?  "#404C57" : "#BDD4EA" ;
  const textDecoration = props.isCompleted ? "line-through" : "";
  const logo = props.isCompleted ? faCircleCheck : faCircle;

  return <div className="task"> 
    <h1 style={{color: textColor, textDecoration: textDecoration}}>{props.content}</h1>
    <FontAwesomeIcon className="task-icon" icon={logo} />
  </div>
}

export default Task;
