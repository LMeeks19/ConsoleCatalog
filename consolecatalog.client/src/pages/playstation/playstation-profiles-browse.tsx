import { useRecoilValue } from "recoil";
import Playstation from "./playstation";
import { sidebarState } from "../../functions/state";
import GamesSearchBar from "../../components/site/games-searchbar";
import Conditional from "../../components/site/if-then-else";

function PlaystationProfilesBrowse() {
  const isSidebarActive = useRecoilValue(sidebarState);

  return (
    <>
      <Playstation />
      <div className={`content ${Conditional({
              Condition: isSidebarActive,
              If: "disabled",
            })}`}>
        <GamesSearchBar />
      </div>
    </>
  );
}

export default PlaystationProfilesBrowse;
