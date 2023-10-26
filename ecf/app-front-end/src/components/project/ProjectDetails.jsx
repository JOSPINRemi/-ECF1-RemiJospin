import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteProject, fetchProject, setFormMode } from "./projectSlice";
import { useEffect } from "react";

const ProjectDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const project = useSelector((state) => state.projects.selectedProject);

  const editForm = () => {
    dispatch(setFormMode("edit"));
  };

  useEffect(() => {
    dispatch(fetchProject(id));
  }, []);

  const displayStatus = () => {
    if (project) {
      switch (project.status) {
        case "non-debute":
          return "Non débuté";
          break;
        case "en-cours":
          return "En cours";
          break;
        case "en-attente":
          return "En attente";
          break;
        case "termine":
          return "Terminé";
          break;
      }
    }
  };

  const deleteSelectedProject = () => {
    if (
      confirm(`Êtes-vous sûr de vouloir supprimer le projet ${project.title}`)
    ) {
      dispatch(deleteProject(project.id));
      navigate("/");
    }
  };

  return (
    <div className="col">
      <div className="card bg-dark text-light border border-light rounded">
        <div className="card-header d-flex align-items-center">
          <span>{project?.title}</span>
          <>
            <Link
              to={`/edit/${project?.id}`}
              className="p-2 py-1 btn btn-outline-warning ms-auto"
              onClick={() => editForm()}
            >
              <i className="bi bi-pencil-square"></i>
            </Link>
            <button
              className="p-2 py-1 btn btn-outline-danger ms-2"
              onClick={deleteSelectedProject}
            >
              <i className="bi bi-trash"></i>
            </button>
          </>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item bg-dark text-light d-flex">
              <b className="me-auto">Description: </b>
              {project?.description}
            </li>
            <li className="list-group-item bg-dark text-light d-flex">
              <b className="me-auto">Date de début: </b>
              {new Date(project?.dateStart).toLocaleDateString()}
            </li>
            <li className="list-group-item bg-dark text-light d-flex">
              <b className="me-auto">Date de fin: </b>
              {new Date(project?.dateEnd).toLocaleDateString()}
            </li>
            <li className="list-group-item bg-dark text-light d-flex">
              <b className="me-auto">Statut: </b>
              {displayStatus()}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
