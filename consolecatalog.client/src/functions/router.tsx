import { createBrowserRouter } from "react-router-dom";
import Login from "../components/login";
import Background from "../components/site/background";
import PlaystationHome from "../pages/playstation/playstation-home";
import XboxHome from "../pages/xbox/xbox-home";
import PlaystationGamesBrowse from "../pages/playstation/playstation-games-browse";
import XboxGamesBrowse from "../pages/xbox/xbox-games-browse";
import XboxProfilesBrowse from "../pages/xbox/xbox-profiles-browse";
import PlaystationProfilesBrowse from "../pages/playstation/playstation-profiles-browse";
import PlaystationGamesSelected from "../pages/playstation/playstation-games-selected";
import PlaystationProfilesSelected from "../pages/playstation/playstation-profiles-selected";
import PlaystationProfilesSelectedGameTrophies from "../pages/playstation/playstation-profiles-selected-game-trophies";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/:userId",
    element: <Background />
  },
  {
    path: "/:userId/playstation",
    element: <PlaystationHome />,
  },
  {
    path: "/:userId/playstation/games/browse",
    element: <PlaystationGamesBrowse />,
  },
  {
    path: "/:userId/playstation/games/:id",
    element: <PlaystationGamesSelected />,
  },
  {
    path: "/:userId/playstation/profiles/browse",
    element: <PlaystationProfilesBrowse />,
  },
  {
    path: "/:userId/playstation/profiles/:username",
    element: <PlaystationProfilesSelected />,
  },
  {
    path: "/:userId/playstation/profiles/:username/:gameId/trophies",
    element: <PlaystationProfilesSelectedGameTrophies />,
  },
  {
    path: "/:userId/xbox",
    element: <XboxHome />,
  },
  {
    path: "/:userId/xbox/games/browse",
    element: <XboxGamesBrowse />,
  },
  {
    path: "/:userId/xbox/profiles/browse",
    element: <XboxProfilesBrowse />,
  },
]);
