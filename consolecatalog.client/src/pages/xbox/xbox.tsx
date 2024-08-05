import xbox_icon from "../../images/xbox_icon.png";
import playstation_icon from "../../images/playstation_icon.png";
import TopBar from "../../components/topbar";
import SideBar from "../../components/sidebar";
import "../../styling/page.css";

function Xbox() {
  return (
    <>
      <TopBar page="xbox" icon={xbox_icon} />
      <SideBar page="xbox" icon={playstation_icon} />
    </>
  );
}

export default Xbox;
