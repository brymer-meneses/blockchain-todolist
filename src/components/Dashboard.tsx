import { useState } from "react";
import Task from "./Task";
import TaskInput from "./TaskInput";

import "./Dashboard.css"
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";

type Tasks = Array<{ content: string, isCompleted: boolean }>;

import contractInterface from "../../build/contracts/TodoList.json"

const CONTRACT_ADDRESS = "0xCA2ca507FdcdD212bDB3eECda2C1C10373524aF9";

class TaskOp {
  // enum Operation {
  //     CREATE,
  //     DELETE,
  //     SWAP,
  //     FINISH
  //   }
  //
  // struct TaskOperation {
  //      Operation op;
  //      uint taskId;
  //      uint swap;
  //      string content;
  //   }

  static Create(id: number, content: string, )  {
    return [0, id,  0, content, ];
  }

  static Swap(id1: number, id2: number)  {
    return [1, id1,  id2, ""];
  }

  static Delete(id: number)  {
    return [2, id, 0,  "", ];
  }

  static Finish(id: number)  {
    return [3, id,  0, ""];
  }
}

function Dashboard() {
  const [tasks, setTasks] = useState<Tasks>([])
  const [existingTasks, setSavedTasks] = useState<Tasks>([]);
  const [unsavedOps, setUnsavedOps] = useState<Array<string|number>[]>([]);

  const { address } = useAccount()

  useContractRead({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: contractInterface["abi"],
    functionName: "retrieveTasks",
    args: address,
    onSuccess(data) {
      const values = data?.map( ({content, isCompleted}) => { return {content: content, isCompleted: isCompleted} } )
      setTasks(values);
      setSavedTasks(values);
    }
  })


  const handleTaskCreation = (content: string) => {
    setTasks([...tasks, { content, isCompleted: false }])
    setUnsavedOps([...unsavedOps, TaskOp.Create(tasks.length, content)]);
  }

  const handleTaskDeletion = (index: number) => {
    setTasks(tasks.filter((_, idx) => index !== idx))
    setUnsavedOps([...unsavedOps, TaskOp.Delete(index)]);
  }

  const handleTaskCompletion = (index: number) => {
    setTasks(
      tasks.map((task, idx) => idx === index ? { ...task, isCompleted: true } : task)
    )

    setUnsavedOps([...unsavedOps, TaskOp.Finish(index)]);
  }

  const handleDiscardChanges = () => {
    setTasks(existingTasks);
    setUnsavedOps([]);
  }

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: JSON.stringify(contractInterface["abi"]),
    functionName: "updateTasks",
    args: [unsavedOps],
  })

  const { write } = useContractWrite(config);

  const handleSaveChanges = () => {
    write?.();

    setSavedTasks(tasks);
    setUnsavedOps([]);
  }

  const areMenuButtonsDisabled = unsavedOps.length === 0;


  return (
    <section>
      <TaskInput handleTaskCreation={handleTaskCreation} />

      <div className="menu">
        <button 
          className={areMenuButtonsDisabled ? "button-disabled" : "button-save"} 
          onClick={handleSaveChanges}> 
          Save 
        </button>
        <button 
          className={areMenuButtonsDisabled ? "button-disabled" : "button-discard"} 
          onClick={handleDiscardChanges}> 
          Discard 
        </button>
      </div>

      {tasks.map((task, index) =>
        <Task
          isCompleted={task.isCompleted}
          content={task.content}
          index={index}
          key={index}
          handleTaskDeletion={handleTaskDeletion}
          handleTaskCompletion={handleTaskCompletion}
        />
      )}
    </section>
  );
}

export default Dashboard;
