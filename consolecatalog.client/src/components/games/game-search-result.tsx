import { GameSummary } from "../../functions/interfaces";
import {
  FormatNumberDate,
  getFullSearchImageUrl,
  getRatingColour,
  isPSTitle,
} from "../../functions/methods";
import "../../styling/game/game-search-result.css";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../functions/state";
import Conditional from "../site/if-then-else";

function GameSearchResult(props: GameSearchResultProps) {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  return (
    <div
      className="result"
      key={props.game.id}
      onClick={() => {
        navigate(`${user.id}/playstation/games/${props.game.id}`);
      }}
    >
      <Conditional
        Condition={props.game.cover !== undefined}
        If={<img src={getFullSearchImageUrl(props.game.cover.image_id)}></img>}
        Else={<i className="fa-regular fa-image fa-2xl"></i>}
      />
      <div className="result-info">
        <div className="result-title">{props.game.name}</div>
        <Conditional
          Condition={props.game.first_release_date !== undefined}
          If={
            <div className="result-release">
              <div className="date">
                {FormatNumberDate(props.game.first_release_date)}
              </div>
            </div>
          }
        />
      </div>
      <div className="result-platforms">
        {props.game.platforms
          .filter((platform) => isPSTitle(platform.abbreviation))
          .sort((a, b) => a.abbreviation.localeCompare(b.abbreviation))
          .map((platform) => {
            return (
              <div className="platform" key={platform.id}>
                {platform.abbreviation}
              </div>
            );
          })}
      </div>
      <Conditional
        Condition={props.game.total_rating !== undefined}
        If={
          <div
            className={`result-rating ${getRatingColour(
              Math.round(props.game.total_rating)
            )}`}
          >
            {Math.round(props.game.total_rating)}
          </div>
        }
      />
    </div>
  );
}

export default GameSearchResult;

interface GameSearchResultProps {
  game: GameSummary;
}
