import { useRecoilValue } from "recoil";
import Conditional from "../../components/site/if-then-else";
import { sidebarState } from "../../functions/state";
import Xbox from "./xbox";
import "../../style/xbox/xbox-profiles-selected.css";

function XboxProfilesSelected() {
  const isSidebarActive = useRecoilValue(sidebarState);

  return (
    <>
      <Xbox />
      <div
        className={`content ${Conditional({
          Condition: isSidebarActive,
          If: "disabled",
        })}`}
      >
        Xbox Profile Selected
      </div>
    </>
  );
}

export default XboxProfilesSelected;
