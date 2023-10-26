import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ProjectList from "./components/project/ProjectList";
import ProjectDetails from "./components/project/ProjectDetails";
import ProjectForm from "./components/project/ProjectForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <ProjectList /> },
      { path: "/:id", element: <ProjectDetails /> },
      { path: "/add", element: <ProjectForm /> },
      { path: "/edit/:id", element: <ProjectForm /> },
    ],
  },
]);

export default router;
