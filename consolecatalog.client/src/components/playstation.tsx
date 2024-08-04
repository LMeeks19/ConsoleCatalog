import playstation_icon from "../images/playstation_icon.png";
import "../styling/background.css";
import "../styling/playstation.css";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../functions/state";

function PlaystationSoloBackground() {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  return (
    <div className="top-bar">
      <span
        className="top-bar-title playstation"
        onClick={() => navigate(`/${user.id}`)}
      >
        CONSOLE CATALOG
      </span>
      <div className="top-bar-logo">
        <span className="top-bar-text">PLAYSTATION</span>
        <img src={playstation_icon} className="top-bar-icon" />
      </div>
    </div>
  );
}

export default PlaystationSoloBackground;
