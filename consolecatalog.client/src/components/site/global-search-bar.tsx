import { useRecoilState, useRecoilValue } from "recoil";
import { searchModalState, sidebarState } from "../../functions/state";
import "../../style/site/global-search-bar.css";
import Conditional from "./if-then-else";

function GlobalSearchBar() {
  const isSidebarActive = useRecoilValue(sidebarState);
  const [isSearchModalActive, setIsGamesSearchModalActive] =
    useRecoilState(searchModalState);

  return (
    <div
      className={`search-bar ${Conditional({
        Condition: isSidebarActive,
        If: "side-bar-open",
      })}`}
    >
      <div className="search">
        <input
          disabled={isSearchModalActive}
          id="searchTerm"
          name="searchTerm"
          type="text"
          placeholder="Search..."
          autoComplete="off"
          onClick={() => setIsGamesSearchModalActive(true)}
        />
        <i className="fa-solid fa-magnifying-glass fa-xl fa-flip-horizontal" />
      </div>
    </div>
  );
}

export default GlobalSearchBar;
