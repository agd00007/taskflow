import { Calendar } from "lucide-react";
import { Trash2 } from "lucide-react";

function TaskCard({ task, changeStatus, deleteTasks, peopleData }) {
  const isOverdue = () => {
    if (
      new Date(task.fechaLimite) < new Date() &&
      task.estado !== "completada"
    ) {
      return "La tarea esta vencida";
    }
  };

  const assignePerson = peopleData.find((person) => {
    return person.id === task.asignadoA;
  });

  const avatarColors = [
    "lightblue",
    "lightgreen",
    "pink",
    "plum",
    "lightyellow",
  ];
  let valor = assignePerson ? assignePerson.iniciales[0] : "";
  let index = valor.charCodeAt(0);
  let resultIndex = index % avatarColors.length;
  let colorPerson = avatarColors[resultIndex];

  return (
    <div className="col-12 col-md-6">
      <div className="task-task border rounded-3 p-3 h-100 ">
        <div className="task-information d-flex align-items-center gap-1 ">
          <h3 className="task-title me-4">{task.titulo} </h3>
          <p
            className={`task-priority ${task.prioridad} d-flex justify-content-center align-items-center rounded-pill px-3 py-1 mb-0`}
          >
            {task.prioridad}{" "}
          </p>

          <select
            className={`form-select w-auto rounded-5  ${task.estado}`}
            value={task.estado}
            onChange={(event) => changeStatus(task.id, event.target.value)}
          >
            <option value="pendiente">Pendiente</option>
            <option value="en_progreso">En progreso</option>
            <option value="completada">Completada</option>
          </select>
        </div>

        <p className="task-description">{task.descripcion} </p>

        <div className="person-information d-flex align-items-center mt-3 gap-3 flex-wrap">
          <p
            className="person-avatar d-flex justify-content-center align-items-center rounded-circle mb-0"
            style={{
              backgroundColor: colorPerson,
              width: "50px",
              height: "50px",
            }}
          >
            {assignePerson ? assignePerson.iniciales : ""}{" "}
          </p>

          <p className="person-nombre text-secondary mb-0">
            {assignePerson ? assignePerson.nombre : "Sin asignar"}{" "}
          </p>

          <div className="select-date d-flex align-items-center gap-1">
            <Calendar className="text-secondary"></Calendar>
            <p
              className={
                isOverdue() ? "date overdue mb-0" : "text-secondary mb-0"
              }
            >
              {task.fechaLimite}
            </p>
          </div>

          <div className="tag-container d-flex align-items-center gap-2">
            {task.etiquetas.map((tag) => {
              return (
                <div
                  className="tag bg-secondary-subtle rounded-pill px-2 py-1"
                  key={tag}
                >
                  {tag}{" "}
                </div>
              );
            })}{" "}
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button
            className="btn text-secondary ms-auto p-1"
            onClick={() => deleteTasks(task.id)}
          >
            <Trash2></Trash2>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
