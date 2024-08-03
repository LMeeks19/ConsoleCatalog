import { createBrowserRouter } from "react-router-dom";
import Login from "./login";
import Background from "./background";
import PlaystationSoloBackground from "./playstation_solo_background";
import XboxSoloBackground from "./xbox_solo_background";
import Forecast from "./forecast";

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
    element: <PlaystationSoloBackground />,
  },
  {
    path: "/:userId/xbox",
    element: <XboxSoloBackground />,
  },
  {
    path: "/forecast",
    element: <Forecast />,
  },
]);
