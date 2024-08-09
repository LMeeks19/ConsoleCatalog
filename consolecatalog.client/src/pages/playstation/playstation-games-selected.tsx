import { useRecoilState, useRecoilValue } from "recoil";
import {
  gameSearchModalState,
  selectedGameState,
  sidebarState,
} from "../../functions/state";
import Playstation from "./playstation";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getTitleById } from "../../functions/external-server";

function PlaystationGamesSelected() {
  const [selectedGame, setSelectedGame] = useRecoilState(selectedGameState);
  const isGameSearchModalActive = useRecoilValue(gameSearchModalState);
  const isSidebarActive = useRecoilValue(sidebarState);
  const location = useLocation();

  useEffect(() => {
    async function fetchSelectedGame() {
        var gameId = location.pathname.replace('/playstation/games/', '');
        const game = await getTitleById(gameId);
        setSelectedGame(game);
    }
    fetchSelectedGame();
  }, []);

  return (
    <>
      <Playstation />
      <div
        className={`content ${
          isSidebarActive || isGameSearchModalActive ? "disabled" : ""
        }`}
      >
        {selectedGame.name}
      </div>
    </>
  );
}

export default PlaystationGamesSelected;
