import express from "express";
import Project from "../models/Project.js";
import { projectDao } from "../app.js";

const projects = express.Router();
projects.use(express.json());

projects.post("/", (req, res) => {
  const { title, description, dateStart, dateEnd, status } = req.body;
  let project = new Project(
    null,
    title,
    description,
    dateStart,
    dateEnd,
    status
  );
  res.status(201).json(projectDao.save(project));
});

projects.get("/", (req, res) => {
  res.json(projectDao.getAll());
});

projects.get("/:projectId", (req, res) => {
  let project = projectDao.findById(req.params.projectId);
  if (project == undefined) {
    res
      .status(404)
      .json({ code: 404, message: "Aucun projet trouvé à cet id" });
  }
  res.json(project);
});

projects.put("/:projectId", (req, res) => {
  const { title, description, dateStart, dateEnd, status } = req.body;
  let project = new Project(
    req.params.projectId,
    title,
    description,
    dateStart,
    dateEnd,
    status
  );
  projectDao.update(project)
    ? res
        .status(200)
        .json({ code: 200, message: "Le projet a été mis à jour avec succès" })
    : res.status(400).json({
        code: 400,
        message: "Problème lors de la mise à jour du projet",
      });
});

projects.delete("/:projectId", (req, res) => {
  projectDao.delete(req.params.projectId);
  res
    .status(200)
    .json({ code: 200, message: "Le projet a été supprimé avec succès" });
});

export default projects;
