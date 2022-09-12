import { useState } from "react";
import Task from "./Task";
import TaskInput from "./TaskInput";

import "./Dashboard.css"
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";

type Tasks = Array<{ content: string, isCompleted: boolean }>;

import contractInterface from "../../build/contracts/TodoList.json"

const CONTRACT_ADDRESS = "0xCA2ca507FdcdD212bDB3eECda2C1C10373524aF9";

enum TaskOpKind {
  CREATE=0,
  DELETE=1,
  SWAP=2,
  FINISH=3,
}

class TaskOp {
  // struct TaskOperation {
  //      Operation op;
  //      uint taskId;
  //      uint swap;
  //      string content;
  //   }

  static Create(id: number, content: string, )  {
    return [TaskOpKind.CREATE, id,  0, content, ];
  }

  static Swap(id1: number, id2: number)  {
    return [TaskOpKind.SWAP, id1,  id2, ""];
  }

  static Delete(id: number)  {
    return [TaskOpKind.DELETE, id, 0,  ""];
  }

  static Finish(id: number)  {
    return [TaskOpKind.FINISH, id,  0, ""];
  }
}

function Dashboard() {
  const [tasks, setTasks] = useState<Tasks>([])
  const [preSavedTasks, setPreSavedTasks] = useState<Tasks>([]);
  const [unsavedOps, setUnsavedOps] = useState<Array<string|number>[]>([]);

  const { address } = useAccount({
    onDisconnect() {
      setTasks([]);
      setPreSavedTasks([]);
      setUnsavedOps([]);
    }
  })

  useContractRead({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: contractInterface["abi"],
    functionName: "retrieveTasks",
    args: [address],
    onSuccess(data) {
      const values = data?.map( ({content, isCompleted}) => { return {content: content, isCompleted: isCompleted} } )
      setTasks(values);
      setPreSavedTasks(values);
    }
  })

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: JSON.stringify(contractInterface["abi"]),
    functionName: "updateTasks",
    args: [unsavedOps],
  })

  const { write: updateTasks } = useContractWrite(config);


  const handleTaskCreation = (content: string) => {
    setTasks([...tasks, { content, isCompleted: false }])
    setUnsavedOps([...unsavedOps, TaskOp.Create(tasks.length, content)]);
  }

  const handleTaskDeletion = (index: number) => {
    setTasks(tasks.filter((_, idx) => index !== idx))
    setUnsavedOps([...unsavedOps, TaskOp.Delete(index)]);
  }

  const handleTaskToggleCompletion = (index: number) => {

    // check for toggle completion operation in the unsaved operations array,
    // if it exists delete that operation from the unsaved operations list

    const unsavedToggleCompletion = unsavedOps.find( op => op[0] === TaskOpKind.FINISH && op[1] === index);

    if (unsavedToggleCompletion) {
      setUnsavedOps(unsavedOps.filter(op => op != unsavedToggleCompletion))
      return
    } 

    setUnsavedOps([...unsavedOps, TaskOp.Finish(index)]);
    setTasks(tasks.map((task, idx) => idx === index ? { ...task, isCompleted: true } : task))

  }

  const handleDiscardChanges = () => {
    setTasks(preSavedTasks);
    setUnsavedOps([]);
  }


  const handleSaveChanges = () => {
    updateTasks?.();

    setPreSavedTasks(tasks);
    setUnsavedOps([]);
  }

  const areMenuButtonsDisabled = unsavedOps.length === 0;


  return (
    <section className="dashboard">
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
          handleTaskToggleCompletion={handleTaskToggleCompletion}
        />
      )}
    </section>
  );
}

export default Dashboard;
