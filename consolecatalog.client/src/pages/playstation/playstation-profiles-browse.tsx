import { useRecoilValue } from "recoil";
import Playstation from "./playstation";
import { sidebarState } from "../../functions/state";
import SearchBar from "../../components/searchbar";
import { useState } from "react";

function PlaystationProfilesBrowse() {
  const isSidebarActive = useRecoilValue(sidebarState);
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <>
      <Playstation />
      <div className={`content ${isSidebarActive ? "disabled" : ""}`}>
        <SearchBar setSearchTerm={setSearchTerm} />
      </div>
    </>
  );
}

export default PlaystationProfilesBrowse;
