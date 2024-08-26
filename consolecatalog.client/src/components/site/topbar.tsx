import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { sidebarState, userState } from "../../functions/state";
import { BarProps } from "../../functions/interfaces";
import { AutoTextSize } from "auto-text-size";
import SearchBar from "./searchbar";
import "../../styling/site/topbar.css";
import Conditional from "./if-then-else";

function TopBar(props: BarProps) {
  const [isSidebarActive, setIsSidebarActive] = useRecoilState(sidebarState);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  return (
    <div className={`top-bar ${props.page}`}>
      <div
        className={`top-bar-title ${props.page}`}
        onClick={() => navigate(`/${user.id}`)}
      >
        <AutoTextSize maxFontSizePx={24}>CONSOLE CATALOG</AutoTextSize>
      </div>
      <SearchBar />
      <div className="top-bar-end">
        <div
          className="top-bar-menu"
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
