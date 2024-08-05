import { createBrowserRouter } from "react-router-dom";
import Login from "../components/login";
import Background from "../components/background";
import PlaystationHome from "../pages/playstation/playstation-home";
import XboxHome from "../pages/xbox/xbox-home";
import PlaystationGamesBrowse from "../pages/playstation/playstation-games-browse";
import XboxGamesBrowse from "../pages/xbox/xbox-games-browse";
import XboxProfilesBrowse from "../pages/xbox/xbox-profiles-browse";
import PlaystationProfilesBrowse from "../pages/playstation/playstation-profiles-browse";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Background />,
  },
  {
    path: "/playstation",
    element: <PlaystationHome />,
  },
  {
    path: "/playstation/games/browse",
    element: <PlaystationGamesBrowse />
  },
  {
    path: "/playstation/profiles/browse",
    element: <PlaystationProfilesBrowse />
  },
  {
    path: "/xbox",
    element: <XboxHome />,
  },
  {
    path: "/xbox/games/browse",
    element: <XboxGamesBrowse />
  },
  {
    path: "/xbox/profiles/browse",
    element: <XboxProfilesBrowse />
  },
]);
