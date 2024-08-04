import { useNavigate } from "react-router-dom";
import playstation_logo from "../images/playstation_logo.webp";
import xbox_logo from "../images/xbox_logo.jpg";
import "../styling/background.css";
import { useRecoilValue } from "recoil";
import { userState } from "../functions/state";

function Background() {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  return (
    <div className="background">
      <div className="playstation" onClick={() => navigate(`/${user.id}/playstation`)}>
        <img src={playstation_logo} className="playstation-logo" />
      </div>
      <div className="xbox" onClick={() => navigate(`/${user.id}/xbox`)}>
        <img src={xbox_logo} className="xbox-logo" />
      </div>
    </div>
  );
}

export default Background;
