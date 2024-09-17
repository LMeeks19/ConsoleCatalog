import xbox_icon from "../../images/xbox_icon.png";
import playstation_icon from "../../images/playstation_icon.png";
import TopBar from "../../components/site/topbar";
import SideBar from "../../components/site/sidebar";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Pages } from "../../functions/enums";
import { activePageState, searchModalState } from "../../functions/state";
import Modal from "../../components/modal/modal";
import "../../style/site/page.css";
import Conditional from "../../components/site/if-then-else";
import XboxGlobalSearchModal from "../../components/modal/xbox/xbox-global-search-modal";

function Xbox() {
  const isSearchModalActive = useRecoilValue(searchModalState);
  const setActivePage = useSetRecoilState(activePageState);
  const location = useLocation();

  useEffect(() => {
    function setCurrentPage() {
      if (location.pathname.includes("games")) setActivePage(Pages.Games);
      else if (location.pathname.includes("profiles"))
        setActivePage(Pages.Profiles);
      else if (location.pathname.includes("account/PSNprofile"))
        setActivePage(Pages.MyProfile);
      else if (location.pathname.includes("account"))
        setActivePage(Pages.Account);
      else setActivePage(Pages.Home);
    }
    setCurrentPage();
  }, []);

  return (
    <>
      <Conditional
        Condition={isSearchModalActive}
        If={<Modal component={<XboxGlobalSearchModal />} />}
      />
      <TopBar page="xbox" icon={xbox_icon} />
      <SideBar page="xbox" icon={playstation_icon} />
    </>
  );
}

export default Xbox;
