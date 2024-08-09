import { GameSummary } from "../../functions/interfaces";
import { useEffect, useState } from "react";
import GameSearchResult from "../games/game-search-result";
import ModalSearchBar from "./modal-search-bar";
import GameSearchResultBlankCollection from "../games/game-search-result-blank";
import "../../styling/modal/game-search-modal.css";
import { getTitles } from "../../functions/external-server";

function GamesSearchModal() {
  const [games, setGames] = useState<GameSummary[]>([] as GameSummary[]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(async () => {
      if (searchTerm !== "") {
        let games = await getTitles(searchTerm);
        setGames(games);
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <>
      <ModalSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="results">
        {isLoading ? (
          <GameSearchResultBlankCollection number={4} />
        ) : (
          <>
            {games.map((game) => {
              return <GameSearchResult key={game.id} game={game} />;
            })}
          </>
        )}
      </div>
    </>
  );
}

export default GamesSearchModal;
