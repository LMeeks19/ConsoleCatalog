import Xbox from "./xbox";
import { useEffect, useState } from "react";
import {
  GameSummariesObject,
  GameSummary,
  SelectedDate,
} from "../../functions/interfaces/interfaces";
import { useRecoilValue } from "recoil";
import { searchModalState, sidebarState } from "../../functions/state";
import { AutoTextSize } from "auto-text-size";
import { Month, Year } from "../../functions/enums";
import GameCardBlankCollection from "../../components/games/game-card-blank";
import "../../style/game/games-browse.css";
import Conditional from "../../components/site/if-then-else";
import XboxGameCard from "../../components/games/xbox-game-card";

function XboxGamesBrowse() {
  const isSidebarActive = useRecoilValue(sidebarState);
  const isSearchModalActive = useRecoilValue(searchModalState);

  const [browseTitles, setBrowseTitles] = useState<GameSummariesObject>(
    {} as GameSummariesObject
  );

  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  } as SelectedDate);

  const [isLoadingUpcoming, setIsLoadingUpcoming] = useState<boolean>(true);
  const [isLoadingRecent, setIsLoadingRecent] = useState<boolean>(true);
  const [isLoadingAcclaimed, setIsLoadingAcclaimed] = useState<boolean>(true);

  const [recentPage, setRecentPage] = useState<number>(1);
  const [acclaimedPage, setAcclaimedPage] = useState<number>(1);

  useEffect(() => {
    async function getBrowseTitles() {
      setIsLoadingUpcoming(true);
      setIsLoadingRecent(true);
      setIsLoadingAcclaimed(true);

      const newBrowseTitles = await getBrowseXBXTitles();
      setBrowseTitles(newBrowseTitles);

      setIsLoadingUpcoming(false);
      setIsLoadingRecent(false);
      setIsLoadingAcclaimed(false);
    }
    getBrowseTitles();
  }, []);

  async function getUpcomingTitles(month: number, year: number) {
    setIsLoadingUpcoming(true);
    setSelectedDate({ month: month, year: year });
    const upcomingTitles = await getUpcomingXBXTitles({
      month: month,
      year: year,
    });
    setBrowseTitles({ ...browseTitles, upcomingTitles: upcomingTitles });
    setIsLoadingUpcoming(false);
  }

  useEffect(() => {
    async function getRecentTitles() {
      if (recentPage > 1) {
        setIsLoadingRecent(true);
        const newRecentTitles = await getRecentXBXTitles(
          browseTitles.recentTitles.length
        );
        setBrowseTitles({
          ...browseTitles,
          recentTitles: [...browseTitles.recentTitles, ...newRecentTitles],
        });
        setIsLoadingRecent(false);
      }
    }
    getRecentTitles();
  }, [recentPage]);

  useEffect(() => {
    async function getAcclaimedTitles() {
      if (acclaimedPage > 1) {
        setIsLoadingAcclaimed(true);
        const newAcclaimedTitles = await getAcclaimedXBXTitles(
          browseTitles.acclaimedTitles.length
        );
        setBrowseTitles({
          ...browseTitles,
          acclaimedTitles: [
            ...browseTitles.acclaimedTitles,
            ...newAcclaimedTitles,
          ],
        });
        setIsLoadingAcclaimed(false);
      }
    }
    getAcclaimedTitles();
  }, [acclaimedPage]);

  useEffect(() => {
    function handleScroll(event: any) {
      const { scrollLeft, clientWidth, scrollWidth } = event.target;

      if (scrollWidth - scrollLeft === clientWidth)
        setRecentPage((oldPage) => oldPage + 1);
    }

    const element = document.getElementById("recent-games");
    element!.addEventListener("scroll", handleScroll);

    return () => {
      element!.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    function handleScroll(event: any) {
      const { scrollLeft, clientWidth, scrollWidth } = event.target;

      if (scrollWidth - scrollLeft === clientWidth)
        setAcclaimedPage((oldPage) => oldPage + 1);
    }

    const element = document.getElementById("acclaimed-games");
    element!.addEventListener("scroll", handleScroll);

    return () => {
      element!.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Xbox />
      <div
        className={`content ${Conditional({
          Condition: isSidebarActive || isSearchModalActive,
          If: "disabled",
        })}`}
      >
        <div className="section-header">
          <div className="text">
            <AutoTextSize maxFontSizePx={28} minFontSizePx={16}>
              UPCOMING RELEASES
            </AutoTextSize>
          </div>
          <div
            className={`select-container ${Conditional({
              Condition: isLoadingUpcoming,
              If: "disabled",
            })}`}
          >
            <button
              onClick={() =>
                getUpcomingTitles(
                  currentDate.getMonth(),
                  currentDate.getFullYear()
                )
              }
            >
              <i className="fa-solid fa-rotate-left"></i>
            </button>
            <div
              className={`custom-select month ${Conditional({
                Condition: isLoadingUpcoming,
                If: "disabled",
              })}`}
            >
              <select
                value={selectedDate.month}
                onChange={(e) =>
                  getUpcomingTitles(Number(e.target.value), selectedDate.year)
                }
              >
                {Object.keys(Month)
                  .filter((v) => isNaN(Number(v)))
                  .map((key, value) => {
                    if (
                      (value >= currentDate.getMonth() &&
                        selectedDate.year === currentDate.getFullYear()) ||
                      selectedDate.year > currentDate.getFullYear()
                    )
                      return (
                        <option key={key} value={value}>
                          {key}
                        </option>
                      );
                  })}
              </select>
            </div>
            <div
              className={`custom-select year ${Conditional({
                Condition: isLoadingUpcoming,
                If: "disabled",
              })}`}
            >
              <select
                value={selectedDate.year}
                onChange={(e) =>
                  getUpcomingTitles(selectedDate.month, Number(e.target.value))
                }
              >
                {Object.values(Year).map((value) => {
                  return (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="cards-container">
          <Conditional
            Condition={isLoadingUpcoming}
            If={<GameCardBlankCollection number={20} />}
            Else={
              <>
                {browseTitles.upcomingTitles?.map((upcomingTitle) => {
                  return (
                    <XboxGameCard
                      key={upcomingTitle.id}
                      game={upcomingTitle}
                      blank={false}
                    />
                  );
                })}
              </>
            }
          />
        </div>

        <div className="section-header">
          <div className="text">
            <AutoTextSize maxFontSizePx={28} minFontSizePx={16}>
              RECENTLY RELEASED
            </AutoTextSize>
          </div>
        </div>

        <div id="recent-games" className="cards-container">
          <Conditional
            Condition={isLoadingRecent}
            If={<GameCardBlankCollection number={20} />}
            Else={
              <>
                {browseTitles.recentTitles?.map((recentTitle) => {
                  return (
                    <XboxGameCard
                      key={recentTitle.id}
                      game={recentTitle}
                      blank={false}
                    />
                  );
                })}
              </>
            }
          />
        </div>

        <div className="section-header">
          <div className="text">
            <AutoTextSize maxFontSizePx={28} minFontSizePx={16}>
              CRITICALLY ACCLAIMED EXCLISIVES
            </AutoTextSize>
          </div>
        </div>

        <div id="acclaimed-games" className="cards-container">
          <Conditional
            Condition={isLoadingAcclaimed}
            If={<GameCardBlankCollection number={20} />}
            Else={
              <>
                {browseTitles.acclaimedTitles?.map((acclaimedTitle) => {
                  return (
                    <XboxGameCard
                      key={acclaimedTitle.id}
                      game={acclaimedTitle}
                      blank={false}
                    />
                  );
                })}
              </>
            }
          />
        </div>
      </div>
    </>
  );
}

export default XboxGamesBrowse;

async function getBrowseXBXTitles(): Promise<GameSummariesObject> {
  const response = await fetch(`http://localhost:3000/xbox/titles/browse`);
  return response.json();
}

async function getUpcomingXBXTitles(
  selectedDate: SelectedDate
): Promise<GameSummary[]> {
  const response = await fetch(
    `http://localhost:3000/xbox/titles/upcoming/${selectedDate.month}/${selectedDate.year}`
  );
  return response.json();
}

async function getRecentXBXTitles(offset: number): Promise<GameSummary[]> {
  const response = await fetch(
    `http://localhost:3000/xbox/titles/recent/${offset}`
  );
  return response.json();
}

async function getAcclaimedXBXTitles(offset: number): Promise<GameSummary[]> {
  const response = await fetch(
    `http://localhost:3000/xbox/titles/acclaimed/${offset}`
  );
  return response.json();
}
