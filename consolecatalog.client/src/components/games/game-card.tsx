import { AutoTextSize } from "auto-text-size";
import { Platforms } from "../../functions/enums";
import { GameSummary } from "../../functions/interfaces";
import { format } from "date-fns";
import { getFullCardImageUrl, getRatingColour } from "../../functions/methods";
import "../../styling/game/game-card.css";

function GameCard(props: GameCardProps) {

  return (
    <div className="card" key={props.game.id}>
      {props.game.rating !== undefined ? (
        <div
          className={`card-rating ${getRatingColour(
            Math.round(props.game.rating)
          )}`}
        >
          {Math.round(props.game.rating)}
        </div>
      ) : (
        <></>
      )}

      {props.game.cover === undefined ? (
        <div className="card-image-container">
          <i className="fa-regular fa-image fa-2xl card-image"></i>
          <div className="card-info-release">
            <div className="date">
              {format(props.game.first_release_date * 1000, "do MMMM yyyy")}
            </div>
          </div>
        </div>
      ) : (
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
      )}
      <div className="card-info">
        <div className="card-info-title">
          <AutoTextSize maxFontSizePx={24}>{props.game.name}</AutoTextSize>
        </div>

        <div className="card-info-platforms">
          {props.game.platforms
            .filter(
              (platform) =>
                platform.abbreviation === Platforms.PS3 ||
                platform.abbreviation === Platforms.PS4 ||
                platform.abbreviation === Platforms.PS5
            )
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
