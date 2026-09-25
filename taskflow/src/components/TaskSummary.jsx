import { List } from "lucide-react";
import { Clock } from "lucide-react";
import { LoaderCircle } from "lucide-react";
import { Check } from "lucide-react";
import { Plus } from "lucide-react";

function TaskSumary({ tasks, statusButtonNewTag }) {
  const total = tasks.length;
  const pending = tasks.filter((task) => task.estado === "pendiente").length;
  const progress = tasks.filter((task) => task.estado === "en_progreso").length;
  const completed = tasks.filter((task) => task.estado === "completada").length;
  const percentage = total === 0 ? 0 : (completed / total) * 100;

  return (
    <section>
      <div className="titles">
        <h1 className="title">TaskFlow</h1>
        <p className="subtitle">Panel del proyecto</p>

        <button className="btn btn-primary ms-auto me-2" onClick={statusButtonNewTag}>
          <Plus className="plus" />
          Nueva tarea
        </button>
      </div>
      <div className="summary-cards row g-3 mx-2">

  <div className="col-12 col-md-6 col-lg-3">
    <div className="card h-100 flex-row align-items-center gap-3 p-3">
      <div className="card-icon">
        <List />
      </div>
      <div className="card-info">
        <p className="mb-1">Total</p>
        <span className="fs-2 fw-bold">{total}</span>
      </div>
    </div>
  </div>

  <div className="col-12 col-md-6 col-lg-3">
    <div className="card h-100 flex-row align-items-center gap-3 p-3">
      <div className="card-icon clock">
        <Clock />
      </div>
      <div className="card-info">
        <p className="mb-1">Pendientes</p>
        <span className="fs-2 fw-bold">{pending}</span>
      </div>
    </div>
  </div>

  <div className="col-12 col-md-6 col-lg-3">
    <div className="card h-100 flex-row align-items-center gap-3 p-3">
      <div className="card-icon loader">
        <LoaderCircle />
      </div>
      <div className="card-info">
        <p className="mb-1">En Progreso</p>
        <span className="fs-2 fw-bold">{progress}</span>
      </div>
    </div>
  </div>

  <div className="col-12 col-md-6 col-lg-3">
    <div className="card h-100 flex-row align-items-center gap-3 p-3">
      <div className="card-icon check">
        <Check />
      </div>
      <div className="card-info">
        <p className="mb-1">Completadas</p>
        <span className="fs-2 fw-bold">{completed}</span>
        <span className="ms-2">{percentage}%</span>
      </div>
    </div>
  </div>

</div>

    
    </section>
  );
}

export default TaskSumary;
