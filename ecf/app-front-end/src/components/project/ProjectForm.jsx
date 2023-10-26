import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProject, editProject, setFormMode } from "./projectSlice";

const ProjectForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mode = useSelector((state) => state.projects.formMode);
  const project = useSelector((state) => state.projects.selectedProject);

  const titleRef = useRef();
  const descriptionRef = useRef();
  const dateStartRef = useRef();
  const dateEndRef = useRef();
  const statusRef = useRef();

  const submitFormHandler = async (event) => {
    event.preventDefault();

    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const dateStart = dateStartRef.current.value;
    const dateEnd = dateEndRef.current.value;
    const status = statusRef.current.value;

    const newProject = {
      title,
      description,
      dateStart,
      dateEnd,
      status,
    };
    if (mode === "add") {
      dispatch(addProject(newProject));
    } else if (mode === "edit") {
      dispatch(editProject({ ...newProject, id: project.id }));
    }

    dispatch(setFormMode(""));
    navigate("/");
  };

  return (
    <>
      <h3>{mode} Project</h3>
      <hr />
      <form onSubmit={submitFormHandler}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Titre :{" "}
          </label>
          <input
            type="text"
            className="form-control"
            required
            ref={titleRef}
            defaultValue={project?.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description :{" "}
          </label>
          <textarea
            name="description"
            className="form-control"
            id="description"
            cols="30"
            rows="10"
            required
            ref={descriptionRef}
            defaultValue={project?.description}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="dateStart" className="form-label">
            Date de début :{" "}
          </label>
          <input
            type="date"
            className="form-control"
            required
            ref={dateStartRef}
            defaultValue={project?.dateStart}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dateEnd" className="form-label">
            Date de fin :{" "}
          </label>
          <input
            type="date"
            className="form-control"
            required
            ref={dateEndRef}
            defaultValue={project?.dateEnd}
          />
        </div>
        <select
          name="status"
          id="status"
          required
          ref={statusRef}
          defaultValue={project?.status}
        >
          <option value="non-debute">Non débuté</option>
          <option value="en-cours">En cours</option>
          <option value="en-attente">En attente</option>
          <option value="termine">Terminé</option>
        </select>
        <div className="text-end">
          <button
            className={`btn btn-${mode === "add" ? "success" : "warning"}`}
          >
            <i
              className={`bi bi-${
                mode === "edit" ? "pencil-square" : "plus-circle"
              }`}
            ></i>
            {mode}
          </button>
        </div>
      </form>
    </>
  );
};

export default ProjectForm;
