import "../styling/topbar.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { sidebarState } from "../functions/state";
import { BarProps } from "../functions/interfaces";
import { AutoTextSize } from "auto-text-size";

function TopBar(props: BarProps) {
  const [isSidebarActive, setIsSidebarActive] = useRecoilState(sidebarState);
  const navigate = useNavigate();

  return (
    <div className={`top-bar ${props.page}`}>
      <div
        className={`top-bar-title ${props.page}`}
        onClick={() => navigate("/")}
      >
        <AutoTextSize maxFontSizePx={24}>CONSOLE CATALOG</AutoTextSize>
      </div>
      <div className="top-bar-logo">
        <div className="top-bar-text">
          <AutoTextSize maxFontSizePx={24}>{props.page.toUpperCase()}</AutoTextSize>
        </div>
        <img src={props.icon} className={`top-bar-icon ${props.page}`} />
        <div
          className="top-bar-menu"
          onClick={() => setIsSidebarActive(!isSidebarActive)}
        >
          {isSidebarActive ? (
            <i className="fa-solid fa-xmark fa-2xl" />
          ) : (
            <i className="fa-solid fa-bars fa-2xl" />
          )}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
