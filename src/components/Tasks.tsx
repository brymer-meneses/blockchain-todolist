import Task from "./Task";

function Tasks() {
  return (
    <div>
      <Task isCompleted={false} content="take a walk" />
      <Task isCompleted={true} content="feed the cat" />
      <Task isCompleted={true} content="do homework" />
    </div>
  );
}

export default Tasks;
