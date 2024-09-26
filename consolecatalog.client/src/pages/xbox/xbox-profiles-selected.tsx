import { useRecoilValue } from "recoil";
import Conditional from "../../components/site/if-then-else";
import { sidebarState } from "../../functions/state";
import Xbox from "./xbox";
import "../../style/xbox/xbox-profiles-selected.css";
import { useEffect, useState } from "react";
import { getXBXProfileByUsername } from "../../functions/server/external/xbox-calls";
import { XBXProfile } from "../../functions/interfaces/xbox/profile-interfaces";
import { useLocation } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import verified_icon from "../../images/verified_icon.png";

function XboxProfilesSelected() {
  const isSidebarActive = useRecoilValue(sidebarState);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedXBXProfile, setSelectedXBXProfile] = useState<XBXProfile>(
    {} as XBXProfile
  );
  const location = useLocation();

  useEffect(() => {
    async function fetchXBXProfile() {
      setIsLoading(true);
      const profile = (await getXBXProfileByUsername(location.state.username))
        .people[0];
      setSelectedXBXProfile(profile);
      setIsLoading(false);
    }
    fetchXBXProfile();
  }, []);

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
        />
        <div className="profile-container">
          <Conditional
            Condition={!isLoading}
            If={
              <div className="details-container">
                <div className="avatar-container">
                  <img
                    className="avatar"
                    src={selectedXBXProfile.displayPicRaw}
                  ></img>
                </div>
                <div className="info">
                  <div className="username">
                    {selectedXBXProfile.gamertag}
                    <div className="icons">
                      <Conditional
                        Condition={selectedXBXProfile.detail?.isVerified}
                        If={<img className="verified" src={verified_icon} />}
                      />
                      <Conditional
                        Condition={selectedXBXProfile.detail?.hasGamePass}
                        If={<img className="ps-plus-icon" />}
                      />
                      <button className="update-button">Update</button>
                    </div>
                  </div>

                  <div className="names">
                    <div className="real-name">
                      <div className="heading">Real Name</div>
                      <Conditional
                        Condition={selectedXBXProfile.realName !== ""}
                        If={
                          <div className="text">
                            {selectedXBXProfile.realName}
                          </div>
                        }
                        Else={<div className="text">N/A</div>}
                      />
                    </div>
                  </div>

                  <div className="about-me">
                    <div className="heading">About Me</div>
                    <Conditional
                      Condition={selectedXBXProfile.detail?.bio !== null}
                      If={
                        <div className="text">
                          {selectedXBXProfile.detail?.bio}
                        </div>
                      }
                      Else={<div className="text">N/A</div>}
                    />
                  </div>
                </div>
                <div className="progress-container">
                  <div className="xb-progress">
                    {selectedXBXProfile.gamerScore}
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </>
  );
}

export default XboxProfilesSelected;
