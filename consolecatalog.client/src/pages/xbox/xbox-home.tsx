import { useRecoilValue } from "recoil";
import Xbox from "./xbox";
import { sidebarState } from "../../functions/state";

function XboxHome() {
  const isSidebarActive = useRecoilValue(sidebarState);

  return (
    <>
      <Xbox />
      <div className={`content ${isSidebarActive ? "disabled" : ""}`}>
        Xbox Home
      </div>
    </>
  );
}

export default XboxHome;
