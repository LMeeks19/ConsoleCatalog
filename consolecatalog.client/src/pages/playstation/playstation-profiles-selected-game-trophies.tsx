import { useRecoilValue } from "recoil";
import Playstation from "./playstation";
import { sidebarState } from "../../functions/state";
import Conditional from "../../components/site/if-then-else";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getPSNProfileTrophiesForTitle,
  getPSNTitleTrophies,
} from "../../functions/external-server";
import { TitleTrophies, Trophy } from "../../functions/interfaces";
import "../../styling/playstation/playstation-profiles-selected-game-trophies.css";
import { TrophyTypeNumber, TrophyTypeString } from "../../functions/enums";
import platinum_icon from "../../images/psn-trophy-platinum.png";
import gold_icon from "../../images/psn-trophy-gold.png";
import silver_icon from "../../images/psn-trophy-silver.png";
import bronze_icon from "../../images/psn-trophy-bronze.png";

function PlaystationProfilesSelectedGameTrophies() {
  const isSidebarActive = useRecoilValue(sidebarState);
  const location = useLocation();
  const [userEarnedTrophies, setUserEarnedTrophies] = useState<TitleTrophies>(
    {} as TitleTrophies
  );
  const [sortBy, setSortBy] = useState<number>(0);

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
        trophyEarnedRate: earnedTrophy.trophyEarnedRate,
        trophyRare: earnedTrophy.trophyRare,
      } as Trophy;
    });

    return mergedArray;
  }

  useEffect(() => {
    async function fetchEarnedTitleTrophies() {
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

  function getTrophyTypeIcon(type: string) {
    if (type === TrophyTypeString.Platinum) return platinum_icon;
    else if (type === TrophyTypeString.Gold) return gold_icon;
    else if (type === TrophyTypeString.Silver) return silver_icon;
    return bronze_icon;
  }

  function getTrophyType(type: string): TrophyTypeNumber {
    if (type === TrophyTypeString.Platinum) return TrophyTypeNumber.Platinum;
    else if (type === TrophyTypeString.Gold) return TrophyTypeNumber.Gold;
    else if (type === TrophyTypeString.Silver) return TrophyTypeNumber.Silver;
    return TrophyTypeNumber.Bronze;
  }

  function getTrophyRarity(rarity: number) {
    if (rarity === 0) return "Ultra Rare";
    else if (rarity === 1) return "Very Rare";
    else if (rarity === 2) return "Rare";
    return "Common";
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
            <div className="select-container">
              <div className="custom-select">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(Number(e.target.value))}
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
          {sortedTrophies()?.map((trophy) => {
            return (
              <div
                key={trophy.trophyId}
                className={`trophy ${Conditional({
                  Condition: trophy.earned,
                  If: "earned",
                })}`}
              >
                <img className="image" src={trophy.trophyIconUrl}></img>
                <div className="details">
                  <div className="name">{trophy.trophyName}</div>
                  <div className="description">{trophy.trophyDetail}</div>
                </div>
                <Conditional
                  Condition={trophy.earned}
                  If={
                    <i
                      className="fa-regular fa-circle-check earned"
                      style={{ color: "#049006" }}
                    ></i>
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
        </div>
      </div>
    </>
  );
}

export default PlaystationProfilesSelectedGameTrophies;
