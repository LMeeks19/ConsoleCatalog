import { RouterProvider } from "react-router-dom";
import { router } from "./functions/router";
import "./App.css";

function App() {

  return (
    <div className="page">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
