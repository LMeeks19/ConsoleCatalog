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
} from "../../functions/methods";
import SearchBar from "../../components/site/search-bar";
import { BeatLoader } from "react-spinners";
import ProgressBar from "@ramonak/react-progress-bar";
import {
  getProfileTitleTrophies,
  putTitleTrophies,
} from "../../functions/server/internal/playstation-calls";
import { Trophy } from "../../functions/interfaces";

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
  let trophyGroupId = location.state.trophyGroupId;
  let platform = location.state.platform;

  useEffect(() => {
    async function fetchEarnedTitleTrophies() {
      setIsLoading(true);
      let titleTrophies = await getProfileTitleTrophies(psnProfileId, {
        accountId: accountId,
        titleId: titleId,
        platform: platform,
        trophyGroupId: trophyGroupId,
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
      trophyGroupId
    );
    setEarnedTrophies(updatedEarnedTrophies);
    setIsLoading(false);
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
        <div className="trophies">
          <div className="title">
            <div className="name">{location.state.titleName} Trophies</div>
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
              <button className="update-button" onClick={() => updateTrophies()}>Update</button>
            </div>
          </div>
          <Conditional
            Condition={isLoading}
            If={
              <div className="loader">
                <BeatLoader speedMultiplier={0.5} color="white" size={20} />
              </div>
            }
            Else={
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
            }
          />
        </div>
      </div>
    </>
  );
}

export default PlaystationGameTrophies;
