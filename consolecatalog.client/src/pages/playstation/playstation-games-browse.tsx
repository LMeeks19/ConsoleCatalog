import Playstation from "./playstation";
import "../../styling/playstation/playstation-games-browse.css";
import SearchBar from "../../components/searchbar";
import { useEffect, useState } from "react";
import { Game } from "../../functions/interfaces";
import { Platforms } from "../../functions/enums";
import { AutoTextSize } from "auto-text-size";

function PlaystationGamesBrowse() {
  const [titles, setTitles] = useState<Game[]>([] as Game[]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (searchTerm !== "") {
        const gameTitles = await getTitles(searchTerm);
        setTitles(gameTitles);
        console.log(titles);
      } else setTitles([]);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const BASE_IMAGE_URL = "//images.igdb.com/igdb/image/upload/t_cover_big";

  function getFullImageUrl(imageId: string) {
    return `${BASE_IMAGE_URL}/${imageId}.jpg`;
  }

  function getRatingColour(rating: number): string {
    if (rating > 90) return "amazing";
    else if (rating > 70) return "good";
    else if (rating > 50) return "average";
    else if (rating > 30) return "bad" 
    return "awful";
  }

  return (
    <>
      <Playstation />
      <div className="content">
        <SearchBar setSearchTerm={setSearchTerm} />
        {searchTerm === "" ? (
          <div className="default">No Game Searched For</div>
        ) : (
          <div className="cards-container">
            {titles.map((title) => {
              return (
                <div className="card" key={title.id}>
                  {title.aggregated_rating !== undefined ? (
                    <div
                      className={`card-rating ${getRatingColour(
                        Math.round(title.aggregated_rating)
                      )}`}
                    >
                      {Math.round(title.aggregated_rating)}
                    </div>
                  ) : (
                    <></>
                  )}
                  {title.cover === undefined ? (
                    <i className="fa-solid fa-image fa-2xl card-image"></i>
                  ) : (
                    <img
                      className="card-image"
                      src={getFullImageUrl(title.cover.image_id)}
                    ></img>
                  )}
                  <div className="card-info">
                    <div className="card-info-title">
                      <AutoTextSize maxFontSizePx={24}>
                        {title.name}
                      </AutoTextSize>
                    </div>
                    <div className="card-info-platforms">
                      {title.platforms
                        .filter(
                          (platform) =>
                            platform.abbreviation === Platforms.PS3 ||
                            platform.abbreviation === Platforms.PS4 ||
                            platform.abbreviation === Platforms.PS5
                        )
                        .sort((a, b) =>
                          b.abbreviation.localeCompare(a.abbreviation)
                        )
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
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default PlaystationGamesBrowse;

async function getTitles(searchTerm: string): Promise<Game[]> {
  const response = await fetch(`http://localhost:3000/titles/${searchTerm}`);
  return response.json();
}
