import { useRecoilState, useRecoilValue } from "recoil";
import { selectedGameState, sidebarState } from "../../functions/state";
import Playstation from "./playstation";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getTitleById } from "../../functions/external-server";
import { COVER_BIG_URL, SCREENSHOT_MED_URL } from "../../functions/utils";
import "react-multi-carousel/lib/styles.css";
import "../../styling/playstation/playstation-games-selected.css";

function PlaystationGamesSelected() {
  const [selectedGame, setSelectedGame] = useRecoilState(selectedGameState);
  const isSidebarActive = useRecoilValue(sidebarState);
  const location = useLocation();
  const naviagte = useNavigate();

  useEffect(() => {
    async function fetchSelectedGame() {
      var gameId = location.pathname.replace("/playstation/games/", "");
      const game = await getTitleById(gameId);
      setSelectedGame(game[0]);
    }
    fetchSelectedGame();
  }, [location.pathname]);

  return (
    <>
      <Playstation />
      <div className={`content ${isSidebarActive ? "disabled" : ""}`}>
        <div className="game">
          <div className="cover-container">
            {selectedGame.cover !== undefined ? (
              <img
                src={`${COVER_BIG_URL}/${selectedGame.cover.image_id}.jpg`}
              ></img>
            ) : (
              <></>
            )}
          </div>
          <div className="info-container"></div>
          <div className="platform-container"></div>
          <div className="screenshot-container">
            <div className="scroll-container">
              {selectedGame.screenshots?.map((screenshot) => {
                return (
                  <img
                    key={screenshot.id}
                    src={`${SCREENSHOT_MED_URL}/${screenshot.image_id}.jpg`}
                  />
                );
              })}
            </div>
          </div>
          <div className="bundle-container">
            <div className="scroll-container">
              {selectedGame.bundles?.map((bundle) => {
                return (
                  <img
                    onClick={() => naviagte(`/playstation/games/${bundle.id}`)}
                    key={bundle.id}
                    src={`${COVER_BIG_URL}/${bundle.cover.image_id}.jpg`}
                  />
                );
              })}
            </div>
          </div>
          <div className="addon-container">
            <div className="scroll-container">
              {selectedGame.expansions?.map((expansion) => {
                return (
                  <img
                    onClick={() =>
                      naviagte(`/playstation/games/${expansion.id}`)
                    }
                    key={expansion.id}
                    src={`${COVER_BIG_URL}/${expansion.cover.image_id}.jpg`}
                  />
                );
              })}
              {selectedGame.dlcs?.map((dlc) => {
                return (
                  <img
                    onClick={() => naviagte(`/playstation/games/${dlc.id}`)}
                    key={dlc.id}
                    src={`${COVER_BIG_URL}/${dlc.cover.image_id}.jpg`}
                  />
                );
              })}
            </div>
          </div>
          <div className="tone-container"></div>
        </div>
      </div>
    </>
  );
}

export default PlaystationGamesSelected;
