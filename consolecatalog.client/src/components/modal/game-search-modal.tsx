import { GameSummary } from "../../functions/interfaces";
import { useEffect, useState } from "react";
import GameSearchResult from "../games/game-search-result";
import ModalSearchBar from "./modal-search-bar";
import GameSearchResultBlank from "../games/game-search-result-blank";
import { getTitles } from "../../functions/external-server";
import { BeatLoader } from "react-spinners";
import "../../styling/modal/game-search-modal.css";

function GamesSearchModal() {
  const [games, setGames] = useState<GameSummary[]>([] as GameSummary[]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(async () => {
      if (searchTerm !== "") {
        const games = await getTitles(searchTerm);
        setGames(games);
        setIsLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  function getTextMessage(): JSX.Element {
    if (searchTerm === "") return <div>Begin Typing to Search</div>;
    else if (isLoading) return <BeatLoader color="white" size={15} speedMultiplier={.5} />;
    else if (games.length === 0 && searchTerm !== "")
      return <div>No Games Found</div>;
    return <></>;
  }

  return (
    <>
      <ModalSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="results">
        {isLoading || searchTerm === "" || games.length === 0 ? (
          <GameSearchResultBlank element={getTextMessage()} />
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
