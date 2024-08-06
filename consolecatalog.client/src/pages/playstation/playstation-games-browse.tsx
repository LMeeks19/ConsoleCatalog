import { useRecoilValue } from "recoil";
import Playstation from "./playstation";
import { sidebarState } from "../../functions/state";
import "../../styling/playstation/playstation-games-browse.css";
import SearchBar from "../../components/searchbar";
import { useEffect, useRef, useState } from "react";
import { Game } from "../../functions/interfaces";

function PlaystationGamesBrowse() {
  const isSidebarActive = useRecoilValue(sidebarState);
  const [titles, setTitles] = useState<Game[]>([] as Game[]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (searchTerm !== "") {
        const gameTitles = await getTitles(searchTerm);
        setTitles(gameTitles);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <>
      <Playstation />
      <div className={`content ${isSidebarActive ? "disabled" : ""}`}>
        <SearchBar setSearchTerm={setSearchTerm} />
      </div>
    </>
  );
}

export default PlaystationGamesBrowse;

async function getTitles(searchTerm: string): Promise<Game[]> {
  const response = await fetch(`http://localhost:3000/titles/${searchTerm}`);
  return response.json();
}
