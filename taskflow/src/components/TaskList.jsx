import TaskCard from "./TaskCard";

function TaskList({
  orderTask,
  changeStatus,
  deleteTasks,
  peopleData,
  clearFilter,
}) {
  return (
    <div className="taks-list bg-white p-3 rounded-3 ">
      <div>
        <h1 className="title-card">Tareas del equipo</h1>
      </div>
      <div className="task-cards row g-3  ">
        {orderTask.length === 0 && (
          <div>
            <p>No hay tareas para mostrar</p>
            <button onClick={clearFilter}>Limpiar filtros</button>
          </div>
        )}
        {orderTask.map((task) => {
          return (
            <TaskCard
              key={task.id}
              task={task}
              changeStatus={changeStatus}
              deleteTasks={deleteTasks}
              peopleData={peopleData}
            >
              {" "}
            </TaskCard>
          );
        })}
      </div>
    </div>
  );
}

export default TaskList;
