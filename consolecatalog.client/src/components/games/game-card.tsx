import { GameSummary } from "../../functions/interfaces";
import { format } from "date-fns";
import {
  getFullCardImageUrl,
  getRatingColour,
  isPSTitle,
} from "../../functions/methods";
import "../../styling/game/game-card.css";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../functions/state";
import $ from "jquery";
import Conditional from "../site/if-then-else";

function GameCard(props: GameCardProps) {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  function scrollTitleIfOverflowing(id: string) {
    let element = $(`#${id}`);
    let info = element.find(".card-info");
    let title = info.find(".card-info-title");
    title.stop();
    title.animate({ scrollLeft: 1000 }, 8000, function () {});
  }

  function unscrollTitleIfOverflowing(id: string) {
    let element = $(`#${id}`);
    let info = element.find(".card-info");
    let title = info.find(".card-info-title");
    title.stop();
    title.animate({ scrollLeft: -1000 }, 8000, function () {});
  }

  return (
    <div
      id={props.game.id.toString()}
      className="card"
      key={props.game.id}
      onClick={() => navigate(`/${user.id}/playstation/games/${props.game.id}`)}
      onMouseOver={() => scrollTitleIfOverflowing(props.game.id.toString())}
      onMouseOut={() => unscrollTitleIfOverflowing(props.game.id.toString())}
    >
      <Conditional
        Condition={props.game.total_rating !== undefined}
        If={
          <div
            className={`card-rating ${getRatingColour(
              Math.round(props.game.total_rating)
            )}`}
          >
            {Math.round(props.game.total_rating)}
          </div>
        }
      />
      <Conditional
        Condition={props.game.cover === undefined}
        If={
          <div className="card-image-container">
            <i className="fa-regular fa-image fa-2xl card-image"></i>
            <div className="card-info-release">
              <div className="date">
                {format(props.game.first_release_date * 1000, "do MMMM yyyy")}
              </div>
            </div>
          </div>
        }
        Else={
          <div className="card-image-container">
            <img
              className="card-image"
              src={getFullCardImageUrl(props.game.cover.image_id)}
            ></img>
            <div className="card-info-release">
              <div className="date">
                {format(props.game.first_release_date * 1000, "do MMMM yyyy")}
              </div>
            </div>
          </div>
        }
      />
      <div className="card-info">
        <div className="card-info-title">{props.game.name}</div>

        <div className="card-info-platforms">
          {props.game.platforms
            .filter((platform) => isPSTitle(platform.abbreviation))
            .sort((a, b) => b.abbreviation.localeCompare(a.abbreviation))
            .map((platform) => {
              return (
                <div className="platform" key={platform.id}>
                  {platform.abbreviation}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default GameCard;

interface GameCardProps {
  game: GameSummary;
  blank: boolean;
}
