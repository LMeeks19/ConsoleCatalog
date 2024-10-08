import { BeatLoader } from "react-spinners";
import Conditional from "../../components/site/if-then-else";
import Playstation from "../playstation/playstation";
import { useRecoilValue } from "recoil";
import { sidebarState } from "../../functions/state";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../../components/site/search-bar";
import { Achievement } from "../../functions/interfaces/xbox/profile-interfaces";
import { XBXAchievementState } from "../../functions/enums";
import {
  FormatStringDate,
  getProgressColour,
  getTrophyRarity,
  getTrophyTypeIcon,
} from "../../functions/methods";
import ProgressBar from "@ramonak/react-progress-bar";

function XboxGameAchievements() {
  const isSidebarActive = useRecoilValue(sidebarState);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const location = useLocation();
  const [sortBy, setSortBy] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [earnedAchievements, setEarnedAchievements] = useState<Achievement[]>(
    [] as Achievement[]
  );

  function sortedAchievements(): Achievement[] {
    let achievements = earnedAchievements.map((achievement) => {
      return achievement;
    });

    if (sortBy === 0) return achievements;
    if (sortBy === 1)
      achievements = achievements.sort(
        (a, b) => a.rarity.currentPercentage - b.rarity.currentPercentage
      );
    if (sortBy === 2)
      achievements = achievements.sort((a, b) => a.name.localeCompare(b.name));

    if (sortBy === 3)
      achievements = achievements.sort(
        (a, b) =>
          Number(b.progression.requirements.current) -
          Number(a.progression.requirements.current)
      );

    if (sortBy === 4)
      achievements = achievements.sort(
        (a, b) =>
          Number(a.progression.requirements.current) -
          Number(b.progression.requirements.current)
      );
    return achievements;
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
            <>
              <div className="game"></div>
              <div className="achievements">
                <div className="title">
                  <div className="name">
                    {location.state.titleName} Trophies
                  </div>
                  <div className="actions-container">
                    <SearchBar
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      placeholder="Search Trophies..."
                      width="600"
                      disabled={isLoading}
                    />
                    <div className="custom-select">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(Number(e.target.value))}
                        disabled={isLoading}
                      >
                        <option value={0}>None</option>
                        <option value={1}>Rarity</option>
                        <option value={2}>Alphabetical</option>
                        <option value={3}>Completed</option>
                        <option value={4}>Uncompleted</option>
                      </select>
                    </div>
                    <button className="update-button">Update</button>
                  </div>
                </div>

                <Conditional
                  Condition={
                    sortedAchievements().filter((achievement) =>
                      achievement.name.includes(searchTerm)
                    ).length === 0
                  }
                  If={<div className="empty">No Trophies</div>}
                  Else={
                    <>
                      {sortedAchievements()
                        .filter((achievement) =>
                          achievement.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        )
                        .map((achievement) => {
                          return (
                            <div
                              key={achievement.id}
                              className={`trophy ${Conditional({
                                Condition:
                                  achievement.progressState ===
                                  XBXAchievementState.Achieved,
                                If: "earned",
                              })}`}
                            >
                              <img
                                className="image"
                                src={achievement.mediaAssets.url}
                              ></img>
                              <div className="details">
                                <div className="name">{achievement.name}</div>
                                <div className="description">
                                  {achievement.description}
                                </div>
                              </div>
                              <Conditional
                                Condition={
                                  achievement.progressState ===
                                  XBXAchievementState.Achieved
                                }
                                If={
                                  <div className="earned">
                                    <div className="earned-text">
                                      <div>Completed:</div>
                                      {FormatStringDate(
                                        achievement.progression.timeUnlocked
                                      )}
                                    </div>
                                    <i
                                      className="fa-regular fa-circle-check earned-icon"
                                      style={{ color: "#049006" }}
                                    ></i>
                                  </div>
                                }
                              />
                              <Conditional
                                Condition={
                                  achievement.progressState !==
                                  XBXAchievementState.Achieved
                                }
                                If={
                                  <div className="progress">
                                    <div className="progress-value">
                                      <div>
                                        {
                                          achievement.progression.requirements
                                            .current
                                        }
                                        /
                                        {
                                          achievement.progression.requirements
                                            .target
                                        }
                                      </div>
                                      <ProgressBar
                                        completed={
                                          achievement.progression.requirements
                                            .current!
                                        }
                                        baseBgColor="#161616"
                                        bgColor={getProgressColour(
                                          Number(
                                            achievement.progression.requirements
                                              .current
                                          )!
                                        )}
                                        labelAlignment="outside"
                                      />
                                    </div>
                                  </div>
                                }
                              />

                              <div className="rarity">
                                <div>{achievement.rarity.currentCategory}</div>
                                <div>
                                  {achievement.rarity.currentPercentage}%
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </>
                  }
                />
              </div>
            </>
          }
        />
      </div>
    </>
  );
}

export default XboxGameAchievements;
