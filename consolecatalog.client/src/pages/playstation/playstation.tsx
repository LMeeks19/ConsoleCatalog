import playstation_icon from "../../images/playstation_icon.png";
import xbox_icon from "../../images/xbox_icon.png";
import TopBar from "../../components/site/topbar";
import SideBar from "../../components/site/sidebar";
import BottomBar from "../../components/site/bottombar";
import GamesSearchModal from "../../components/modal/game-search-modal";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  activePageState,
  gameSearchModalState,
  selectedGameState,
} from "../../functions/state";
import Modal from "../../components/modal/modal";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Pages } from "../../functions/enums";
import "../../styling/site/page.css";
import { Game } from "../../functions/interfaces";

function Playstation() {
  const [isGameSearchModalActive, setIsGameSearchModalActive] = useRecoilState(gameSearchModalState);
  const setSelectedGame = useSetRecoilState(selectedGameState);
  const setActivePage = useSetRecoilState(activePageState);
  const location = useLocation();

  useEffect(() => {
    function setCurrentPage() {
      if (location.pathname.includes("games")) setActivePage(Pages.Games);
      else if (location.pathname.includes("profiles"))
        setActivePage(Pages.Profiles);
      else setActivePage(Pages.Home);
    }
    function resetSelectedGame() {
      setSelectedGame({} as Game);
    }
    function resetModal() {
      setIsGameSearchModalActive(false);
    }
    setCurrentPage();
    resetSelectedGame();
    resetModal()
  }, []);

  return (
    <>
      {isGameSearchModalActive ? (
        <Modal component={<GamesSearchModal />} />
      ) : (
        <></>
      )}
      <TopBar page="playstation" icon={playstation_icon} />
      <SideBar page="playstation" icon={xbox_icon} />
      <BottomBar page="playstation" />
    </>
  );
}

export default Playstation;
