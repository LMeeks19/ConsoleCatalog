import { useNavigate } from "react-router-dom";
import playstation_logo from "../../images/playstation_logo.webp";
import xbox_logo from "../../images/xbox_logo.jpg";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { activePageState, userState } from "../../functions/state";
import { Pages } from "../../functions/enums";
import "../../styling/site/background.css";

function Background() {
  const navigate = useNavigate();
  const setActivePage = useSetRecoilState(activePageState);
  const user = useRecoilValue(userState);

  return (
    <div className="background">
      <div
        className="playstation"
        onClick={() => {
          setActivePage(Pages.Home);
          navigate(`/${user.id}/playstation`);
        }}
      >
        <img src={playstation_logo} className="playstation-logo" />
      </div>
      <div
        className="xbox"
        onClick={() => {
          setActivePage(Pages.Home);
          navigate(`/${user.id}/xbox`);
        }}
      >
        <img src={xbox_logo} className="xbox-logo" />
      </div>
    </div>
  );
}

export default Background;
