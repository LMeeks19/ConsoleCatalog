import { createBrowserRouter } from "react-router-dom";
import Login from "../components/login";
import Background from "../components/background";
import Playstation from "../components/playstation";
import Xbox from "../components/xbox";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/:userId",
    element: <Background />,
  },
  {
    path: "/:userId/playstation",
    element: <Playstation />,
  },
  {
    path: "/:userId/xbox",
    element: <Xbox />,
  }
]);
