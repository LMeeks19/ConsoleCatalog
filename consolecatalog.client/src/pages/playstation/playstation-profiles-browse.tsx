import { useRecoilValue } from "recoil";
import Playstation from "./playstation";
import { sidebarState } from "../../functions/state";
import GlobalSearchBar from "../../components/site/global-search-bar";
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
        <GlobalSearchBar />
      </div>
    </>
  );
}

export default PlaystationProfilesBrowse;
