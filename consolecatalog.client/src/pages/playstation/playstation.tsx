import playstation_icon from "../../images/playstation_icon.png";
import xbox_icon from "../../images/xbox_icon.png";
import TopBar from "../../components/site/topbar";
import SideBar from "../../components/site/sidebar";
import PlaystationGlobalSearchModal from "../../components/modal/playstation/playstation-global-search-modal";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  activePageState,
  searchModalState,
  userState,
} from "../../functions/state";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pages } from "../../functions/enums";
import "../../style/site/page.css";
import Conditional from "../../components/site/if-then-else";
import Modal from "../../components/modal/modal";
import { getCookies } from "../../functions/auth";
import { getUserById } from "../../functions/server/internal/global-calls";

function Playstation() {
  const [isSearchModalActive, setIsSearchModalActive] =
    useRecoilState(searchModalState);
  const setActivePage = useSetRecoilState(activePageState);
  const user = useRecoilValue(userState);
  const location = useLocation();
  const setUser = useSetRecoilState(userState);
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
      setIsSearchModalActive(false);
    }
    setCurrentPage();
    resetModal();
  }, [location.pathname]);

  return (
    <>
      <Conditional
        Condition={isSearchModalActive}
        If={<Modal component={<PlaystationGlobalSearchModal />} />}
      />
      <TopBar page="playstation" icon={playstation_icon} />
      <SideBar page="playstation" icon={xbox_icon} />
    </>
  );
}

export default Playstation;
