import { useState, useEffect } from "react";
import tasksData from "./data/tasks.json";
import TaskSumary from "./components/TaskSummary";
import TaskList from "./components/TaskList"
import TaskFilter from "./components/TaskFilter";
import PeopleData from "./data/people.json"
import TaskForm from "./components/TaskForm";
import "./App.css"



function App(){


const loadTasks = () => {
  try {
    const savedTasks = localStorage.getItem("taskflow_tasks");

    
    if (savedTasks === null) {
      return tasksData;
    }

    const parsedTasks = JSON.parse(savedTasks);

    if (Array.isArray(parsedTasks)) {
      return parsedTasks;
    }

    alert("Los datos guardados no eran válidos. Se han restaurado los datos iniciales.");
    return tasksData;

  } catch {
    alert("Los datos guardados no eran válidos. Se han restaurado los datos iniciales.");
    return tasksData;
  }
};


  const [tasks, setTask]=useState(loadTasks)
  const[search, setSearch]=useState("")
  const[status, setStatus]=useState("")
  const[priority, setPriority]=useState("")
  const[assignee, setAssignee]=useState("")
  const[order, setOrder]=useState("")
  const[openForm, setOpenForm]=useState(false)



useEffect(() => {
    localStorage.setItem("taskflow_tasks", JSON.stringify(tasks))
}, [tasks])


  
//funcion para cambiar los estados
  const changeStatus = (taskId, newStatus) => {

    const newTasks = tasks.map((task) => {
        if (task.id === taskId) {
            return {
                ...task,
                estado: newStatus,
                actualizadaEn:new Date().toISOString()
            }
        } else {
            return task
        }
    })
    setTask(newTasks)
  

}

//eliminar tareas
const deleteTasks = (taskDelete) => {

    if (confirm("¿Seguro que quieres eliminar esta tarea?")) {

        const newDelete = tasks.filter((task) => {
            return task.id !== taskDelete
        })

        setTask(newDelete)
    }
}

//filtrar tareas
  const filteredTasks=tasks.filter((task)=>(
    task.titulo.toUpperCase().includes(search.toUpperCase())||
    task.descripcion.toUpperCase().includes(search.toUpperCase())||
    task.etiquetas.some((tag)=>tag.toUpperCase().includes(search.toUpperCase()))
  )
  
  &&
    (status==="" || task.estado===status)&&
    (priority==="" || task.prioridad===priority)&&
    (assignee===""||task.asignadoA===assignee)

  )

  const priorityOrder={
     "alta":1,
      "media":2,
      "baja":3
  }

  const orderTask=[...filteredTasks]
    if (order==="title") {
      orderTask.sort((a,b)=>a.titulo.localeCompare(b.titulo))
    }else if(order==="deadline"){
      orderTask.sort((a,b)=> new Date (a.fechaLimite)- new Date(b.fechaLimite))

    }else if (order==="priority"){
      orderTask.sort((a,b)=>priorityOrder[a.prioridad] - priorityOrder[b.prioridad])
    }
    
//agregar nueva tarea, añadimos la tarea a la lista de tareas
const createTask=(task)=>{
  
   setTask([...tasks, task])

}

//funcion para controlar los estados del nuevo formulario (abierto)

const statusButtonNewTag=()=>{
  setOpenForm(true)

}

//funcion para cerrar el formulario

const closeNewTag=()=>{
  setOpenForm(false)
}

//funcion para limpiar el formulario

const clearFilter=()=>{
  setSearch(""), setStatus(""), setPriority(""), setAssignee(""), setOrder("")

}

return (
    <div className="app">
      
      <TaskSumary tasks={tasks} statusButtonNewTag={statusButtonNewTag}></TaskSumary>
      <div className="task-panel d-flex gap-3 p-3">
        <TaskFilter tasks={tasks} people={PeopleData} search={search} setSearch={setSearch} status={status} setStatus={setStatus}
        priority={priority} setPriority={setPriority} assignee={assignee} setAssignee={setAssignee} order={order} setOrder={setOrder}></TaskFilter>
        
        <TaskList orderTask={orderTask} changeStatus={changeStatus} deleteTasks={deleteTasks} peopleData={PeopleData} clearFilter={clearFilter}></TaskList >
        
      </div>
      {openForm &&  <TaskForm people={PeopleData} createTask={createTask} closeNewTag={closeNewTag}></TaskForm>}
     
    </div>
  )
}

export default App