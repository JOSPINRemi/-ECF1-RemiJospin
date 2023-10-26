import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "./projectSlice";
import { Link } from "react-router-dom";
import ProjectDisplay from "./ProjectDisplay";

const ProjectList = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  return (
    <div className="row my-3">
      <div className="rounded bg-dark text-light p-3">
        <div className="d-flex align-items-center">
          <h3>Projects</h3>
          <Link
            to="/add"
            className="ms-auto btn btn-success"
            onClick={() => dispatch(setFormMode("add"))}
          >
            <i className="bi bi-plus-circle"></i> Add
          </Link>
        </div>
        <hr />
        <div className="row row-cols-1 ">
          {projects.map((project) => (
            <ProjectDisplay key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
