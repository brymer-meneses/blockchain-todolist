// import { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import Backdrop from "./components/Backdrop";
import Dashboard from "./components/Dashboard";

function App() {
  // const [count, setCount] = useState(0);
  return (
    <div className="App">
      <Dashboard />
      <Backdrop />
    </div>
  );
}

export default App;
