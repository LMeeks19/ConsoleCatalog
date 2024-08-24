import { useEffect, useState } from "react";
import {
  getPSNProfile,
  getPSNProfileTitles,
} from "../../functions/external-server";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { sidebarState } from "../../functions/state";
import Playstation from "./playstation";
import { getProgressColour } from "../../functions/methods";
import platinum_icon from "../../images/psn-trophy-platinum.png";
import gold_icon from "../../images/psn-trophy-gold.png";
import silver_icon from "../../images/psn-trophy-silver.png";
import bronze_icon from "../../images/psn-trophy-bronze.png";
import $ from "jquery";
import "../../styling/playstation/playstation-profiles-selected.css";
import { PSNProfile } from "../../functions/interfaces";
import Conditional from "../../components/site/if-then-else";
import ProgressBar from "@ramonak/react-progress-bar";
import CustomProgressBar from "../../components/site/custom-progress-bar";

function PlaystationProfilesSelected() {
  const isSidebarActive = useRecoilValue(sidebarState);
  const [selectedPSNProfile, setSelectedPSNProfile] = useState<PSNProfile>(
    {} as PSNProfile
  );
  const [page, setPage] = useState(1);
  const location = useLocation();

  useEffect(() => {
    async function fetchPSNProfile() {
      let username = location.pathname.substring(59, location.pathname.length);
      const profile = (await getPSNProfile(username)).profile;
      const profileTrophyTitles = await getPSNProfileTitles(
        profile.accountId,
        0
      );
      setSelectedPSNProfile({ ...profile, trophyTitles: profileTrophyTitles });
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
        const nextProfileTrophyTitles = await getPSNProfileTitles(
          selectedPSNProfile.accountId,
          selectedPSNProfile.trophyTitles.nextOffset
        );
        setSelectedPSNProfile({
          ...selectedPSNProfile,
          trophyTitles: {
            ...nextProfileTrophyTitles,
            trophyTitles: [
              ...selectedPSNProfile.trophyTitles.trophyTitles,
              ...nextProfileTrophyTitles.trophyTitles,
            ],
          },
        });
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [page]);

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
        <div className="profile-container">
          <div className="details-container">
            <div className="avatar-container">
              <img
                className="avatar"
                src={selectedPSNProfile.avatarUrls?.[0].avatarUrl}
              ></img>
            </div>
            <div className="info">
              <div className="username">{selectedPSNProfile.onlineId}</div>
              <Conditional
                Condition={selectedPSNProfile.aboutMe !== ""}
                If={
                  <div className="about-me">
                    <div className="heading">About Me</div>
                    <div className="text">{selectedPSNProfile.aboutMe}</div>
                  </div>
                }
              />
            </div>
            <div className="progress">
              <CustomProgressBar
                range={{ from: 0, to: 100 }}
                progress={selectedPSNProfile.trophySummary?.progress}
                text={`Level: ${selectedPSNProfile.trophySummary?.level.toString() ?? "0"}`}
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
          </div>
          <div id="trophy-titles" className="trophy-titles">
            {selectedPSNProfile.trophyTitles?.trophyTitles.map(
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
                      unscrollTitleIfOverflowing(trophyTitle.npCommunicationId)
                    }
                  >
                    <img
                      className="cover"
                      src={trophyTitle.trophyTitleIconUrl}
                    />
                    <div className="details">
                      <div className="name">{trophyTitle.trophyTitleName}</div>
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
                          {trophyTitle.earnedTrophies.platinum}/
                          {trophyTitle.definedTrophies.platinum}
                        </div>
                        <div className="gold">
                          <img className="icon" src={gold_icon} />
                          {trophyTitle.earnedTrophies.gold}/
                          {trophyTitle.definedTrophies.gold}
                        </div>
                        <div className="silver">
                          <img className="icon" src={silver_icon} />
                          {trophyTitle.earnedTrophies.silver}/
                          {trophyTitle.definedTrophies.silver}
                        </div>
                        <div className="bronze">
                          <img className="icon" src={bronze_icon} />
                          {trophyTitle.earnedTrophies.bronze}/
                          {trophyTitle.definedTrophies.bronze}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PlaystationProfilesSelected;
