import { useRecoilValue } from "recoil";
import Playstation from "./playstation";
import { sidebarState } from "../../functions/state";
import Conditional from "../../components/site/if-then-else";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../style/playstation/playstation-game-trophies.css";
import {
  getTrophyType,
  getTrophyRarity,
  getTrophyTypeIcon,
  FormatStringDate,
  getProgressColour,
  GetTrophyGroupName,
} from "../../functions/methods";
import SearchBar from "../../components/site/search-bar";
import { BeatLoader } from "react-spinners";
import ProgressBar from "@ramonak/react-progress-bar";
import {
  getProfileTitleTrophies,
  putTitleTrophies,
} from "../../functions/server/internal/playstation-calls";
import { Trophy, TrophyGroup } from "../../functions/interfaces";
import platinum_icon from "../../images/psn-trophy-platinum.png";
import gold_icon from "../../images/psn-trophy-gold.png";
import silver_icon from "../../images/psn-trophy-silver.png";
import bronze_icon from "../../images/psn-trophy-bronze.png";
import { TrophyTypeString } from "../../functions/enums";

function PlaystationGameTrophies() {
  const isSidebarActive = useRecoilValue(sidebarState);
  const location = useLocation();
  const [earnedTrophies, setEarnedTrophies] = useState<Trophy[]>(
    [] as Trophy[]
  );
  const [sortBy, setSortBy] = useState<number>(0);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  let psnProfileId = location.state.psnProfileId;
  let accountId = location.state.accountId;
  let titleId = location.state.titleId;
  let trophyGroup = location.state.trophyGroup as TrophyGroup;
  let platform = location.state.platform;

  useEffect(() => {
    async function fetchEarnedTitleTrophies() {
      setIsLoading(true);
      let titleTrophies = await getProfileTitleTrophies(psnProfileId, {
        accountId: accountId,
        titleId: titleId,
        platform: platform,
        trophyGroupId: trophyGroup.trophyGroupId,
      });
      setEarnedTrophies(titleTrophies);
      setIsLoading(false);
    }
    fetchEarnedTitleTrophies();
  }, []);

  function sortedTrophies(): Trophy[] {
    let trophies = earnedTrophies.map((trophy) => {
      return trophy;
    });

    if (sortBy === 0) return trophies;
    if (sortBy === 1)
      trophies = trophies.sort(
        (a, b) => getTrophyType(a.trophyType) - getTrophyType(b.trophyType)
      );
    if (sortBy === 2)
      trophies = trophies.sort((a, b) =>
        a.trophyName.localeCompare(b.trophyName)
      );

    if (sortBy === 3)
      trophies = trophies.sort((a, b) => Number(b.earned) - Number(a.earned));

    if (sortBy === 4)
      trophies = trophies.sort((a, b) => Number(a.earned) - Number(b.earned));
    return trophies;
  }

  async function updateTrophies() {
    setIsLoading(true);
    let updatedEarnedTrophies = await putTitleTrophies(
      psnProfileId,
      accountId,
      titleId,
      platform,
      trophyGroup.trophyGroupId
    );
    setEarnedTrophies(updatedEarnedTrophies);
    setIsLoading(false);
  }

  const progress = () => {
    let defined_total = 0;
    let earned_total = 0;

    earnedTrophies.forEach((et) => {
      switch (et.trophyType) {
        case TrophyTypeString.Platinum:
          defined_total += 180;
          if (et.earned) earned_total += 180;
          break;
        case TrophyTypeString.Gold:
          defined_total += 90;
          if (et.earned) earned_total += 90;
          break;
        case TrophyTypeString.Silver:
          defined_total += 30;
          if (et.earned) earned_total += 30;
          break;
        case TrophyTypeString.Bronze:
          defined_total += 15;
          if (et.earned) earned_total += 15;
          break;
      }
    });

    return (earned_total / defined_total) * 100;
  };

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
              <div key={trophyGroup.trophyGroupId} className="trophy-group">
                <img
                  className="trophy-group-image"
                  src={trophyGroup.trophyGroupIconUrl}
                />
                <div className="trophy-group-details">
                  <div className="trophy-group-name">
                    <div className="name-group-id">
                      <div>{trophyGroup.trophyGroupName}</div>
                      <div className="group-id">
                        {GetTrophyGroupName(trophyGroup.trophyGroupId)}
                      </div>
                    </div>
                    <Conditional
                      Condition={trophyGroup.lastUpdatedDateTime !== null}
                      If={
                        <div className="date">
                          {`Last Updated: ${FormatStringDate(
                            trophyGroup.lastUpdatedDateTime
                          )}`}
                        </div>
                      }
                    />
                  </div>
                  <div className="trophy-group-progress">
                    <ProgressBar
                      completed={progress()}
                      baseBgColor="#161616"
                      bgColor={getProgressColour(progress())}
                      labelAlignment="outside"
                    />
                  </div>
                  <div className="trophy-group-trophies">
                    <div className="trophy-group-trophies-platinum">
                      <img className="trophies-icon" src={platinum_icon} />
                      <div className="trophies-text">
                        {
                          earnedTrophies.filter(
                            (et) => et.trophyType === TrophyTypeString.Platinum
                          ).length
                        }
                        /{trophyGroup.definedTrophies.platinum}
                      </div>
                    </div>
                    <div className="trophy-group-trophies-gold">
                      <img className="trophies-icon" src={gold_icon} />
                      <div className="trophies-text">
                        {
                          earnedTrophies.filter(
                            (et) => et.trophyType === TrophyTypeString.Gold
                          ).length
                        }
                        /{trophyGroup.definedTrophies.gold}
                      </div>
                    </div>
                    <div className="trophy-group-trophies-silver">
                      <img className="trophies-icon" src={silver_icon} />
                      <div className="trophies-text">
                        {
                          earnedTrophies.filter(
                            (et) => et.trophyType === TrophyTypeString.Silver
                          ).length
                        }
                        /{trophyGroup.definedTrophies.silver}
                      </div>
                    </div>
                    <div className="trophy-group-trophies-bronze">
                      <img className="trophies-icon" src={bronze_icon} />
                      <div className="trophies-text">
                        {
                          earnedTrophies.filter(
                            (et) => et.trophyType === TrophyTypeString.Bronze
                          ).length
                        }
                        /{trophyGroup.definedTrophies.bronze}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="trophies">
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
                        <option value={1}>Type</option>
                        <option value={2}>Alphabetical</option>
                        <option value={3}>Completed</option>
                        <option value={4}>Uncompleted</option>
                      </select>
                    </div>
                    <button
                      className="update-button"
                      onClick={() => updateTrophies()}
                    >
                      Update
                    </button>
                  </div>
                </div>

                <Conditional
                  Condition={
                    sortedTrophies().filter((trophy) =>
                      trophy.trophyName.includes(searchTerm)
                    ).length === 0
                  }
                  If={<div className="empty">No Trophies</div>}
                  Else={
                    <>
                      {sortedTrophies()
                        .filter((trophy) =>
                          trophy.trophyName
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        )
                        .map((trophy) => {
                          return (
                            <div
                              key={trophy.id}
                              className={`trophy ${Conditional({
                                Condition: trophy.earned,
                                If: "earned",
                              })}`}
                              onClick={() =>
                                navigate(`${trophy.trophyId}`, {
                                  state: {
                                    trophy: trophy,
                                    titleId: location.state.titleId,
                                    userId: location.state.userId,
                                  },
                                })
                              }
                            >
                              <img
                                className="image"
                                src={trophy.trophyIconUrl}
                              ></img>
                              <div className="details">
                                <div className="name">{trophy.trophyName}</div>
                                <div className="description">
                                  {trophy.trophyDetail}
                                </div>
                              </div>
                              <Conditional
                                Condition={trophy.earned}
                                If={
                                  <div className="earned">
                                    <div className="earned-text">
                                      <div>Completed:</div>
                                      {FormatStringDate(trophy.earnedDateTime)}
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
                                  !trophy.earned &&
                                  trophy.progress !== null &&
                                  trophy.progress !== undefined
                                }
                                If={
                                  <div className="progress">
                                    <Conditional
                                      Condition={
                                        trophy.progressedDateTime !== null &&
                                        trophy.progressedDateTime !== undefined
                                      }
                                      If={
                                        <div className="progress-text">
                                          <div>Last Progressed:</div>
                                          {FormatStringDate(
                                            trophy.progressedDateTime
                                          )}
                                        </div>
                                      }
                                    />
                                    <div className="progress-value">
                                      <div>
                                        {trophy.progress}/
                                        {trophy.trophyProgressTargetValue}
                                      </div>
                                      <ProgressBar
                                        completed={trophy.progressRate!}
                                        baseBgColor="#161616"
                                        bgColor={getProgressColour(
                                          trophy.progressRate!
                                        )}
                                        labelAlignment="outside"
                                      />
                                    </div>
                                  </div>
                                }
                              />

                              <div className="rarity">
                                <div>{getTrophyRarity(trophy.trophyRare)}</div>
                                <Conditional
                                  Condition={
                                    trophy.trophyEarnedRate !== null &&
                                    trophy.trophyEarnedRate !== undefined
                                  }
                                  If={<div>{trophy.trophyEarnedRate}%</div>}
                                />
                              </div>

                              <img
                                className="type"
                                src={getTrophyTypeIcon(trophy.trophyType)}
                              />
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

export default PlaystationGameTrophies;
