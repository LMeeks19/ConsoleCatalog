import { useRecoilValue } from "recoil";
import Xbox from "./xbox";
import { sidebarState } from "../../functions/state";

function XboxGamesBrowse() {
  const isSidebarActive = useRecoilValue(sidebarState);

  return (
    <>
      <Xbox />
      <div className={`content ${isSidebarActive ? "disabled" : ""}`}>
        Xbox Games
      </div>
    </>
  );
}

export default XboxGamesBrowse;
