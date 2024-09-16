import playstation_icon from "../../images/playstation_icon.png";
import xbox_icon from "../../images/xbox_icon.png";
import TopBar from "../../components/site/topbar";
import SideBar from "../../components/site/sidebar";
import GlobalSearchModal from "../../components/modal/global-search-modal";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  activePageState,
  gameSearchModalState,
  userState,
} from "../../functions/state";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pages } from "../../functions/enums";
import "../../style/site/page.css";
import Conditional from "../../components/site/if-then-else";
import Modal from "../../components/modal/modal";
import { getUserById } from "../../functions/server/internal/global-calls";

function Playstation() {
  const [isGameSearchModalActive, setIsGameSearchModalActive] =
    useRecoilState(gameSearchModalState);
  const setActivePage = useSetRecoilState(activePageState);
  const [user, setUser] = useRecoilState(userState);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      if (
        location.state?.userId === undefined ||
        location.state?.userId === null
      )
        navigate("/login");
      else {
        const user = await getUserById(location.state?.userId);
        setUser(user);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    function setCurrentPage() {
      if (location.pathname.includes("games")) setActivePage(Pages.Games);
      else if (
        location.pathname.includes("profiles") &&
        !location.pathname.includes(`${user.playstationGamertag}`)
      )
        setActivePage(Pages.Profiles);
      else if (location.pathname.includes(`${user.playstationGamertag}`))
        setActivePage(Pages.MyProfile);
      else if (location.pathname.includes("account"))
        setActivePage(Pages.Account);
      else setActivePage(Pages.Home);
    }
    function resetModal() {
      setIsGameSearchModalActive(false);
    }
    setCurrentPage();
    resetModal();
  }, [location.pathname]);

  return (
    <>
      <Conditional
        Condition={isGameSearchModalActive}
        If={<Modal component={<GlobalSearchModal page="playstation" />} />}
      />
      <TopBar page="playstation" icon={playstation_icon} />
      <SideBar page="playstation" icon={xbox_icon} />
    </>
  );
}

export default Playstation;
