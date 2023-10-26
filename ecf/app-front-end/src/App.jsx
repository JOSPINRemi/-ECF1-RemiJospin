import { Outlet } from "react-router-dom";
import NavBar from "./components/shared/NavBar";

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
