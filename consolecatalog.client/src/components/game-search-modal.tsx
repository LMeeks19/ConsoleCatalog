import { useRecoilState } from "recoil";
import { GameSummary } from "../functions/interfaces";
import "../styling/search-modal.css";
import { gameSearchModalState } from "../functions/state";
import { useEffect, useState } from "react";

function GamesSearchModal(props: GamesSearchModalProps) {
  const [isGameSearchModalActive, setIsGameSearchModalActive] =
    useRecoilState(gameSearchModalState);
  const [games, setGames] = useState<GameSummary[]>([] as GameSummary[]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (props.searchTerm !== "") {
        let games = await getTitles(props.searchTerm);
        setGames(games);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [props.searchTerm]);

  return (
    <div className="search-modal">
      <div className="search">
        <input
          autoFocus={isGameSearchModalActive}
          value={props.searchTerm}
          onChange={(e) => props.setSearchTerm(e.target.value)}
        />
        <i className="fa-solid fa-magnifying-glass fa-xl fa-flip-horizontal" />
        <div
          className="close"
          onClick={() => setIsGameSearchModalActive(false)}
        >
          <i className="fa-solid fa-xmark fa-2xl fa-flip-horizontal" />
        </div>
      </div>
      <div className="results">
        {games.map((game) => {
          return <div className="result">{game.name}</div>;
        })}
      </div>
    </div>
  );
}

export default GamesSearchModal;

interface GamesSearchModalProps {
  searchTerm: string;
  setSearchTerm: Function;
}

export async function getTitles(searchTerm: string): Promise<GameSummary[]> {
  const response = await fetch(
    `http://localhost:3000/playstation/titles/search/${searchTerm}`
  );
  return response.json();
}
