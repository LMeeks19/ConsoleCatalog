import playstation_icon from "../../images/playstation_icon.png";
import xbox_icon from "../../images/xbox_icon.png";
import TopBar from "../../components/site/topbar";
import SideBar from "../../components/site/sidebar";
import BottomBar from "../../components/site/bottombar";
import GamesSearchModal from "../../components/modal/game-search-modal";
import { useRecoilValue } from "recoil";
import { gameSearchModalState } from "../../functions/state";
import Modal from "../../components/modal/modal";
import "../../styling/site/page.css";

function Playstation() {
  const isGameSearchModalActive = useRecoilValue(gameSearchModalState);

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
