import { useRecoilValue } from "recoil";
import Conditional from "../../components/site/if-then-else";
import { sidebarState } from "../../functions/state";
import Playstation from "./playstation";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getPSNProfileTrophiesGroupsForTitle,
  getTrophiesGroupsForTitle,
} from "../../functions/server/external/playstation-calls";
import { TrophyGroupObject } from "../../functions/interfaces";
import {
  FormatStringDate,
  getProgressColour,
  GetTrophyGroupName,
  mergeTrophyGroupObjects,
} from "../../functions/methods";
import { BeatLoader } from "react-spinners";
import "../../style/playstation/playstation-game-trophy-groups.css";
import ProgressBar from "@ramonak/react-progress-bar";
import platinum_icon from "../../images/psn-trophy-platinum.png";
import gold_icon from "../../images/psn-trophy-gold.png";
import silver_icon from "../../images/psn-trophy-silver.png";
import bronze_icon from "../../images/psn-trophy-bronze.png";

function PlaystationGameTrophyGroups() {
  const isSidebarActive = useRecoilValue(sidebarState);
  const location = useLocation();
  const navigate = useNavigate();
  const [trophyGroupObject, setTrophyGroupObject] = useState<TrophyGroupObject>(
    {} as TrophyGroupObject
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchTrophyGroups() {
      setIsLoading(true);
      let accountId = location.state.accountId;
      let titleId = location.state.titleId;
      let platform = location.state.platform;
      const definedTrophyGroups = await getTrophiesGroupsForTitle(
        titleId,
        platform
      );
      const earnedTrophyGroups = await getPSNProfileTrophiesGroupsForTitle(
        accountId,
        titleId,
        platform
      );
      let mergedTrophyGroups = mergeTrophyGroupObjects(
        definedTrophyGroups,
        earnedTrophyGroups
      );
      setTrophyGroupObject(mergedTrophyGroups);
      setIsLoading(false);
    }
    fetchTrophyGroups();
  }, []);

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
            <div className="trophy-group-object-container">
              <div className="trophy-group-object">
                <img
                  className="trophy-group-object-image"
                  src={trophyGroupObject.trophyTitleIconUrl}
                />
                <div className="trophy-group-object-details">
                  <div className="trophy-group-object-name">
                    <div>{trophyGroupObject.trophyTitleName}</div>
                    <div className="date-container">
                      <Conditional
                        Condition={
                          trophyGroupObject.lastUpdatedDateTime !== undefined
                        }
                        If={
                          <div className="date">
                            {`Last Updated: ${FormatStringDate(
                              trophyGroupObject.lastUpdatedDateTime
                            )}`}
                          </div>
                        }
                      />
                      <button className="update-button">Update</button>
                    </div>
                  </div>
                  <div className="trophy-group-object-progress">
                    <ProgressBar
                      completed={trophyGroupObject.progress}
                      baseBgColor="#161616"
                      bgColor={getProgressColour(trophyGroupObject.progress)}
                      labelAlignment="outside"
                      height="30px"
                      labelSize="20px"
                    />
                  </div>
                  <div className="trophy-group-object-trophies">
                    <div className="trophy-group-object-trophies-platinum">
                      <img className="trophies-icon" src={platinum_icon} />
                      <div className="trophies-text">
                        {trophyGroupObject.earnedTrophies?.platinum}/
                        {trophyGroupObject.definedTrophies?.platinum}
                      </div>
                    </div>
                    <div className="trophy-group-object-trophies-gold">
                      <img className="trophies-icon" src={gold_icon} />
                      <div className="trophies-text">
                        {trophyGroupObject.earnedTrophies?.gold}/
                        {trophyGroupObject.definedTrophies?.gold}
                      </div>
                    </div>
                    <div className="trophy-group-object-trophies-silver">
                      <img className="trophies-icon" src={silver_icon} />
                      <div className="trophies-text">
                        {trophyGroupObject.earnedTrophies?.silver}/
                        {trophyGroupObject.definedTrophies?.silver}
                      </div>
                    </div>
                    <div className="trophy-group-object-trophies-bronze">
                      <img className="trophies-icon" src={bronze_icon} />
                      <div className="trophies-text">
                        {trophyGroupObject.earnedTrophies?.bronze}/
                        {trophyGroupObject.definedTrophies?.bronze}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="trophy-groups-heading">Trophy Groups</div>
              <div className="trophy-groups">
                {trophyGroupObject.trophyGroups?.map((trophyGroup) => {
                  return (
                    <div
                      key={trophyGroup.trophyGroupId}
                      className="trophy-group"
                      onClick={() =>
                        navigate(`${trophyGroup.trophyGroupId}/trophies`, {
                          state: {
                            userId: location.state?.userId,
                            psnProfileId: location.state?.psnProfileId,
                            accountId: location.state?.accountId,
                            titleId: trophyGroupObject.npCommunicationId,
                            platform: trophyGroupObject.trophyTitlePlatform,
                            trophyGroupId: trophyGroup.trophyGroupId
                          },
                        })
                      }
                    >
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
                            Condition={
                              trophyGroup.lastUpdatedDateTime !== undefined
                            }
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
                            completed={trophyGroup.progress}
                            baseBgColor="#161616"
                            bgColor={getProgressColour(trophyGroup.progress)}
                            labelAlignment="outside"
                          />
                        </div>
                        <div className="trophy-group-trophies">
                          <div className="trophy-group-trophies-platinum">
                            <img
                              className="trophies-icon"
                              src={platinum_icon}
                            />
                            <div className="trophies-text">
                              {trophyGroup.earnedTrophies.platinum}/
                              {trophyGroup.definedTrophies.platinum}
                            </div>
                          </div>
                          <div className="trophy-group-trophies-gold">
                            <img className="trophies-icon" src={gold_icon} />
                            <div className="trophies-text">
                              {trophyGroup.earnedTrophies.gold}/
                              {trophyGroup.definedTrophies.gold}
                            </div>
                          </div>
                          <div className="trophy-group-trophies-silver">
                            <img className="trophies-icon" src={silver_icon} />
                            <div className="trophies-text">
                              {trophyGroup.earnedTrophies.silver}/
                              {trophyGroup.definedTrophies.silver}
                            </div>
                          </div>
                          <div className="trophy-group-trophies-bronze">
                            <img className="trophies-icon" src={bronze_icon} />
                            <div className="trophies-text">
                              {trophyGroup.earnedTrophies.bronze}/
                              {trophyGroup.definedTrophies.bronze}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          }
        />
      </div>
    </>
  );
}

export default PlaystationGameTrophyGroups;
