import xbox_icon from "../../images/xbox_icon.png";
import playstation_icon from "../../images/playstation_icon.png";
import TopBar from "../../components/site/topbar";
import SideBar from "../../components/site/sidebar";
import BottomBar from "../../components/site/bottombar";
import "../../styling/site/page.css";

function Xbox() {
  return (
    <>
      <TopBar page="xbox" icon={xbox_icon} />
      <SideBar page="xbox" icon={playstation_icon} />
      <BottomBar page="xbox" />
    </>
  );
}

export default Xbox;
