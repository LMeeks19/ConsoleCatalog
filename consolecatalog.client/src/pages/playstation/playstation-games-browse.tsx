import Playstation from "./playstation";
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
import PlaystationGameCard from "../../components/games/playstation-game-card";

function PlaystationGamesBrowse() {
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

      const newBrowseTitles = await getBrowsePSNTitles();
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
    const upcomingTitles = await getUpcomingPSNTitles({
      month: month,
      year: year,
    });
    setBrowseTitles({ ...browseTitles, upcomingTitles: upcomingTitles });
    setIsLoadingUpcoming(false);
  }

  useEffect(() => {
    async function getRecentTitles() {
      setIsLoadingRecent(true);
      const newRecentTitles = await getRecentPSNTitles(
        browseTitles.recentTitles.length
      );
      setBrowseTitles({
        ...browseTitles,
        recentTitles: [...browseTitles.recentTitles, ...newRecentTitles],
      });
      setIsLoadingRecent(false);
    }

    getRecentTitles();
  }, [recentPage]);

  useEffect(() => {
    async function getAcclaimedTitles() {
      setIsLoadingAcclaimed(true);
      const newAcclaimedTitles = await getAcclaimedPSNTitles(
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
      <Playstation />
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
                onChange={(e) => {
                  getUpcomingTitles(selectedDate.month, Number(e.target.value));
                }}
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
            If={<GameCardBlankCollection number={10} />}
            Else={browseTitles.upcomingTitles?.map((upcomingTitle) => {
              return (
                <PlaystationGameCard
                  key={upcomingTitle.id}
                  game={upcomingTitle}
                  blank={false}
                />
              );
            })}
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
            If={<GameCardBlankCollection number={10} />}
            Else={browseTitles.recentTitles?.map((recentTitle) => {
              return (
                <PlaystationGameCard
                  key={recentTitle.id}
                  game={recentTitle}
                  blank={false}
                />
              );
            })}
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
            If={<GameCardBlankCollection number={10} />}
            Else={browseTitles.acclaimedTitles?.map((acclaimedTitle) => {
              return (
                <PlaystationGameCard
                  key={acclaimedTitle.id}
                  game={acclaimedTitle}
                  blank={false}
                />
              );
            })}
          />
        </div>
      </div>
    </>
  );
}

export default PlaystationGamesBrowse;

async function getBrowsePSNTitles(): Promise<GameSummariesObject> {
  const response = await fetch(
    `http://localhost:3000/playstation/titles/browse`
  );
  return response.json();
}

async function getUpcomingPSNTitles(
  selectedDate: SelectedDate
): Promise<GameSummary[]> {
  const response = await fetch(
    `http://localhost:3000/playstation/titles/upcoming/${selectedDate.month}/${selectedDate.year}`
  );
  return response.json();
}

async function getRecentPSNTitles(offset: number): Promise<GameSummary[]> {
  const response = await fetch(
    `http://localhost:3000/playstation/titles/recent/${offset}`
  );
  return response.json();
}

async function getAcclaimedPSNTitles(offset: number): Promise<GameSummary[]> {
  const response = await fetch(
    `http://localhost:3000/playstation/titles/acclaimed/${offset}`
  );
  return response.json();
}
