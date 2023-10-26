import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const ProjectDisplay = (props) => {
  const dispatch = useDispatch();
  const project = props.project;

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

  return (
    <div className="card bg-dark text-light border border-light rounded">
      <div className="card-header d-flex align-items-center">
        <span>{project.title}</span>
      </div>
      <div className="card-body">
        <span className="bg-dark text-light d-flex">
          <b className="me-auto">Statut: </b>
          {displayStatus()}
        </span>
      </div>
      <div className="car-footer ms-auto">
        <Link to={`/${project.id}`} className="btn btn-outline-info">
          <i className="bi bi-info-circle"></i> Détails
        </Link>
      </div>
    </div>
  );
};

export default ProjectDisplay;
