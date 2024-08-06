import playstation_icon from "../../images/playstation_icon.png";
import xbox_icon from "../../images/xbox_icon.png";
import TopBar from "../../components/topbar";
import SideBar from "../../components/sidebar";
import BottomBar from "../../components/bottombar";
import "../../styling/page.css";

function Playstation() {
  return (
    <>
      <TopBar page="playstation" icon={playstation_icon} />
      <SideBar page="playstation" icon={xbox_icon} />
      <BottomBar page="playstation" />
    </>
  );
}

export default Playstation;
