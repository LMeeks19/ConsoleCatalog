import { createBrowserRouter } from "react-router-dom";
import Login from "../components/login";
import Background from "../components/site/background";
import PlaystationHome from "../pages/playstation/playstation-home";
import XboxHome from "../pages/xbox/xbox-home";
import PlaystationGamesBrowse from "../pages/playstation/playstation-games-browse";
import XboxGamesBrowse from "../pages/xbox/xbox-games-browse";
import XboxProfilesBrowse from "../pages/xbox/xbox-profiles-browse";
import PlaystationProfilesBrowse from "../pages/playstation/playstation-profiles-browse";
import PlaystationProfilesSelected from "../pages/playstation/playstation-profiles-selected";
import PlaystationGameTrophies from "../pages/playstation/playstation-game-trophies";
import PlaystationSelectedTrophy from "../pages/playstation/playstation-selected-trophy";
import PlaystationGameTrophyGroups from "../pages/playstation/playstation-game-trophy-groups";
import XboxProfilesSelected from "../pages/xbox/xbox-profiles-selected";
import XboxGamesSelected from "../pages/xbox/xbox-games-selected";
import PlaystationGamesSelected from "../pages/playstation/playstation-games-selected";
import XboxGameAchievements from "../pages/xbox/xbox-game-achievements";
import XboxSelectedAchievement from "../pages/xbox/xbox-selected-achievement";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Background />
  },
  {
    path: "/playstation",
    element: <PlaystationHome />,
  },
  {
    path: "/playstation/games",
    element: <PlaystationGamesBrowse />,
  },
  {
    path: "/playstation/games/:titleId",
    element: <PlaystationGamesSelected />,
  },
  {
    path: "/playstation/profiles",
    element: <PlaystationProfilesBrowse />,
  },
  {
    path: "/playstation/profiles/:username",
    element: <PlaystationProfilesSelected />,
  },
  {
    path: "/playstation/profiles/:username/titles/:titleId/groups",
    element: <PlaystationGameTrophyGroups />,
  },
  {
    path: "/playstation/profiles/:username/titles/:titleId/groups/:groupId/trophies",
    element: <PlaystationGameTrophies />,
  },
  {
    path: "/playstation/profiles/:username/titles/:titleId/groups/:groupId/trophies/:trophyId",
    element: <PlaystationSelectedTrophy />,
  },
  {
    path: "/xbox",
    element: <XboxHome />,
  },
  {
    path: "/xbox/games",
    element: <XboxGamesBrowse />,
  },
  {
    path: "/xbox/games/:titleId",
    element: <XboxGamesSelected />,
  },
  {
    path: "/xbox/profiles",
    element: <XboxProfilesBrowse />,
  },
  {
    path: "/xbox/profiles/:username",
    element: <XboxProfilesSelected />,
  },
  {
    path: "/xbox/profiles/:username/titles/:titleId/achievements",
    element: <XboxGameAchievements />,
  },
  {
    path: "/xbox/profiles/:username/titles/:titleId/achievements/:achievementId",
    element: <XboxSelectedAchievement />,
  },
]);
