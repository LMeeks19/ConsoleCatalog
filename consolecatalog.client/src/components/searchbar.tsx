import { useRecoilValue } from "recoil";
import "../styling/searchbar.css";
import { sidebarState } from "../functions/state";

function SearchBar(props: SearchTermProps) {
  const isSidebarActive = useRecoilValue(sidebarState);

  return (
    <div className={`search-bar ${isSidebarActive ? 'side-bar-open' : ''}`}>
      <div className="search">
        <input
          id="searchTerm"
          name="searchTerm"
          type="text"
          placeholder="Search..."
          onChange={(event) => props.setSearchTerm(event.target.value)}
        />
        <i className="fa-solid fa-magnifying-glass fa-xl fa-flip-horizontal" />
      </div>
    </div>
  );
}

export default SearchBar;

interface SearchTermProps {
  setSearchTerm: Function;
}
