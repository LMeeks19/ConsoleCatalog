import { useRecoilValue } from "recoil";
import Conditional from "../../components/site/if-then-else";
import { sidebarState } from "../../functions/state";
import Xbox from "./xbox";
import "../../style/xbox/xbox-profiles-selected.css";
import { useEffect, useState } from "react";
import { XBXProfile, XBXTitle, XBXTitleResponse } from "../../functions/interfaces/xbox/profile-interfaces";
import { useLocation, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import verified_icon from "../../images/verified_icon.png";
import ProgressBar from "@ramonak/react-progress-bar";
import { getProgressColour } from "../../functions/methods";
import $ from "jquery";
import {
  getProfileTitles,
  getXBXProfileByGamertag,
  putXBXProfile,
} from "../../functions/server/internal/xbox-calls";
import {
  getXBXProfileByUsername,
  getXBXProfileTitles,
} from "../../functions/server/external/xbox-calls";

function XboxProfilesSelected() {
  const isSidebarActive = useRecoilValue(sidebarState);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedXBXProfile, setSelectedXBXProfile] = useState<XBXProfile>(
    {} as XBXProfile
  );
  const location = useLocation();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchXBXProfile() {
      setIsLoading(true);
      const profile = await getXBXProfileByGamertag(location.state.username);
      setSelectedXBXProfile(profile!);
      setIsLoading(false);
    }
    fetchXBXProfile();
  }, []);

  useEffect(() => {
    function handleScroll(event: any) {
      const { scrollLeft, clientWidth, scrollWidth } = event.target;

      if (scrollWidth - scrollLeft === clientWidth) {
        setPage((oldPage) => oldPage + 1);
      }
    }

    const element = document.getElementById("titles");
    element!.addEventListener("scroll", handleScroll);

    return () => {
      element!.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (
        selectedXBXProfile.titlesCount !== selectedXBXProfile.titles?.length
      ) {
        const nextProfileTitles = await getProfileTitles(
          selectedXBXProfile.id,
          selectedXBXProfile.titles.length
        );
        setSelectedXBXProfile({
          ...selectedXBXProfile,
          titles: [...selectedXBXProfile.titles, ...nextProfileTitles],
        });
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [page]);

  async function updateXBXProfile() {
    setIsLoading(true);
    let xbxProfile = (
      await getXBXProfileByUsername(selectedXBXProfile.gamertag)
    ).people[0];
    let recentTitles = await getXBXProfileTitles(xbxProfile.xuid);
    const titles = recentTitles.titles.map(rt => {
      return {...rt, achievementSummary: rt.achievement} as XBXTitle
    })
    const profile = await putXBXProfile({
      ...xbxProfile,
      titles: titles,
      titlesCount: recentTitles.titles.length,
    });
    setSelectedXBXProfile(profile);
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
                      <button
                        className="update-button"
                        onClick={() => updateXBXProfile()}
                      >
                        Update
                      </button>
                    </div>
                  </div>

                  <div className="names">
                    <div className="real-name">
                      <div className="heading">Real Name</div>
                      <Conditional
                        Condition={selectedXBXProfile.isIdentityShared}
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
                    <div className="achievement-icon-container">
                      <svg
                        className="achievement-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 2048 2048"
                        aria-hidden="true"
                      >
                        <path d="M1664 256v447q0 57-19 109t-54 94-83 71-104 40q-9 75-41 141t-83 117-116 84-140 45v132h384v256h128v128H384v-128h128v-256h384v-132q-75-11-140-44t-115-85-83-117-42-141q-56-11-104-40t-82-70-54-94-20-110V256h256V128h896v128h256zM640 1664v128h640v-128H640zM384 703q0 30 9 58t26 53 40 42 53 28V384H384v319zm576 577q66 0 124-25t101-68 69-102 26-125V256H640v704q0 66 25 124t68 102 102 69 125 25zm576-896h-128v500q28-10 52-28t40-43 26-52 10-58V384z"></path>
                      </svg>
                    </div>
                    <div className="gamerscore-container">
                      <svg
                        className="gamerscore-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 2048 2048"
                        width="1em"
                        height="1em"
                        aria-hidden="true"
                      >
                        <path d="M1024 0q141 0 272 36t245 103 207 160 160 208 103 245 37 272q0 141-36 272t-104 244-160 207-207 161-245 103-272 37q-141 0-272-36t-244-104-207-160-161-207-103-245-37-272q0-141 36-272t103-245 160-207 208-160T751 37t273-37zm367 956H984v173h192v187q-29 13-60 17t-63 4q-72 0-124-23t-87-64-52-97-17-125q0-69 20-127t60-101 95-67 127-24q71 0 140 14t132 50V572q-65-24-132-33t-137-9q-115 0-212 35T697 666 586 826t-40 213q0 115 35 204t101 150 156 93 205 32q91 0 180-17t168-64V956z"></path>
                      </svg>
                      {selectedXBXProfile.gamerScore}
                    </div>
                  </div>
                </div>
              </div>
            }
          />
          <div id="titles" className="titles">
            <Conditional
              Condition={!isLoading}
              If={selectedXBXProfile.titles?.map((title) => {
                return (
                  <div
                    key={title.titleId}
                    id={title.titleId}
                    className="title"
                    onMouseOver={() => scrollTitleIfOverflowing(title.titleId)}
                    onMouseOut={() => unscrollTitleIfOverflowing(title.titleId)}
                    onClick={() =>
                      navigate(`titles/${title.titleId}/achievements`, {
                        state: {
                          xuid: selectedXBXProfile.xuid,
                          title: title,
                        },
                      })
                    }
                  >
                    <img className="cover" src={title.displayImage} />
                    <div className="details">
                      <div className="name">{title.name}</div>
                      <div className="progress">
                        <ProgressBar
                          completed={title.achievementSummary?.progressPercentage}
                          baseBgColor="#161616"
                          bgColor={getProgressColour(
                            title.achievementSummary?.progressPercentage
                          )}
                          labelAlignment="outside"
                        />
                      </div>
                      <div className="achievements">
                        <div className="achievement-count">
                          <svg
                            className="icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 2048 2048"
                            aria-hidden="true"
                          >
                            <path d="M1664 256v447q0 57-19 109t-54 94-83 71-104 40q-9 75-41 141t-83 117-116 84-140 45v132h384v256h128v128H384v-128h128v-256h384v-132q-75-11-140-44t-115-85-83-117-42-141q-56-11-104-40t-82-70-54-94-20-110V256h256V128h896v128h256zM640 1664v128h640v-128H640zM384 703q0 30 9 58t26 53 40 42 53 28V384H384v319zm576 577q66 0 124-25t101-68 69-102 26-125V256H640v704q0 66 25 124t68 102 102 69 125 25zm576-896h-128v500q28-10 52-28t40-43 26-52 10-58V384z"></path>
                          </svg>
                          <div className="text">
                            {title.achievementSummary?.currentAchievements}
                          </div>
                        </div>
                        <div className="gamerscore-count">
                          <svg
                            className="icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 2048 2048"
                            width="1em"
                            height="1em"
                            aria-hidden="true"
                          >
                            <path d="M1024 0q141 0 272 36t245 103 207 160 160 208 103 245 37 272q0 141-36 272t-104 244-160 207-207 161-245 103-272 37q-141 0-272-36t-244-104-207-160-161-207-103-245-37-272q0-141 36-272t103-245 160-207 208-160T751 37t273-37zm367 956H984v173h192v187q-29 13-60 17t-63 4q-72 0-124-23t-87-64-52-97-17-125q0-69 20-127t60-101 95-67 127-24q71 0 140 14t132 50V572q-65-24-132-33t-137-9q-115 0-212 35T697 666 586 826t-40 213q0 115 35 204t101 150 156 93 205 32q91 0 180-17t168-64V956z"></path>
                          </svg>
                          <div className="text">
                            {title.achievementSummary?.currentGamerscore}/
                            {title.achievementSummary?.totalGamerscore}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default XboxProfilesSelected;
