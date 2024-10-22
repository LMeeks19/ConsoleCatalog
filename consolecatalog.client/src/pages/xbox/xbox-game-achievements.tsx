import { BeatLoader } from "react-spinners";
import Conditional from "../../components/site/if-then-else";
import { useRecoilValue } from "recoil";
import { sidebarState } from "../../functions/state";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../../components/site/search-bar";
import {
  Achievement,
  AchievementResponse,
  XBXTitle,
} from "../../functions/interfaces/xbox/profile-interfaces";
import { XBXAchievementState } from "../../functions/enums";
import { FormatStringDate, getProgressColour } from "../../functions/methods";
import ProgressBar from "@ramonak/react-progress-bar";
import { getXBXProfileTitleAchievements } from "../../functions/server/external/xbox-calls";
import "../../style/xbox/xbox-game-achievements.css";
import Xbox from "./xbox";

function XboxGameAchievements() {
  const isSidebarActive = useRecoilValue(sidebarState);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const location = useLocation();
  const [sortBy, setSortBy] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [titleAchievements, setTitleAchievements] = useState<Achievement[]>(
    [] as Achievement[]
  );

  let xuid = location.state.xuid;
  let title = location.state.title as XBXTitle;

  useEffect(() => {
    async function fetchTitleAchievements() {
      setIsLoading(true);
      let achievements_response_object = await getXBXProfileTitleAchievements(
        xuid,
        title.titleId
      );
      setTitleAchievements(
        formatAchievementsResponse(achievements_response_object.achievements)
      );
      setIsLoading(false);
    }
    fetchTitleAchievements();
  }, []);

  function formatAchievementsResponse(
    achievements_response: AchievementResponse[]
  ): Achievement[] {
    let achievements = [] as Achievement[];

    achievements_response.forEach((achievement_response) => {
      achievements.push({
        id: achievement_response.id,
        name: achievement_response.name,
        titleAssociations: achievement_response.titleAssociations[0],
        progressState: achievement_response.progressState,
        progression: {
          id: achievement_response.progression.id,
          requirements: achievement_response.progression.requirements[0],
          timeUnlocked: achievement_response.progression.timeUnlocked,
        },
        mediaAssets: achievement_response.mediaAssets[0],
        description: achievement_response.description,
        rewards: achievement_response.rewards[0],
        rarity: achievement_response.rarity,
      });
    });

    return achievements;
  }

  const completedOrder = [
    XBXAchievementState.Achieved,
    XBXAchievementState.InProgress,
    XBXAchievementState.NotStarted,
  ];
  const uncompletedOrder = [
    XBXAchievementState.InProgress,
    XBXAchievementState.NotStarted,
    XBXAchievementState.Achieved,
  ];

  function sortedAchievements(): Achievement[] {
    let achievements = titleAchievements.map((achievement) => {
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
          completedOrder.indexOf(a.progressState as XBXAchievementState) -
          completedOrder.indexOf(b.progressState as XBXAchievementState)
      );

    if (sortBy === 4)
      achievements = achievements.sort(
        (a, b) =>
          uncompletedOrder.indexOf(a.progressState as XBXAchievementState) -
          uncompletedOrder.indexOf(b.progressState as XBXAchievementState)
      );
    return achievements;
  }

  return (
    <>
      <Xbox />
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
              <div className="xbx-game">
                <img className="game-image" src={title.displayImage} />
                <div className="game-details">
                  <div className="game-name">{title.name}</div>
                  <div className="game-progress">
                    <ProgressBar
                      completed={title.achievement.progressPercentage}
                      height="30px"
                      labelSize="20px"
                      baseBgColor="#161616"
                      bgColor={getProgressColour(
                        title.achievement.progressPercentage
                      )}
                      labelAlignment="outside"
                    />
                  </div>
                  <div className="game-achievements">
                    <div className="achievement-count">
                      <svg
                        className="icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 2048 2048"
                        width="1em"
                        height="1em"
                        aria-hidden="true"
                      >
                        <path d="M1664 256v447q0 57-19 109t-54 94-83 71-104 40q-9 75-41 141t-83 117-116 84-140 45v132h384v256h128v128H384v-128h128v-256h384v-132q-75-11-140-44t-115-85-83-117-42-141q-56-11-104-40t-82-70-54-94-20-110V256h256V128h896v128h256zM640 1664v128h640v-128H640zM384 703q0 30 9 58t26 53 40 42 53 28V384H384v319zm576 577q66 0 124-25t101-68 69-102 26-125V256H640v704q0 66 25 124t68 102 102 69 125 25zm576-896h-128v500q28-10 52-28t40-43 26-52 10-58V384z"></path>
                      </svg>
                      <div className="text">
                        {title.achievement.currentAchievements}/
                        {titleAchievements.length}
                      </div>
                    </div>
                    <div className="gamerscore-count">
                      <svg
                        className="icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 2048 2048"
                        width="1em"
                        height="1em"
                        aria-hidden="true"
                      >
                        <path d="M1024 0q141 0 272 36t245 103 207 160 160 208 103 245 37 272q0 141-36 272t-104 244-160 207-207 161-245 103-272 37q-141 0-272-36t-244-104-207-160-161-207-103-245-37-272q0-141 36-272t103-245 160-207 208-160T751 37t273-37zm367 956H984v173h192v187q-29 13-60 17t-63 4q-72 0-124-23t-87-64-52-97-17-125q0-69 20-127t60-101 95-67 127-24q71 0 140 14t132 50V572q-65-24-132-33t-137-9q-115 0-212 35T697 666 586 826t-40 213q0 115 35 204t101 150 156 93 205 32q91 0 180-17t168-64V956z"></path>
                      </svg>
                      <div className="text">
                        {title.achievement.currentGamerscore}/
                        {title.achievement.totalGamerscore}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                      disabled={isLoading}
                    />
                    <div className="custom-select">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(Number(e.target.value))}
                        disabled={isLoading}
                      >
                        <option value={0}>None</option>
                        <option value={1}>Rarest</option>
                        <option value={2}>Alphabetical</option>
                        <option value={3}>Earned</option>
                        <option value={4}>Not Earned</option>
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
                              className={`achievement ${Conditional({
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
                                        {Number(
                                          achievement.progression.requirements
                                            ?.current
                                        )}
                                        /
                                        {Number(
                                          achievement.progression.requirements
                                            ?.target
                                        )}
                                      </div>
                                      <ProgressBar
                                        completed={Number(
                                          achievement.progression.requirements
                                            ?.current
                                        )}
                                        baseBgColor="#161616"
                                        bgColor={getProgressColour(
                                          Number(
                                            achievement.progression.requirements
                                              ?.target
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
                              <div className="value">
                                <svg
                                  className="icon"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 2048 2048"
                                  width="1em"
                                  height="1em"
                                  aria-hidden="true"
                                >
                                  <path d="M1024 0q141 0 272 36t245 103 207 160 160 208 103 245 37 272q0 141-36 272t-104 244-160 207-207 161-245 103-272 37q-141 0-272-36t-244-104-207-160-161-207-103-245-37-272q0-141 36-272t103-245 160-207 208-160T751 37t273-37zm367 956H984v173h192v187q-29 13-60 17t-63 4q-72 0-124-23t-87-64-52-97-17-125q0-69 20-127t60-101 95-67 127-24q71 0 140 14t132 50V572q-65-24-132-33t-137-9q-115 0-212 35T697 666 586 826t-40 213q0 115 35 204t101 150 156 93 205 32q91 0 180-17t168-64V956z"></path>
                                </svg>
                                <div className="text">
                                  {achievement.rewards.value}
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
