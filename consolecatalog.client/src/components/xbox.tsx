import xbox_icon from "../images/xbox_icon.jpg";
import "../styling/background.css";
import "../styling/xbox.css";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../functions/state";

function Xbox() {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  return (
      <div className="top-bar">
        <span className="top-bar-title xbox" onClick={() => navigate(`/${user.id}`)}>
          CONSOLE CATALOG
        </span>
        <div className="top-bar-logo">
          <span className="top-bar-text">XBOX</span>
          <img src={xbox_icon} className="top-bar-icon" />
        </div>
      </div>
  );
}

export default Xbox;
