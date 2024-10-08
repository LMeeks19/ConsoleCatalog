import xbox_icon from "../../images/xbox_icon.png";
import playstation_icon from "../../images/playstation_icon.png";
import TopBar from "../../components/site/topbar";
import SideBar from "../../components/site/sidebar";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Pages } from "../../functions/enums";
import {
  activePageState,
  searchModalState,
  userState,
} from "../../functions/state";
import Modal from "../../components/modal/modal";
import "../../style/site/page.css";
import Conditional from "../../components/site/if-then-else";
import XboxGlobalSearchModal from "../../components/modal/xbox/xbox-global-search-modal";
import { getCookies } from "../../functions/auth";
import { getUserById } from "../../functions/server/internal/global-calls";

function Xbox() {
  const [isSearchModalActive, setIsSearchModalActive] =
    useRecoilState(searchModalState);
  const setActivePage = useSetRecoilState(activePageState);
  const location = useLocation();
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
        const cookie = await getCookies();
        if (cookie !== null)
          setUser(await getUserById(cookie.userId));
        else navigate("/login");
    }
    fetchUser();
  }, []);

  useEffect(() => {
    function setCurrentPage() {
      if (location.pathname.includes("games")) setActivePage(Pages.Games);
      else if (
        location.pathname.includes("profiles") &&
        !location.pathname.includes(`${user.xboxGamertag}`)
      )
        setActivePage(Pages.Profiles);
      else if (location.pathname.includes(`${user.xboxGamertag}`))
        setActivePage(Pages.MyProfile);
      else if (location.pathname.includes("account"))
        setActivePage(Pages.Account);
      else setActivePage(Pages.Home);
    }
    function resetModal() {
      setIsSearchModalActive(false);
    }
    setCurrentPage();
    resetModal();
  }, [location.pathname]);

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
