import { useLocation, useNavigate } from "react-router-dom";
import playstation_logo from "../../images/playstation_logo.webp";
import xbox_logo from "../../images/xbox_logo.jpg";
import { useSetRecoilState } from "recoil";
import { activePageState } from "../../functions/state";
import { Pages } from "../../functions/enums";
import "../../style/site/background.css";

function Background() {
  const navigate = useNavigate();
  const setActivePage = useSetRecoilState(activePageState);
  const location = useLocation();
  return (
    <div className="background">
      <div
        className="playstation"
        onClick={() => {
          setActivePage(Pages.Home);
          navigate(`/playstation`, {
            state: { userId: location.state?.userId },
          });
        }}
      >
        <img src={playstation_logo} className="playstation-logo" />
      </div>
      <div
        className="xbox"
        onClick={() => {
          setActivePage(Pages.Home);
          navigate(`/xbox`, {
            state: { userId: location.state?.userId },
          });
        }}
      >
        <img src={xbox_logo} className="xbox-logo" />
      </div>
    </div>
  );
}

export default Background;
