import { useEffect, useState } from "react";
import "../../styling/playstation/playstation-profiles-selected.css";
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

function PlaystationProfilesSelected() {
  const isSidebarActive = useRecoilValue(sidebarState);
  const [selectedPSNProfile, setSelectedPSNProfile] = useRecoilState(
    selectedPSNProfileState
  );
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    async function fetchPSNProfile() {
      setIsLoading(true);
      let username = location.pathname.substring(59, location.pathname.length);
      const profile = (await getPSNProfile(username)).profile;
      const profileTrophyTitles = await getPSNProfileTitles(
        profile.accountId,
        0
      );
      setSelectedPSNProfile({ ...profile, trophyTitles: profileTrophyTitles });

      //      setSelectedPSNProfile({
      //        ...profile,
      //        trophyTitles: {
      //          ...profileTrophyTitles,
      //          trophyTitles: [
      //            ...selectedPSNProfile.trophyTitles?.trophyTitles ?? [],
      //            ...profileTrophyTitles.trophyTitles,
      //          ],
      //        },
      //      });

      setIsLoading(false);
    }
    fetchPSNProfile();
  }, []);

  return (
    <>
      <Playstation />
      <div className={`content ${isSidebarActive ? "disabled" : ""}`}>
        {isLoading ? (
          <div className="loader">
            <BeatLoader speedMultiplier={0.5} color="white" size={20} />
          </div>
        ) : (
          <div className="trophy-titles">
            {selectedPSNProfile.trophyTitles.trophyTitles.map((trophyTitle) => {
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
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default PlaystationProfilesSelected;
