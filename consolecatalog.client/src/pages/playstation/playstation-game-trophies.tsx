import { useRecoilValue } from "recoil";
import Playstation from "./playstation";
import { sidebarState } from "../../functions/state";
import Conditional from "../../components/site/if-then-else";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getPSNProfileTrophiesForTitle,
  getPSNTitleTrophies,
} from "../../functions/external-server";
import { TitleTrophies, Trophy } from "../../functions/interfaces";
import "../../styling/playstation/playstation-game-trophies.css";
import {
  getTrophyType,
  getTrophyRarity,
  getTrophyTypeIcon,
  FormatStringDate,
} from "../../functions/methods";
import SearchBar from "../../components/site/search-bar";
import { BeatLoader } from "react-spinners";

function PlaystationGameTrophies() {
  const isSidebarActive = useRecoilValue(sidebarState);
  const location = useLocation();
  const [userEarnedTrophies, setUserEarnedTrophies] = useState<TitleTrophies>(
    {} as TitleTrophies
  );
  const [sortBy, setSortBy] = useState<number>(0);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function mergeTrophyArrays(
    titleTrophies: Trophy[],
    earnedTrophies: Trophy[]
  ): Trophy[] {
    let mergedArray = new Array<Trophy>();

    if (earnedTrophies.length === 0) return titleTrophies;

    mergedArray = earnedTrophies?.map((earnedTrophy) => {
      let titleTrophy = titleTrophies!.find(
        (titleTrophy) => titleTrophy.trophyId === earnedTrophy.trophyId
      );
      return {
        ...titleTrophy!,
        earned: earnedTrophy.earned,
        earnedDateTime: earnedTrophy.earnedDateTime,
        trophyEarnedRate: earnedTrophy.trophyEarnedRate,
        trophyRare: earnedTrophy.trophyRare,
      } as Trophy;
    });

    return mergedArray;
  }

  useEffect(() => {
    async function fetchEarnedTitleTrophies() {
      setIsLoading(true);
      let accountId = location.state?.accountId;
      let titleId = location.state?.titleId;
      let platform = location.state.platform;
      let titleTrophies = await getPSNTitleTrophies(titleId, platform);
      let earnedTrophies = await getPSNProfileTrophiesForTitle(
        accountId,
        titleId,
        platform
      );
      setUserEarnedTrophies({
        ...earnedTrophies,
        trophies: mergeTrophyArrays(
          titleTrophies.trophies,
          earnedTrophies.trophies
        ),
      });
      setIsLoading(false);
    }
    fetchEarnedTitleTrophies();
  }, []);

  function sortedTrophies() {
    let trophies = userEarnedTrophies.trophies?.map((trophy) => {
      return trophy;
    });

    if (sortBy === 0) return trophies;
    if (sortBy === 1)
      return trophies.sort(
        (a, b) => getTrophyType(a.trophyType) - getTrophyType(b.trophyType)
      );
    if (sortBy === 2)
      return trophies.sort(
        (a, b) => Number(a.trophyEarnedRate) - Number(b.trophyEarnedRate)
      );

    if (sortBy === 3)
      return trophies.sort((a, b) => a.trophyName.localeCompare(b.trophyName));

    if (sortBy === 4)
      return trophies.sort((a, b) => Number(b.earned) - Number(a.earned));

    if (sortBy === 5)
      return trophies.sort((a, b) => Number(a.earned) - Number(b.earned));
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
                  <option value={2}>Rarity</option>
                  <option value={3}>Alphabetical</option>
                  <option value={4}>Completed</option>
                  <option value={5}>Uncompleted</option>
                </select>
              </div>
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
                  sortedTrophies()?.filter((trophy) =>
                    trophy.trophyName.includes(searchTerm)
                  ).length === 0
                }
                If={<div className="empty">No Trophies</div>}
                Else={
                  <>
                    {sortedTrophies()
                      ?.filter((trophy) =>
                        trophy.trophyName
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      )
                      .map((trophy) => {
                        return (
                          <div
                            key={trophy.trophyId}
                            className={`trophy ${Conditional({
                              Condition: trophy.earned,
                              If: "earned",
                            })}`}
                            onClick={() =>
                              navigate(`${trophy.trophyId}`, {
                                state: {
                                  trophy: trophy,
                                  titleId: location.state?.titleId,
                                  userId: location.state?.userId,
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
                                    {FormatStringDate(trophy.earnedDateTime)}
                                  </div>
                                  <i
                                    className="fa-regular fa-circle-check earned-icon"
                                    style={{ color: "#049006" }}
                                  ></i>
                                </div>
                              }
                            />
                            <div className="rarity">
                              <div>{getTrophyRarity(trophy.trophyRare)} </div>
                              <div>{trophy.trophyEarnedRate}%</div>
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
