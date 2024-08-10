import xbox_icon from "../../images/xbox_icon.png";
import playstation_icon from "../../images/playstation_icon.png";
import TopBar from "../../components/site/topbar";
import SideBar from "../../components/site/sidebar";
import BottomBar from "../../components/site/bottombar";
import "../../styling/site/page.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Pages } from "../../functions/enums";
import { activePageState, gameSearchModalState } from "../../functions/state";
import GamesSearchModal from "../../components/modal/game-search-modal";
import Modal from "../../components/modal/modal";

function Xbox() {
  const isGameSearchModalActive = useRecoilValue(gameSearchModalState);
  const setActivePage = useSetRecoilState(activePageState);
  const location = useLocation();

  useEffect(() => {
    function setCurrentPage() {
      if (location.pathname.includes("games")) setActivePage(Pages.Games);
      else if (location.pathname.includes("profiles"))
        setActivePage(Pages.Profiles);
      else setActivePage(Pages.Home);
    }
    setCurrentPage();
  }, []);

  return (
    <>
      {isGameSearchModalActive ? (
        <Modal component={<GamesSearchModal />} />
      ) : (
        <></>
      )}
      <TopBar page="xbox" icon={xbox_icon} />
      <SideBar page="xbox" icon={playstation_icon} />
      <BottomBar page="xbox" />
    </>
  );
}

export default Xbox;
