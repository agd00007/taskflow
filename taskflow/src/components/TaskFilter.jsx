
import { Filter } from "lucide-react";
import { Search } from "lucide-react";

function TaskFilter({
  
  people,
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
  assignee,
  setAssignee,
  order,
  setOrder,
}) {
  return (
    <div className="filter bg-white shadow-sm rounded-3 p-4">
      <div className="filter-icon d-flex aling-items-center gap-2 ">
        <Filter></Filter>
        <p className="mb-2">Filtros</p>
      </div>

      <div className="search-box mb-3 position-relative">
        <Search className="position-absolute top-50 translate-middle-y ms-2  p-1"></Search>
        <input
        className="form-control"
          type="text"
          placeholder="Buscar tareas"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <div className="filter-option">
        <p className="mb-1 fw-semiblod">Estado</p>
        <select
        className="form-select mb-3"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="">Todos</option>
          <option value="pendiente">Pendiente</option>
          <option value="en_progreso">En progreso</option>
          <option value="completada">Completada</option>
        </select>

        <p className="mb-1 fw-semiblod">Prioridad</p>
        <select
        className="form-select mb-3"
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          <option value="">Todas</option>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>

        <p mb-1 fw-semiblod>Asignado a:</p>
        <select
        className="form-select mb-3"
          value={assignee}
          onChange={(event) => setAssignee(event.target.value)}
        >
          <option value="">Todas</option>

          {people.map((person) => (
            <option key={person.id} value={person.id}>
              {person.nombre}
            </option>
          ))}
        </select>
        <p>Ordenar por</p>
        <select
        className="form-select mb-3"
          value={order}
          onChange={(event) => setOrder(event.target.value)}
        >
          <p mb-1 fw-semiblod>Ordenar por</p>
          <option value="deadline">Fecha limite</option>
          <option value="priority">Prioridad</option>
          <option value="title">Titulo</option>
        </select>
      </div>
    </div>
  );
}

export default TaskFilter;
