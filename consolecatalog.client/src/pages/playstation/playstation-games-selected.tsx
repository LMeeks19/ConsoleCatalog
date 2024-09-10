import { useRecoilValue } from "recoil";
import { sidebarState } from "../../functions/state";
import Playstation from "./playstation";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getTitleById } from "../../functions/server/external/playstation-calls";
import { COVER_BIG_URL, SCREENSHOT_MED_URL } from "../../functions/utils";
import "react-multi-carousel/lib/styles.css";
import "../../style/playstation/playstation-games-selected.css";
import { FormatNumberDate, getRatingColour } from "../../functions/methods";
import { BeatLoader } from "react-spinners";
import { Game } from "../../functions/interfaces";
import Conditional from "../../components/site/if-then-else";

function PlaystationGamesSelected() {
  const [selectedGame, setSelectedGame] = useState<Game>({} as Game);
  const isSidebarActive = useRecoilValue(sidebarState);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const naviagte = useNavigate();

  useEffect(() => {
    async function fetchSelectedGame() {
      setIsLoading(true);
      const game = await getTitleById(location.state.gameId);
      setSelectedGame(game[0]);
      setIsLoading(false);
    }
    fetchSelectedGame();
  }, []);

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
      <div
        className={`content ${Conditional({
          Condition: isSidebarActive,
          If: "disabled",
        })}`}
      >
        <Conditional
          Condition={isLoading}
          If={
            <div className="loader">
              <BeatLoader speedMultiplier={0.5} color="white" size={20} />
            </div>
          }
          Else={
            <div className="game">
              <div className="cover-container">
                <Conditional
                  Condition={selectedGame.cover !== undefined}
                  If={
                    <img
                      src={`${COVER_BIG_URL}/${selectedGame.cover?.image_id}.jpg`}
                    ></img>
                  }
                  Else={<i className="fa-regular fa-image fa-2xl blank"></i>}
                />
              </div>
              <div className="info-container">
                <div className="info-text">
                  <div className="info-heading info-name">
                    {selectedGame.name}
                  </div>
                </div>
                <Conditional
                  Condition={selectedGame.storyline !== undefined}
                  If={
                    <div className="info-text">
                      <div className="info-heading">Storyline</div>
                      <div className="info-storyline">
                        {selectedGame.storyline}
                      </div>
                    </div>
                  }
                />

                <Conditional
                  Condition={selectedGame.summary !== undefined}
                  If={
                    <div className="info-text">
                      <div className="info-heading">Summary</div>
                      <div className="info-summary">{selectedGame.summary}</div>
                    </div>
                  }
                />
                <div className="info-small-col">
                  <div className="info-text col-width">
                    <div className="info-heading">Release Date</div>
                    <Conditional
                      Condition={selectedGame.first_release_date !== undefined}
                      If={
                        <div className="info-release-date">
                          {FormatNumberDate(selectedGame.first_release_date)}
                        </div>
                      }
                      Else={<div className="info-release-date">Unknown</div>}
                    />
                  </div>

                  <div className="info-text col-width">
                    <div className="info-heading">Ratings</div>
                    <div className="info-ratings">
                      <Conditional
                        Condition={selectedGame.total_rating !== undefined}
                        If={
                          <div
                            className={`info-rating margin right ${getRatingColour(
                              selectedGame.total_rating
                            )}`}
                          >
                            {Math.round(selectedGame.total_rating)}% |{" "}
                            {selectedGame.total_rating_count} reviews
                          </div>
                        }
                        Else={<div className="info-rating">Unknown</div>}
                      />
                      <Conditional
                        Condition={selectedGame.rating !== undefined}
                        If={
                          <div
                            className={`info-rating margin right ${getRatingColour(
                              selectedGame.rating
                            )}`}
                          >
                            {Math.round(selectedGame.rating)}% |{" "}
                            {selectedGame.rating_count} reviews
                          </div>
                        }
                      />
                      <Conditional
                        Condition={selectedGame.aggregated_rating !== undefined}
                        If={
                          <div
                            className={`info-rating ${getRatingColour(
                              selectedGame.aggregated_rating
                            )}`}
                          >
                            {Math.round(selectedGame.aggregated_rating)}% |{" "}
                            {selectedGame.aggregated_rating_count} reviews
                          </div>
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="info-text">
                  <div className="info-heading">Platforms</div>
                  <Conditional
                    Condition={selectedGame.platforms !== undefined}
                    If={
                      <div className="info-platforms">
                        {selectedGame.platforms?.map((platform) => {
                          return (
                            <div key={platform.id} className="info-platform">
                              {platform.name}
                            </div>
                          );
                        })}
                      </div>
                    }
                    Else={
                      <div className="info-platforms">
                        <div className="info-platform">Unknown</div>
                      </div>
                    }
                  />
                </div>
              </div>
              <div className="tone-container">
                <div className="scroll-container">
                  <div className="tone-text">
                    <div className="tone-heading">Genres</div>
                    <Conditional
                      Condition={selectedGame.genres !== undefined}
                      If={
                        <div className="tone-genres">
                          {selectedGame.genres?.map((genre) => {
                            return (
                              <div key={genre.id} className="tone-genre">
                                {genre.name}
                              </div>
                            );
                          })}
                        </div>
                      }
                      Else={
                        <div className="tone-genres">
                          <div className="tone-genre">Unknown</div>
                        </div>
                      }
                    />
                  </div>
                  <div className="tone-text">
                    <div className="tone-heading">Themes</div>
                    <Conditional
                      Condition={selectedGame.themes !== undefined}
                      If={
                        <div className="tone-themes">
                          {selectedGame.themes?.map((theme) => {
                            return (
                              <div key={theme.id} className="tone-theme">
                                {theme.name}
                              </div>
                            );
                          })}
                        </div>
                      }
                      Else={
                        <div className="tone-themes">
                          <div className="tone-theme">Unknown</div>
                        </div>
                      }
                    />
                  </div>
                  <div className="tone-text">
                    <div className="tone-heading">Age Rating Tags</div>
                    <Conditional
                      Condition={getAgeRatingTags()?.length !== 0}
                      If={
                        <div className="tone-contents">
                          {getAgeRatingTags().map((tag) => {
                            return (
                              <div key={tag} className="tone-content">
                                {tag}
                              </div>
                            );
                          })}
                        </div>
                      }
                      Else={
                        <div className="tone-contents">
                          <div className="tone-content">Unknown</div>
                        </div>
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="screenshot-container">
                <div className="screenshot-text">
                  <div className="screenshot-heading">Screenshots</div>
                </div>
                <Conditional
                  Condition={selectedGame.screenshots !== undefined}
                  If={
                    <div className="scroll-container">
                      {selectedGame.screenshots?.map((screenshot) => {
                        return (
                          <img
                            key={screenshot.id}
                            src={`${SCREENSHOT_MED_URL}/${screenshot?.image_id}.jpg`}
                          />
                        );
                      })}
                    </div>
                  }
                  Else={
                    <div className="blank">
                      <div>No Screenshots</div>
                    </div>
                  }
                />
              </div>
              <div className="addon-container">
                <div className="addon-text">
                  <div className="addon-heading">Add-Ons</div>
                </div>
                <Conditional
                  Condition={
                    selectedGame.expansions === undefined &&
                    selectedGame.dlcs === undefined
                  }
                  If={
                    <div className="blank">
                      <div>No Add-Ons</div>
                    </div>
                  }
                  Else={
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
                            onClick={() =>
                              naviagte(`/playstation/games/${dlc.id}`)
                            }
                            key={dlc.id}
                            src={`${COVER_BIG_URL}/${dlc.cover?.image_id}.jpg`}
                          />
                        );
                      })}
                    </div>
                  }
                />
              </div>
              <div className="bundle-container">
                <div className="bundle-text">
                  <div className="bundle-heading">Included In</div>
                </div>
                <Conditional
                  Condition={selectedGame.bundles === undefined}
                  If={
                    <div className="blank">
                      <div>No Bundles</div>
                    </div>
                  }
                  Else={
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
                  }
                />
              </div>
            </div>
          }
        />
      </div>
    </>
  );
}

export default PlaystationGamesSelected;
