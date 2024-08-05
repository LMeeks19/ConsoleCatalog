import "../styling/topbar.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { sidebarState } from "../functions/state";
import { BarProps } from "../functions/interfaces";

function TopBar(props: BarProps) {
  const [isSidebarActive, setIsSidebarActive] = useRecoilState(sidebarState);
  const navigate = useNavigate();

  return (
    <div className={`top-bar ${props.page}`}>
      <div
        className={`top-bar-title ${props.page}`}
        onClick={() => navigate("/")}
      >
        <div>CONSOLE CATALOG</div>
      </div>
      <div className="top-bar-logo">
        <span className="top-bar-text">{props.page.toUpperCase()}</span>
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
