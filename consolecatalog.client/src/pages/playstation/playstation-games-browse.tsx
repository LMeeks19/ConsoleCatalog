import Playstation from "./playstation";
import { useEffect, useState } from "react";
import { GameSummary, SelectedDate } from "../../functions/interfaces/interfaces";
import { useRecoilValue } from "recoil";
import { gameSearchModalState, sidebarState } from "../../functions/state";
import GameCard from "../../components/games/game-card";
import { AutoTextSize } from "auto-text-size";
import { Month, Year } from "../../functions/enums";
import GameCardBlankCollection from "../../components/games/game-card-blank";
import "../../style/playstation/playstation-games-browse.css";
import Conditional from "../../components/site/if-then-else";

function PlaystationGamesBrowse() {
  const isSidebarActive = useRecoilValue(sidebarState);
  const isGameSearchModalActive = useRecoilValue(gameSearchModalState);
  const [upcomingTitles, setUpcomingTitles] = useState<GameSummary[]>(
    [] as GameSummary[]
  );
  const [recentTitles, setRecentTitles] = useState<GameSummary[]>(
    [] as GameSummary[]
  );

  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  } as SelectedDate);

  const [isLoadingUpcoming, setIsLoadingUpcoming] = useState<boolean>(true);
  const [isLoadingRecent, setIsLoadingRecent] = useState<boolean>(true);
  useEffect(() => {
    setIsLoadingUpcoming(true);
    const timeout = setTimeout(async () => {
      if (
        selectedDate.year === currentDate.getFullYear() &&
        selectedDate.month < currentDate.getMonth()
      )
        setSelectedDate({ ...selectedDate, month: currentDate.getMonth() });
      else {
        const upcomingTitles = await getUpcomingPSNTitles(selectedDate);
        setUpcomingTitles(upcomingTitles);
      }
      setIsLoadingUpcoming(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [selectedDate]);

  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoadingRecent(true);
    const timeout = setTimeout(async () => {
      const newRecentTitles = await getRecentPSNTitles(recentTitles.length);
      setRecentTitles([...recentTitles, ...newRecentTitles]);
      setIsLoadingRecent(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [page]);

  useEffect(() => {
    function handleScroll(event: any) {
      const { scrollLeft, clientWidth, scrollWidth } = event.target;

      if (scrollWidth - scrollLeft === clientWidth) {
        setPage((oldPage) => oldPage + 1);
      }
    }

    const element = document.getElementById("recent-games");
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
          Condition: isSidebarActive || isGameSearchModalActive,
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
                setSelectedDate({
                  month: currentDate.getMonth(),
                  year: currentDate.getFullYear(),
                })
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
                  setSelectedDate({
                    ...selectedDate,
                    month: Number(e.target.value),
                  })
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
                  setSelectedDate({
                    ...selectedDate,
                    year: Number(e.target.value),
                  })
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
                {upcomingTitles.map((upcomingTitle) => {
                  return (
                    <GameCard
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
                {recentTitles.map((recentTitle) => {
                  return (
                    <GameCard
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
      </div>
    </>
  );
}

export default PlaystationGamesBrowse;

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
