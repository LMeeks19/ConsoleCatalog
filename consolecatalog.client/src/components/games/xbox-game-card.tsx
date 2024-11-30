import { GameSummary } from "../../functions/interfaces/interfaces";
import {
  FormatNumberDate,
  getFullCardImageUrl,
  getRatingColour,
  isXBXTitle,
} from "../../functions/methods";
import "../../style/game/game-card.css";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import Conditional from "../site/if-then-else";

function XboxGameCard(props: GameCardProps) {
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
      onClick={() =>
        navigate(`/playstation/games/${props.game.id}`, {
          state: {
            gameId: props.game.id,
          },
        })
      }
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
                {FormatNumberDate(props.game.first_release_date)}
              </div>
            </div>
          </div>
        }
        Else={
          <div className="card-image-container">
            <img
              className="card-image"
              src={getFullCardImageUrl(props.game.cover?.image_id)}
            ></img>
            <div className="card-info-release">
              <div className="date">
                {FormatNumberDate(props.game.first_release_date)}
              </div>
            </div>
          </div>
        }
      />
      <div className="card-info">
        <div className="card-info-title">{props.game.name}</div>

        <div className="card-info-platforms">
          {props.game.platforms
            .filter((platform) => isXBXTitle(platform.abbreviation))
            .sort((a, b) => b.abbreviation.localeCompare(a.abbreviation))
            .map((platform) => {
              return (
                <div className="platform" key={platform.id}>
                  {platform.name}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default XboxGameCard;

interface GameCardProps {
  game: GameSummary;
  blank: boolean;
}
