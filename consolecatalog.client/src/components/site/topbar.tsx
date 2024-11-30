import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  addSubObjectiveModalState,
  searchModalState,
  sidebarState,
} from "../../functions/state";
import { BarProps } from "../../functions/interfaces/interfaces";
import { AutoTextSize } from "auto-text-size";
import GlobalSearchBar from "./global-search-bar";
import "../../style/site/topbar.css";
import Conditional from "./if-then-else";

function TopBar(props: BarProps) {
  const [isSidebarActive, setIsSidebarActive] = useRecoilState(sidebarState);
  const isSearchModalActive = useRecoilValue(searchModalState);
  const isAddSubObjectiveModalActive = useRecoilValue(
    addSubObjectiveModalState
  );
  const navigate = useNavigate();

  return (
    <div
      className={`top-bar ${props.page} ${Conditional({
        Condition: isSidebarActive || isAddSubObjectiveModalActive,
        If: "disabled",
      })}`}
    >
      <div
        className={`top-bar-title ${props.page}`}
        onClick={() => navigate("/")}
      >
        <AutoTextSize maxFontSizePx={24}>CONSOLE CATALOG</AutoTextSize>
      </div>
      <GlobalSearchBar />
      <div className="top-bar-end">
        <div
          className={`top-bar-menu ${Conditional({
            Condition: isSearchModalActive || isAddSubObjectiveModalActive,
            If: "disabled",
          })}`}
          onClick={() => setIsSidebarActive(!isSidebarActive)}
        >
          <Conditional
            Condition={isSidebarActive}
            If={<i className="fa-solid fa-xmark" />}
            Else={<i className="fa-solid fa-bars" />}
          />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
