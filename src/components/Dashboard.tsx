import { useState } from "react";
import Task from "./Task";
import TaskInput from "./TaskInput";

import "./Dashboard.css"
import { useAccount } from "wagmi";

type Tasks = Array<{ content: string, isCompleted: boolean }>;


function Dashboard() {
  const [tasks, setTasks] = useState<Tasks>([]);

  const handleTaskCreation = (content: string) => {
    setTasks([...tasks, { content, isCompleted: false }])
  }

  const handleTaskDeletion = (index: number) => {
    setTasks(tasks.filter((_, idx) => index !== idx))
  }

  const handleTaskCompletion = (index: number) => {
    setTasks(
      tasks.map((task, idx) => idx === index ? { ...task, isCompleted: true } : task)
    )
  }

  const handleDiscardChanges = () => {

  }

  const handleSaveChanges = () => { 
  }

  const address = useAccount()
  console.log(address)


  return (
    <section>
      <TaskInput handleTaskCreation={handleTaskCreation} />

      <div className="menu">
        <button className="button-save"onClick={handleDiscardChanges}> Save </button>
        <button className="button-discard" onClick={handleSaveChanges}> Discard </button>
      </div>

      {tasks.map((task, index) =>
        <Task
          isCompleted={task.isCompleted}
          content={task.content}
          index={index}
          handleTaskDeletion={handleTaskDeletion}
          handleTaskCompletion={handleTaskCompletion}
        />
      )}
    </section>
  );
}

export default Dashboard;
