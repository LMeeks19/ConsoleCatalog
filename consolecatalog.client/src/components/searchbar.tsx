import { useRecoilValue } from "recoil";
import "../styling/searchbar.css";
import { sidebarState } from "../functions/state";

function SearchBar(props: SearchTermProps) {
  const isSidebarActive = useRecoilValue(sidebarState);

  return (
    <div className={`search-bar ${isSidebarActive ? "side-bar-open" : ""}`}>
      <div className="search">
        <input
          disabled={props.disabled}
          id="searchTerm"
          name="searchTerm"
          type="text"
          placeholder="Search..."
          autoComplete="off"
          onChange={(event) => props.setSearchTerm(event.target.value)}
          onClick={() => props.setIsGamesSearchModalActive(true)}
        />
        <i className="fa-solid fa-magnifying-glass fa-xl fa-flip-horizontal" />
      </div>
    </div>
  );
}

export default SearchBar;

interface SearchTermProps {
  setSearchTerm: Function;
  setIsGamesSearchModalActive: Function;
  disabled: boolean;
}
