import { useState, useEffect } from "react";
// import './App.css'
import Navbar from "./components/navbar";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [ShowFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("tasks")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("tasks")) 
      setTasks(todos)
    }
  },[])
  

  const saveToLocal = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }
  
  const toggleFinished = (e)=>{
    setShowFinished(!ShowFinished);
  }
  const handleEdit = (e,id) => {
    let T =  tasks.filter(item => item.id == id)
    
    setTask(T[0].task)

    //deleting task
    let newTasks = tasks.filter(item=>{
      return item.id !=id;
    });
    setTasks(newTasks);
    saveToLocal();
   };

  const handleDelete = (e, id) => {
    let newTasks = tasks.filter(item=>{
      return item.id !=id;
    });
    setTasks(newTasks);
    saveToLocal(); 
   };
  const handleAdd = () => {
    setTasks([...tasks, { id: uuidv4(), task, isCompleted: false }]);
    setTask("")
    saveToLocal();

  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleCheckbox = (e) => {
    
    let id = e.target.name;
    let index = tasks.findIndex(item=>{
      return item.id == id;
    })
    let newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTasks(newTasks);


  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto rounded-xl my-5 p-5 bg-violet-200 min-h-[75vh] md:w-1/2">
      <h1 className="font-bold text-center text-xl">MyTasks - Manage your Day-to-Day Tasks</h1>
        <div className="add-todo my-5 flex flex-col gap-2">
          <h2 className="text-lg font-bold">Add a Task</h2>
          <div className="flex gap-3">
          <input type="text" onChange={handleChange} value={task} placeholder="Enter your Task" className="w-full rounded-full px-5 py-2" name="task" id="enter-task" />
          <button disabled={task.length<=3} onClick={handleAdd} className="bg-violet-600 hover:bg-violet-800 disabled:bg-violet-900 p-3 py-0 font-semibold text-white rounded-xl ">Save</button>
          </div>
        </div>
        <input onChange={toggleFinished} className="my-5" type="checkbox" checked={ShowFinished} /> Show Finished 
        <h2 className="text-xl font-bold">Your Tasks</h2>
        <div className="todo-list">
        {tasks.length == 0 && <div className="m-5">No Tasks to display</div> }
          {tasks.map((item) => {
            return (ShowFinished || !item.isCompleted) && (
              <div className="todo flex w-full justify-between my-3">
                <div className="flex gap-5 items-center">
                <input type="checkbox" name={item.id} checked={item.isCompleted}  onChange={handleCheckbox} />
                <div name={item.id} onChange={handleCheckbox} className={ item.isCompleted ? "font-bold line-through overflow-x-auto" : "font-bold"}>
                  {item.task}
                </div>
                </div>
                <div className="buttons flex h-full items-center">
                  <button onClick={(e)=>{handleEdit(e, item.id)}} className="bg-violet-600 hover:bg-violet-800 p-3 py-2 font-semibold text-white rounded-lg mx-2">
                    <FaEdit/>
                  </button>
                  <button onClick={(e)=>{handleDelete(e,item.id)}} className="bg-violet-600 hover:bg-violet-800 p-3 py-2 font-semibold text-white rounded-lg mx-2"><MdDeleteForever /></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
 