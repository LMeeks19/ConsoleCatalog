import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { sidebarState } from "../../functions/state";
import { BarProps } from "../../functions/interfaces";
import { AutoTextSize } from "auto-text-size";
import SearchBar from "./searchbar";
import "../../styling/site/topbar.css";

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
      <SearchBar />
      <div className="top-bar-end">
        <div
          className="top-bar-menu"
          onClick={() => setIsSidebarActive(!isSidebarActive)}
        >
          {isSidebarActive ? (
            <i className="fa-solid fa-xmark" />
          ) : (
            <i className="fa-solid fa-bars" />
          )}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
