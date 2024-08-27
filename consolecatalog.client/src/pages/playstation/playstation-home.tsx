import { useRecoilValue } from "recoil";
import Playstation from "./playstation";
import { sidebarState } from "../../functions/state";
import Conditional from "../../components/site/if-then-else";

function PlaystationHome() {
  const isSidebarActive = useRecoilValue(sidebarState);

  return (
    <>
      <Playstation />
      <div className={`content ${Conditional({
              Condition: isSidebarActive,
              If: "disabled",
            })}`}>
        Playstation Home
      </div>
    </>
  );
}

export default PlaystationHome;
