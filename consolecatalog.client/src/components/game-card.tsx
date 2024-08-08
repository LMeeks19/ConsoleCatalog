import { AutoTextSize } from "auto-text-size";
import { Platforms } from "../functions/enums";
import { GameSummary } from "../functions/interfaces";
import { format } from "date-fns";
import "../styling/game-card.css";

function GameCard(props: GameCardProps) {
  const BASE_IMAGE_URL = "//images.igdb.com/igdb/image/upload/t_cover_big";

  function getFullImageUrl(imageId: string) {
    return `${BASE_IMAGE_URL}/${imageId}.jpg`;
  }

  function getRatingColour(rating: number): string {
    if (rating > 90) return "amazing";
    else if (rating > 70) return "good";
    else if (rating > 50) return "average";
    else if (rating > 30) return "bad";
    return "awful";
  }

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
          <i className="fa-solid fa-image fa-2xl card-image"></i>
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
            src={getFullImageUrl(props.game.cover.image_id)}
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
            })}{" "}
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
