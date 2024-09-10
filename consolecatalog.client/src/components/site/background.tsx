import { useLocation, useNavigate } from "react-router-dom";
import playstation_logo from "../../images/playstation_logo.webp";
import xbox_logo from "../../images/xbox_logo.jpg";
import { useSetRecoilState } from "recoil";
import { activePageState, userState } from "../../functions/state";
import { Pages } from "../../functions/enums";
import "../../style/site/background.css";
import { useEffect } from "react";
import { getUserById } from "../../functions/server/internal/global-calls";

function Background() {
  const navigate = useNavigate();
  const setActivePage = useSetRecoilState(activePageState);
  const location = useLocation();
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    async function checkLoginStatus() {
      if (location.state?.userId === undefined) navigate("/login");
      else {
        const user = await getUserById(location.state.userId)
        setUser(user);
      }
    }
    checkLoginStatus();
  }, []);

  return (
    <div className="background">
      <div
        className="playstation"
        onClick={() => {
          setActivePage(Pages.Home);
          navigate(`/playstation`);
        }}
      >
        <img src={playstation_logo} className="playstation-logo" />
      </div>
      <div
        className="xbox"
        onClick={() => {
          setActivePage(Pages.Home);
          navigate(`/xbox`);
        }}
      >
        <img src={xbox_logo} className="xbox-logo" />
      </div>
    </div>
  );
}

export default Background;
