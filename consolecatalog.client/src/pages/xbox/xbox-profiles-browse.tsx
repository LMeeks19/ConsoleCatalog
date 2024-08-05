import { useRecoilValue } from "recoil";
import Xbox from "./xbox";
import { sidebarState } from "../../functions/state";

function XboxProfilesBrowse() {
  const isSidebarActive = useRecoilValue(sidebarState);

  return (
    <>
      <Xbox />
      <div className={`content ${isSidebarActive ? "disabled" : ""}`}>Xbox Profiles</div>
    </>
  );
}

export default XboxProfilesBrowse;
