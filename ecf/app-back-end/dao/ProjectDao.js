import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

class ProjectDao {
  constructor() {
    this.file = resolve("./data/db.json");
    this.projects = [];
  }

  readFile() {
    const file = readFileSync(this.file, { encoding: "utf-8" });
    this.projects = JSON.parse(file);
  }

  writeFile() {
    writeFileSync(this.file, JSON.stringify(this.projects));
  }

  save(project) {
    project.id = Date.now();
    this.projects.push(project);
    this.writeFile();
    return project;
  }

  getAll() {
    return this.projects;
  }

  findById(id) {
    return this.projects.find((p) => p.id == id);
  }

  update(projectUpdate) {
    const project = this.findById(projectUpdate.id);
    if (project == undefined) {
      return false;
    }
    for (const key in project) {
      project[key] = projectUpdate[key];
    }

    this.writeFile();
    return true;
  }

  delete(id) {
    this.projects = this.projects.filter((p) => p.id != id);
    this.writeFile();
  }
}

export default ProjectDao;
