import { useState } from "react";
import Task from "./Task";
import TaskInput from "./TaskInput";

type TaskArray = Array<{content: string, isCompleted: boolean}>;

function Dashboard() {
  const [tasks, setTasks] = useState<TaskArray>([]);

  const handleTaskCreation = (content: string) => {
    setTasks([...tasks, {content, isCompleted: false}])
  }

  return (
    <main>
      <section className="task-container">
        <TaskInput handleTaskCreation={handleTaskCreation} />
        { tasks.map(
          task => <Task isCompleted={task.isCompleted} content={task.content}/>
        )}
      </section>
    </main>
  );
}

export default Dashboard;
