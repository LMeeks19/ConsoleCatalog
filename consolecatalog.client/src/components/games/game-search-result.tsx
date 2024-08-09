import { AutoTextSize } from "auto-text-size";
import { Platforms } from "../../functions/enums";
import { GameSummary } from "../../functions/interfaces";
import {
  getFullSearchImageUrl,
  getRatingColour,
} from "../../functions/methods";
import { format } from "date-fns";
import "../../styling/game/game-search-result.css";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { gameSearchModalState } from "../../functions/state";

function GameSearchResult(props: GameSearchResultProps) {
  const setIsGameSearchModalActive = useSetRecoilState(gameSearchModalState);
  const navigate = useNavigate();

  return (
    <div
      className="result"
      key={props.game.id}
      onClick={() => {
        setIsGameSearchModalActive(false);
        navigate(`/playstation/games/${props.game.id}`);
      }}
    >
      {props.game.cover !== undefined ? (
        <img src={getFullSearchImageUrl(props.game.cover.image_id)}></img>
      ) : (
        <i className="fa-regular fa-image fa-2xl"></i>
      )}
      <div className="result-info">
        <div className="result-title">
          <AutoTextSize maxFontSizePx={30}>{props.game.name}</AutoTextSize>
        </div>
        {props.game.first_release_date !== undefined ? (
          <div className="result-release">
            <div className="date">
              {format(props.game.first_release_date * 1000, "do MMMM yyyy")}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="result-platforms">
        {props.game.platforms
          .filter(
            (platform) =>
              platform.abbreviation === Platforms.PS3 ||
              platform.abbreviation === Platforms.PS4 ||
              platform.abbreviation === Platforms.PS5
          )
          .sort((a, b) => a.abbreviation.localeCompare(b.abbreviation))
          .map((platform) => {
            return (
              <div className="platform" key={platform.id}>
                {platform.abbreviation}
              </div>
            );
          })}
      </div>
      {props.game.rating !== undefined ? (
        <div
          className={`result-rating ${getRatingColour(
            Math.round(props.game.rating)
          )}`}
        >
          {Math.round(props.game.rating)}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default GameSearchResult;

interface GameSearchResultProps {
  game: GameSummary;
}
