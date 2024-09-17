import { GameSummary } from "../../../functions/interfaces/interfaces";
import {
  FormatNumberDate,
  getFullSearchImageUrl,
  getRatingColour,
  isPSNTitle,
} from "../../../functions/methods";
import "../../../style/playstation/playstation-modal-game-search-result.css";
import { useNavigate } from "react-router-dom";
import Conditional from "../../site/if-then-else";
import { useSetRecoilState } from "recoil";
import { searchModalState } from "../../../functions/state";

function PlaystationModalGameSearchResult(props: GameSearchResultProps) {
  const navigate = useNavigate();
  const setIsSearchModalActive = useSetRecoilState(searchModalState);

  return (
    <div
      className="result"
      key={props.game.id}
      onClick={() => {
        setIsSearchModalActive(false);
        navigate(`/playstation/games/${props.game.id}`, {
          state: {
            gameId: props.game.id,
          },
        });
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
          .filter((platform) => isPSNTitle(platform.abbreviation))
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

export default PlaystationModalGameSearchResult;

interface GameSearchResultProps {
  game: GameSummary;
}
