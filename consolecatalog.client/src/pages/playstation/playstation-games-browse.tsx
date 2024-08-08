import Playstation from "./playstation";
import "../../styling/playstation/playstation-games-browse.css";
import SearchBar from "../../components/searchbar";
import { useEffect, useState } from "react";
import { GameSummary, SelectedDate } from "../../functions/interfaces";
import { useRecoilValue } from "recoil";
import { sidebarState } from "../../functions/state";
import GameCard from "../../components/game-card";
import { getTitles } from "../../components/game-search-modal";
import { AutoTextSize } from "auto-text-size";
import { Month, Year } from "../../functions/enums";

function PlaystationGamesBrowse() {
  const isSidebarActive = useRecoilValue(sidebarState);
  const [upcomingTitles, setUpcomingTitles] = useState<GameSummary[]>(
    [] as GameSummary[]
  );
  const [recentTitles, setRecentTitles] = useState<GameSummary[]>(
    [] as GameSummary[]
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  } as SelectedDate);

  const [isLoadingUpcoming, setIsLoadingUpcoming] = useState<Boolean>(true);
  const [isLoadingRecent, setIsLoadingRecent] = useState<Boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (searchTerm !== "") {
        await getTitles(searchTerm);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

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
    }, 1000);

    return () => clearTimeout(timeout);
  }, [selectedDate]);

  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoadingRecent(true);
    const timeout = setTimeout(async () => {
      const newRecentTitles = await getRecentPSNTitles(recentTitles.length);
      setRecentTitles([...recentTitles, ...newRecentTitles]);
      setIsLoadingRecent(false);
    }, 1000);

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
      <div className={`content ${isSidebarActive ? "disabled" : ""}`}>
        <SearchBar setSearchTerm={setSearchTerm} />

        <div className="section-header">
          <AutoTextSize maxFontSizePx={24} minFontSizePx={16} className="section-header-text">
            UPCOMING RELEASES FOR {Month[selectedDate.month].toUpperCase()} {selectedDate.year.toString().toUpperCase()}
          </AutoTextSize>
          <div className="select-container">
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
            <div className="custom-select month">
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
                      return <option value={value}>{key}</option>;
                    else return <></>;
                  })}
              </select>
            </div>
            <div className="custom-select year">
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
                  return <option value={value}>{value}</option>;
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="cards-container">
          {isLoadingUpcoming ? (
            <p>Loading...</p>
          ) : (
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
          )}
        </div>

        <div className="section-header">
          <AutoTextSize maxFontSizePx={24} minFontSizePx={16}>RECENTLY RELEASED</AutoTextSize>
        </div>

        <div id="recent-games" className="cards-container">
          {isLoadingRecent ? (
            <p>Loading...</p>
          ) : (
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
          )}
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
