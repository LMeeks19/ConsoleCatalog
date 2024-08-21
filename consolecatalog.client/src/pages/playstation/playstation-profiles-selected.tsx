import { useEffect, useState } from "react";
import {
  getPSNProfile,
  getPSNProfileTitles,
} from "../../functions/external-server";
import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedPSNProfileState, sidebarState } from "../../functions/state";
import Playstation from "./playstation";
import { BeatLoader } from "react-spinners";
import ProgressBar from "@ramonak/react-progress-bar";
import { getProgressColour } from "../../functions/methods";
import { AutoTextSize } from "auto-text-size";
import "../../styling/playstation/playstation-profiles-selected.css";

function PlaystationProfilesSelected() {
  const isSidebarActive = useRecoilValue(sidebarState);
  const [selectedPSNProfile, setSelectedPSNProfile] = useRecoilState(
    selectedPSNProfileState
  );
  const [isLoading, setIsLoading] = useState(true);
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
        selectedPSNProfile.trophyTitles.totalItemCount !==
        selectedPSNProfile.trophyTitles.trophyTitles.length
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

  return (
    <>
      <Playstation />
      <div className={`content ${isSidebarActive ? "disabled" : ""}`}>
        <div className="profile-container">
          <div id="trophy-titles" className="trophy-titles">
            {selectedPSNProfile.trophyTitles?.trophyTitles.map(
              (trophyTitle) => {
                return (
                  <div
                    key={trophyTitle.npCommunicationId}
                    className="trophy-title"
                  >
                    <img src={trophyTitle.trophyTitleIconUrl} />
                    <div className="details">
                      <div className="name">
                        <AutoTextSize maxFontSizePx={26}>
                          {trophyTitle.trophyTitleName}
                        </AutoTextSize>
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
                          P: {trophyTitle.earnedTrophies.platinum}/
                          {trophyTitle.definedTrophies.platinum}
                        </div>
                        <div className="gold">
                          G: {trophyTitle.earnedTrophies.gold}/
                          {trophyTitle.definedTrophies.gold}
                        </div>
                        <div className="silver">
                          S: {trophyTitle.earnedTrophies.silver}/
                          {trophyTitle.definedTrophies.silver}
                        </div>
                        <div className="bronze">
                          B: {trophyTitle.earnedTrophies.bronze}/
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
