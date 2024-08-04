import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./functions/router";

function App() {

  return (
    <div className="page">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
