import { useRecoilState, useRecoilValue } from "recoil";
import { selectedGameState, sidebarState } from "../../functions/state";
import Playstation from "./playstation";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getTitleById } from "../../functions/external-server";
import { COVER_BIG_URL, SCREENSHOT_MED_URL } from "../../functions/utils";
import "react-multi-carousel/lib/styles.css";
import "../../styling/playstation/playstation-games-selected.css";
import { format } from "date-fns";
import { getRatingColour } from "../../functions/methods";
import { BeatLoader } from "react-spinners";

function PlaystationGamesSelected() {
  const [selectedGame, setSelectedGame] = useRecoilState(selectedGameState);
  const isSidebarActive = useRecoilValue(sidebarState);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const naviagte = useNavigate();

  useEffect(() => {
    async function fetchSelectedGame() {
      setIsLoading(true);
      var gameId = location.pathname.replace("/playstation/games/", "");
      const game = await getTitleById(gameId);
      setSelectedGame(game[0]);
      setIsLoading(false);
    }
    fetchSelectedGame();
  }, [location.pathname]);

  function getAgeRatingTags() {
    const unique_tags = new Array<string>();

    selectedGame.age_ratings?.forEach((age_rating) => {
      age_rating.content_descriptions?.forEach((content_description) => {
        if (!unique_tags.includes(content_description.description))
          unique_tags.push(content_description.description);
      });
    });

    return unique_tags;
  }

  return (
    <>
      <Playstation />
      <div className={`content ${isSidebarActive ? "disabled" : ""}`}>
        {isLoading ? (
          <div className="loader">
            <BeatLoader speedMultiplier={0.5} color="white" size={20} />
          </div>
        ) : (
          <div className="game">
            <div className="cover-container">
              {selectedGame.cover !== undefined ? (
                <img
                  src={`${COVER_BIG_URL}/${selectedGame.cover.image_id}.jpg`}
                ></img>
              ) : (
                <i className="fa-regular fa-image fa-2xl blank"></i>
              )}
            </div>
            <div className="info-container">
              <div className="info-text">
                <div className="info-heading info-name">
                  {selectedGame.name}
                </div>
              </div>
              {selectedGame.storyline !== undefined ? (
                <div className="info-text">
                  <div className="info-heading">Storyline</div>
                  <div className="info-storyline">{selectedGame.storyline}</div>
                </div>
              ) : (
                <></>
              )}

              {selectedGame.summary !== undefined ? (
                <div className="info-text">
                  <div className="info-heading">Summary</div>
                  <div className="info-summary">{selectedGame.summary}</div>
                </div>
              ) : (
                <></>
              )}
              <div className="info-small-col">
                <div className="info-text col-width">
                  <div className="info-heading">Release Date</div>
                  {selectedGame.first_release_date !== undefined ? (
                    <div className="info-release-date">
                      {format(
                        selectedGame.first_release_date * 1000,
                        "do MMMM yyyy"
                      )}
                    </div>
                  ) : (
                    <div className="info-release-date">Unknown</div>
                  )}
                </div>

                <div className="info-text col-width">
                  <div className="info-heading">Ratings</div>
                  <div className="info-ratings">
                    {selectedGame.total_rating !== undefined ? (
                      <div
                        className={`info-rating margin right ${getRatingColour(
                          selectedGame.total_rating
                        )}`}
                      >
                        {Math.round(selectedGame.total_rating)}% |{" "}
                        {selectedGame.total_rating_count} reviews
                      </div>
                    ) : (
                      <div className="info-rating">Unknown</div>
                    )}
                    {selectedGame.rating !== undefined ? (
                      <div
                        className={`info-rating margin right ${getRatingColour(
                          selectedGame.rating
                        )}`}
                      >
                        {Math.round(selectedGame.rating)}% |{" "}
                        {selectedGame.rating_count} reviews
                      </div>
                    ) : (
                      <></>
                    )}
                    {selectedGame.aggregated_rating !== undefined ? (
                      <div
                        className={`info-rating ${getRatingColour(
                          selectedGame.aggregated_rating
                        )}`}
                      >
                        {Math.round(selectedGame.aggregated_rating)}% |{" "}
                        {selectedGame.aggregated_rating_count} reviews
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>

              <div className="info-text">
                <div className="info-heading">Platforms</div>
                {selectedGame.platforms !== undefined ? (
                  <div className="info-platforms">
                    {selectedGame.platforms.map((platform) => {
                      return (
                        <div key={platform.id} className="info-platform">
                          {platform.name}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="info-platforms">
                    <div className="info-platform">Unknown</div>
                  </div>
                )}
              </div>
            </div>
            <div className="tone-container">
              <div className="scroll-container">
                <div className="tone-text">
                  <div className="tone-heading">Genres</div>
                  {selectedGame.genres !== undefined ? (
                    <div className="tone-genres">
                      {selectedGame.genres?.map((genre) => {
                        return (
                          <div key={genre.id} className="tone-genre">
                            {genre.name}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="tone-genres">
                      <div className="tone-genre">Unknown</div>
                    </div>
                  )}
                </div>
                <div className="tone-text">
                  <div className="tone-heading">Themes</div>
                  {selectedGame.themes !== undefined ? (
                    <div className="tone-themes">
                      {selectedGame.themes?.map((theme) => {
                        return (
                          <div key={theme.id} className="tone-theme">
                            {theme.name}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="tone-themes">
                      <div className="tone-theme">Unknown</div>
                    </div>
                  )}
                </div>
                <div className="tone-text">
                  <div className="tone-heading">Age Rating Tags</div>
                  {getAgeRatingTags()?.length !== 0 ? (
                    <div className="tone-contents">
                      {getAgeRatingTags().map((tag) => {
                        return (
                          <div key={tag} className="tone-content">
                            {tag}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="tone-contents">
                      <div className="tone-content">Unknown</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="screenshot-container">
              <div className="screenshot-text">
                <div className="screenshot-heading">Screenshots</div>
              </div>
              {selectedGame.screenshots !== undefined ? (
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
              ) : (
                <div className="blank">
                  <div>No Screenshots</div>
                </div>
              )}
            </div>
            <div className="addon-container">
              <div className="addon-text">
                <div className="addon-heading">Add-Ons</div>
              </div>
              {selectedGame.expansions === undefined &&
              selectedGame.dlcs === undefined ? (
                <div className="blank">
                  <div>No Add-Ons</div>
                </div>
              ) : (
                <div className="scroll-container">
                  {selectedGame.expansions?.map((expansion) => {
                    return (
                      <img
                        onClick={() =>
                          naviagte(`/playstation/games/${expansion.id}`)
                        }
                        key={expansion.id}
                        src={`${COVER_BIG_URL}/${expansion.cover?.image_id}.jpg`}
                      />
                    );
                  })}
                  {selectedGame.dlcs?.map((dlc) => {
                    return (
                      <img
                        onClick={() => naviagte(`/playstation/games/${dlc.id}`)}
                        key={dlc.id}
                        src={`${COVER_BIG_URL}/${dlc.cover?.image_id}.jpg`}
                      />
                    );
                  })}
                </div>
              )}
            </div>
            <div className="bundle-container">
              <div className="bundle-text">
                <div className="bundle-heading">Included In</div>
              </div>
              {selectedGame.bundles === undefined ? (
                <div className="blank">
                  <div>No Bundles</div>
                </div>
              ) : (
                <div className="scroll-container">
                  {selectedGame.bundles?.map((bundle) => {
                    return (
                      <img
                        onClick={() =>
                          naviagte(`/playstation/games/${bundle.id}`)
                        }
                        key={bundle.id}
                        src={`${COVER_BIG_URL}/${bundle.cover?.image_id}.jpg`}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PlaystationGamesSelected;
