import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";

import "./Dashboard.css";
import Wallet from "./Wallet";
import TaskInput from "./TaskInput";
import Tasks from "./Tasks";

function Dashboard() {
  return (
    <main>
      <section className="header">
        <div className="title">
          <FontAwesomeIcon className="logo" icon={faListCheck} />
          <h1> TodoList</h1>
        </div>
        <Wallet />
      </section>
      <section className="task-container">
        <TaskInput />
        <Tasks/>
      </section>
    </main>
  );
}

export default Dashboard;
