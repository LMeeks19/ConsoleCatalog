import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { sidebarState } from "../../functions/state";
import Playstation from "./playstation";
import { getProgressColour, languagesArray } from "../../functions/methods";
import platinum_icon from "../../images/psn-trophy-platinum.png";
import gold_icon from "../../images/psn-trophy-gold.png";
import silver_icon from "../../images/psn-trophy-silver.png";
import bronze_icon from "../../images/psn-trophy-bronze.png";
import $ from "jquery";
import "../../style/playstation/playstation-profiles-selected.css";
import { AvatarUrl, PSNProfile, TrophyTitle } from "../../functions/interfaces";
import Conditional from "../../components/site/if-then-else";
import ProgressBar from "@ramonak/react-progress-bar";
import CustomProgressBar from "../../components/site/custom-progress-bar";
import ps_plus_icon from "../../images/ps-plus_icon.png";
import verified_icon from "../../images/verified_icon.png";
import {
  getProfileByOnlineId,
  getProfileTitles,
  putProfile,
} from "../../functions/server/internal/playstation-calls";
import {
  getPSNProfileByUsername,
  getPSNProfileTitles,
} from "../../functions/server/external/playstation-calls";
import { BeatLoader } from "react-spinners";

function PlaystationProfilesSelected() {
  const isSidebarActive = useRecoilValue(sidebarState);
  const [selectedPSNProfile, setSelectedPSNProfile] = useState<PSNProfile>(
    {} as PSNProfile
  );
  const [page, setPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPSNProfile() {
      setIsLoading(true);
      let username = location.pathname.substring(59, location.pathname.length);
      const profile = await getProfileByOnlineId(username);
      setSelectedPSNProfile({ ...profile! });
      setIsLoading(false);
    }
    fetchPSNProfile();
  }, []);

  useEffect(() => {
    function handleScroll(event: any) {
      const { scrollLeft, clientWidth, scrollWidth } = event.target;

      if (scrollWidth - scrollLeft === clientWidth) {
        setPage((oldPage) => oldPage + 1);
      }
    }

    const element = document.getElementById("trophy-titles");
    element!.addEventListener("scroll", handleScroll);

    return () => {
      element!.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (
        selectedPSNProfile.trophyTitles?.totalItemCount !==
        selectedPSNProfile.trophyTitles?.trophyTitles.length
      ) {
        const nextProfileTrophyTitles = await getProfileTitles(
          selectedPSNProfile.trophyTitles.id,
          selectedPSNProfile.trophyTitles.trophyTitles.length
        );
        setSelectedPSNProfile({
          ...selectedPSNProfile,
          trophyTitles: {
            ...selectedPSNProfile.trophyTitles,
            trophyTitles: [
              ...selectedPSNProfile.trophyTitles.trophyTitles,
              ...nextProfileTrophyTitles,
            ],
          },
        });
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [page]);

  async function updatePSNProfile() {
    setIsLoading(true);
    let psnProfile = await getPSNProfileByUsername(selectedPSNProfile.onlineId);
    let recentTitles = await getPSNProfileTitles(psnProfile.profile.accountId);
    const profile = await putProfile({
      ...psnProfile.profile,
      trophyTitles: recentTitles,
    });
    setSelectedPSNProfile(profile);
    setIsLoading(false);
  }

  function scrollTitleIfOverflowing(id: string) {
    let element = $(`#${id}`);
    let title = element.find(".name");
    title.stop();
    title.animate({ scrollLeft: 1000 }, 8000, function () {});
  }

  function unscrollTitleIfOverflowing(id: string) {
    let element = $(`#${id}`);
    let title = element.find(".name");
    title.stop();
    title.animate({ scrollLeft: -1000 }, 8000, function () {});
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
        />
        <div className="profile-container">
          <Conditional
            Condition={!isLoading}
            If={
              <div className="details-container">
                <div className="avatar-container">
                  <img
                    className="avatar"
                    src={selectedPSNProfile.avatarUrls?.[0].avatarUrl}
                  ></img>
                </div>
                <div className="info">
                  <div className="username">
                    {selectedPSNProfile.onlineId}
                    <div className="icons">
                      <Conditional
                        Condition={selectedPSNProfile.isOfficiallyVerified}
                        If={<img className="verified" src={verified_icon} />}
                      />
                      <Conditional
                        Condition={selectedPSNProfile.plus > 0}
                        If={<img className="ps-plus-icon" src={ps_plus_icon} />}
                      />
                      <button
                        className="update-button"
                        onClick={() => updatePSNProfile()}
                      >
                        Update
                      </button>
                    </div>
                  </div>

                  <div className="names">
                    <div className="fname">
                      <div className="heading">First Name</div>
                      <Conditional
                        Condition={
                          selectedPSNProfile.personalDetailSharing ===
                            "shared" &&
                          selectedPSNProfile.personalDetail?.firstname !== ""
                        }
                        If={
                          <div className="text">
                            {selectedPSNProfile.personalDetail?.firstname}
                          </div>
                        }
                        Else={<div className="text">N/A</div>}
                      />
                    </div>
                    <div className="lname">
                      <div className="heading">Last Name</div>
                      <Conditional
                        Condition={
                          selectedPSNProfile.personalDetailSharing ===
                            "shared" &&
                          selectedPSNProfile.personalDetail?.lastname !== ""
                        }
                        If={
                          <div className="text">
                            {selectedPSNProfile.personalDetail?.lastname}
                          </div>
                        }
                        Else={<div className="text">N/A</div>}
                      />
                    </div>
                  </div>

                  <div className="about-me">
                    <div className="heading">About Me</div>
                    <Conditional
                      Condition={selectedPSNProfile.aboutMe !== ""}
                      If={
                        <div className="text">{selectedPSNProfile.aboutMe}</div>
                      }
                      Else={<div className="text">N/A</div>}
                    />
                  </div>

                  <div className="langs-used">
                    <div className="heading">Languages Used</div>
                    <Conditional
                      Condition={
                        (selectedPSNProfile.languagesUsed?.length ?? 0) > 0
                      }
                      If={selectedPSNProfile.languagesUsed?.map((lang_used) => {
                        return (
                          <div key={lang_used} className="text lang-used">
                            {
                              languagesArray.find(
                                (entry) => entry.countryCode === lang_used
                              )?.fullName
                            }
                          </div>
                        );
                      })}
                      Else={<div className="text">N/A</div>}
                    />
                  </div>
                </div>
                <div className="progress-container">
                  <div className="progress">
                    <CustomProgressBar
                      range={{ from: 0, to: 100 }}
                      progress={selectedPSNProfile.trophySummary?.progress}
                      text={`Level: ${
                        selectedPSNProfile.trophySummary?.level.toString() ??
                        "0"
                      }`}
                      sx={{
                        strokeColor: "#1e5ddb",
                        bgStrokeColor: "#161616",
                        barWidth: 4,
                        shape: "threequarters",
                        strokeLinecap: "round",
                        bgColor: { value: "#161616", transparency: "0" },
                        miniCircleSize: 5,
                        miniCircleColor: "#1e5ddb",
                        textSize: 12,
                        textColor: "white",
                        valueSize: 20,
                        valueColor: "white",
                      }}
                    />
                  </div>
                  <div className="trophies">
                    <div className="platinum">
                      <img className="icon" src={platinum_icon} />
                      {selectedPSNProfile.trophySummary?.earnedTrophies
                        .platinum ?? 0}
                    </div>
                    <div className="gold">
                      <img className="icon" src={gold_icon} />
                      {selectedPSNProfile.trophySummary?.earnedTrophies.gold ??
                        0}
                    </div>
                    <div className="silver">
                      <img className="icon" src={silver_icon} />
                      {selectedPSNProfile.trophySummary?.earnedTrophies
                        .silver ?? 0}
                    </div>
                    <div className="bronze">
                      <img className="icon" src={bronze_icon} />
                      {selectedPSNProfile.trophySummary?.earnedTrophies
                        .bronze ?? 0}
                    </div>
                  </div>
                </div>
              </div>
            }
          />
          <div id="trophy-titles" className="trophy-titles">
            <Conditional
              Condition={!isLoading}
              If={selectedPSNProfile.trophyTitles?.trophyTitles.map(
                (trophyTitle) => {
                  return (
                    <div
                      key={trophyTitle.npCommunicationId}
                      id={trophyTitle.npCommunicationId}
                      className="trophy-title"
                      onMouseOver={() =>
                        scrollTitleIfOverflowing(trophyTitle.npCommunicationId)
                      }
                      onMouseOut={() =>
                        unscrollTitleIfOverflowing(
                          trophyTitle.npCommunicationId
                        )
                      }
                      onClick={() =>
                        navigate(`${trophyTitle.npCommunicationId}/trophies`, {
                          state: {
                            userId: location.state?.userId,
                            psnProfileId: selectedPSNProfile?.id,
                            accountId: selectedPSNProfile?.accountId,
                            titleId: trophyTitle?.npCommunicationId,
                            titleName: trophyTitle?.trophyTitleName,
                            platform: trophyTitle?.trophyTitlePlatform,
                          },
                        })
                      }
                    >
                      <img
                        className="cover"
                        src={trophyTitle.trophyTitleIconUrl}
                      />
                      <div className="details">
                        <div className="name">
                          {trophyTitle.trophyTitleName}
                        </div>
                        <div className="progress">
                          <ProgressBar
                            completed={trophyTitle.progress}
                            baseBgColor="#161616"
                            bgColor={getProgressColour(trophyTitle.progress)}
                            labelAlignment="outside"
                          />
                        </div>
                        <div className="trophies">
                          <div className="platinum">
                            <img className="icon" src={platinum_icon} />
                            {trophyTitle?.earnedTrophies.platinum ?? 0}/
                            {trophyTitle?.definedTrophies.platinum ?? 0}
                          </div>
                          <div className="gold">
                            <img className="icon" src={gold_icon} />
                            {trophyTitle?.earnedTrophies.gold ?? 0}/
                            {trophyTitle?.definedTrophies.gold ?? 0}
                          </div>
                          <div className="silver">
                            <img className="icon" src={silver_icon} />
                            {trophyTitle?.earnedTrophies.silver ?? 0}/
                            {trophyTitle?.definedTrophies.silver ?? 0}
                          </div>
                          <div className="bronze">
                            <img className="icon" src={bronze_icon} />
                            {trophyTitle?.earnedTrophies.bronze ?? 0}/
                            {trophyTitle?.definedTrophies.bronze ?? 0}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PlaystationProfilesSelected;
