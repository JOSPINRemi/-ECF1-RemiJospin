import express from "express";
import projects from "./routes/projects.js";
import ProjectDao from "./dao/ProjectDao.js";
import cors from "cors";

const port = 3000;
const app = express();

export const projectDao = new ProjectDao();

app.use(express.json());
app.use(cors());
app.use("/projects", projects);

app.listen(port, () => {
  projectDao.readFile();
  console.log(`http://127.0.0.1:${port}`);
});
