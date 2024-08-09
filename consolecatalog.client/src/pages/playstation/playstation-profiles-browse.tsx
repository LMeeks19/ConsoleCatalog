import { useRecoilValue } from "recoil";
import Playstation from "./playstation";
import { sidebarState } from "../../functions/state";
import SearchBar from "../../components/site/searchbar";

function PlaystationProfilesBrowse() {
  const isSidebarActive = useRecoilValue(sidebarState);

  return (
    <>
      <Playstation />
      <div className={`content ${isSidebarActive ? "disabled" : ""}`}>
        <SearchBar />
      </div>
    </>
  );
}

export default PlaystationProfilesBrowse;
