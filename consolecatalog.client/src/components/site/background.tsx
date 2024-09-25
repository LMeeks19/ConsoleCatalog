import { useNavigate } from "react-router-dom";
import playstation_logo from "../../images/playstation_logo.webp";
import xbox_logo from "../../images/xbox_logo.jpg";
import { useSetRecoilState } from "recoil";
import { activePageState, userState } from "../../functions/state";
import { Pages } from "../../functions/enums";
import "../../style/site/background.css";
import { useEffect } from "react";
import { getUserById } from "../../functions/server/internal/global-calls";
import { getCookie, hasCookie } from "../../functions/cookie";

function Background() {
  const navigate = useNavigate();
  const setActivePage = useSetRecoilState(activePageState);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    async function fetchUser() {
      if (hasCookie("Id")) {
        let userId = getCookie("Id");
        setUser(await getUserById(userId));
      } else navigate("/login");
    }
    fetchUser();
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
