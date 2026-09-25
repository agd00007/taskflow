import { useState } from "react";

function TaskForm({ people, createTask, closeNewTag }) {
  const [newTitle, setNewTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("pendiente");
  const [tag, setTag] = useState("");
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState({});

  // Recoge datos y crea la tarea
  const handleSubmit = () => {
    const newErrors = {};

    if (newTitle.trim() === "") {
      newErrors.title = "Escriba un título";
    } else if (newTitle.trim().length < 3) {
      newErrors.title = "El título debe tener al menos 3 caracteres";
    } else if (newTitle.trim().length > 80) {
      newErrors.title = "El numero máximo de caracteres permitido es 80";
    }

    if (description.length > 300) {
      newErrors.description =
        "La descripción debe de ser menor a 300 caracteres";
    }

    if (deadline === "") {
      newErrors.deadline = "Seleccione una fecha";
    }

    if (priority === "") {
      newErrors.priority = "Seleccione prioridad";
    }

    if (status === "") {
      newErrors.status = "Seleccione el estado";
    }

    const newTags =
      tag.trim() === ""
        ? []
        : tag.split(",").map((tag) => {
            return tag.trim();
          });

    const repeatedTags = (newTags) => {
      return newTags.filter((tag, index) => {
        const finIndex = newTags.findIndex((item) => {
          return item.toLowerCase() === tag.toLowerCase();
        });

        return index === finIndex;
      });
    };
    if (repeatedTags(newTags).length > 5) {
      newErrors.tag = "El número máximo de etiquetas es 5";
    }
    setError(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const now = new Date().toISOString();

    const task = {
      id: crypto.randomUUID(),
      titulo: newTitle.trim(),
      descripcion: description,
      asignadoA: assignee,
      fechaLimite: deadline,
      prioridad: priority,
      estado: status,
      etiquetas: repeatedTags(newTags),
      creadaEn: now,
      actualizadaEn: now,
    };

    createTask(task);
    closeNewTag();
    setAlert(true);
    setNewTitle("");
    setDescription("");
    setDeadline("");
    setPriority("");
    setStatus("");
    setTag("");
    setAssignee("");

    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  // Cancelar creación de tarea
  const handleCancel = () => {
    setNewTitle("");
    setDescription("");
    setDeadline("");
    setPriority("");
    setStatus("");
    setTag("");
    setAssignee("");
    setError({});
    closeNewTag();
  };

  return (
    <div className="new-task position-fixed top-50 start-50 translate-middle bg-white rounded-3 overflow-auto"
      style={{ maxHeight: "90vh" }}>
      <div className="form-content p-4">
        <h1 className="new-task-title fs-2 fw-bold mb-2">Crear nueva tarea</h1>

        <h2 className="new-task-subtitle text-secondary fs-5 fw-normal mb-4">
          Completa los datos para añadirla al proyecto
        </h2>

        <div className="title-task mb-3">
          <h2>Título</h2>

          <input
            className="form-control"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            placeholder="Ej: Diseñar pantalla de perfil"
          />

          {error.title && <span className="error-message">{error.title}</span>}
        </div>

        <div className="description-task mb-3">
          <h2>Descripción</h2>

          <textarea
            className="form-control"
            rows="4"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Añade una breve descripción de la tarea"
          />

          {error.description && (
            <span className="error-masage"> {error.description}</span>
          )}
        </div>

        <div className="more-information-task">
          <div className="information-row row g-3">
            <div className="information col-12 col-md-6">
              <h3>Asignado a</h3>

              <select
              className="form-select"
                value={assignee}
                onChange={(event) => setAssignee(event.target.value)}
              >
                <option value="">Seleccione una persona</option>

                {people.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.nombre}
                  </option>
                ))}
              </select>

              {error.assignee && (
                <span className="error-message">{error.assignee}</span>
              )}
            </div>

            <div className="information col-12 col-md-6">
              <h3>Fecha Límite</h3>

              <input
                className="form-control"
                value={deadline}
                onChange={(event) => setDeadline(event.target.value)}
                type="date"
              />

              {error.deadline && (
                <span className="error-message">{error.deadline}</span>
              )}
            </div>

            <div className="information col-12 col-md-6">
              <h3>Prioridad</h3>
              <div className="selector d-flex gap-2 mt-2">
                <label className="priority-low bg-success-subtle text-success rounded-3 px-3 py-2">
                  <input
                    className="input"
                    type="radio"
                    name="priority"
                    value="baja"
                    checked={priority === "baja"}
                    onChange={(event) => setPriority(event.target.value)}
                  />
                  Baja
                </label>

                <label className="priority-medium bg-warning-subtle text-warning-emphasis rounded-3 px-3 py-2">
                  <input
                    className="input"
                    type="radio"
                    name="priority"
                    value="media"
                    checked={priority === "media"}
                    onChange={(event) => setPriority(event.target.value)}
                  />
                  Media
                </label>

                <label className="priority-high bg-danger-subtle text-danger rounded-3 px-3 py-2">
                  <input
                    className="input"
                    type="radio"
                    name="priority"
                    value="alta"
                    checked={priority === "alta"}
                    onChange={(event) => setPriority(event.target.value)}
                  />
                  Alta
                </label>

                {error.priority && (
                  <span className="error-message">{error.priority}</span>
                )}
              </div>
            </div>

            <div className="information col-12 col-md-6">
              <h3 className="mb-1">Estado</h3>

              <select
              className="form-select"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option value="">Seleccione un estado</option>
                <option value="pendiente">Pendiente</option>
                <option value="en_progreso">En progreso</option>
                <option value="completada">Completada</option>
              </select>

              {error.status && (
                <span className="error-message">{error.status}</span>
              )}
            </div>
          </div>
        </div>

        <h3 className="mt-3">Etiquetas</h3>

        <input
          className="form-control"
          placeholder="Añadir etiqueta"
          value={tag}
          onChange={(event) => setTag(event.target.value)}
        />

        {error.tag && <span className="error-message">{error.tag}</span>}
        <div className="buttons d-flex justify-content-end gap-2 mt-4">
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancelar
          </button>

          <button className="btn btn-primary" onClick={handleSubmit}>
            Crear tarea
          </button>

          {alert && "Tarea creada con exito"}
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
