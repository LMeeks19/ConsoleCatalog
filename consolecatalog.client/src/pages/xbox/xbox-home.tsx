import { useRecoilValue } from "recoil";
import Xbox from "./xbox";
import { sidebarState } from "../../functions/state";
import Conditional from "../../components/site/if-then-else";

function XboxHome() {
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
        Xbox Home
      </div>
    </>
  );
}

export default XboxHome;
