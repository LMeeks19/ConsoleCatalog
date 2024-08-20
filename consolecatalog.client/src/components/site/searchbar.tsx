import { useRecoilState, useRecoilValue } from "recoil";
import { gameSearchModalState, sidebarState } from "../../functions/state";
import "../../styling/site/searchbar.css";

function SearchBar() {
  const isSidebarActive = useRecoilValue(sidebarState);
  const [isGameSearchModalActive, setIsGamesSearchModalActive] =
    useRecoilState(gameSearchModalState);

  return (
    <div className={`search-bar ${isSidebarActive ? "side-bar-open" : ""}`}>
      <div className="search">
        <input
          disabled={isGameSearchModalActive}
          id="searchTerm"
          name="searchTerm"
          type="text"
          placeholder="Search Games..."
          autoComplete="off"
          onClick={() => setIsGamesSearchModalActive(true)}
        />
        <i className="fa-solid fa-magnifying-glass fa-xl fa-flip-horizontal" />
      </div>
    </div>
  );
}

export default SearchBar;
