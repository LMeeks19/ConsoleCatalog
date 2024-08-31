import playstation_icon from "../../images/playstation_icon.png";
import xbox_icon from "../../images/xbox_icon.png";
import TopBar from "../../components/site/topbar";
import SideBar from "../../components/site/sidebar";
import GamesSearchModal from "../../components/modal/game-search-modal";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  activePageState,
  gameSearchModalState,
  userState,
} from "../../functions/state";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Pages } from "../../functions/enums";
import "../../styling/site/page.css";
import { getUserById } from "../../functions/server";
import Conditional from "../../components/site/if-then-else";
import Modal from "../../components/modal/modal";

function Playstation() {
  const [isGameSearchModalActive, setIsGameSearchModalActive] =
    useRecoilState(gameSearchModalState);
  const setActivePage = useSetRecoilState(activePageState);
  const [user, setUser] = useRecoilState(userState);
  const location = useLocation();

  useEffect(() => {
    async function fetchUser() {
      if (user.id === undefined) {
        let userId = location.pathname.slice(1, 37);
        const userDetails = await getUserById(userId);
        setUser(userDetails);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    function setCurrentPage() {
      if (location.pathname.includes("games")) setActivePage(Pages.Games);
      else if (
        location.pathname.includes("profiles") &&
        !location.pathname.includes(`${user?.playstationGamertag}`)
      )
        setActivePage(Pages.Profiles);
      else if (location.pathname.includes(`${user?.playstationGamertag}`))
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
  }, [user]);

  return (
    <>
      <Conditional
        Condition={isGameSearchModalActive}
        If={<Modal component={<GamesSearchModal />} />}
      />
      <TopBar page="playstation" icon={playstation_icon} />
      <SideBar page="playstation" icon={xbox_icon} />
    </>
  );
}

export default Playstation;
