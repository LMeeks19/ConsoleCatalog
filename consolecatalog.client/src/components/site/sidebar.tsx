import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  activePageState,
  sidebarState,
  userState,
} from "../../functions/state";
import { Pages } from "../../functions/enums";
import { BarProps } from "../../functions/interfaces";
import "../../styling/site/sidebar.css";

function SideBar(props: BarProps) {
  const [isSidebarActive, setIsSidebarActive] = useRecoilState(sidebarState);
  const [activePage, setActivePage] = useRecoilState(activePageState);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  return (
    <div
      className={`side-bar ${props.page} ${isSidebarActive ? "active" : ""}`}
    >
      <div className="side-bar-top">
        <div
          className={`side-bar-item ${
            activePage === Pages.Home ? "active" : ""
          } ${props.page}-item`}
          onClick={() => {
            setActivePage(Pages.Home);
            setIsSidebarActive(!isSidebarActive);
            navigate(`/${user.id}/${props.page}`);
          }}
        >
          <p className="side-bar-item-text">HOME</p>
          <div className="side-bar-item-icon">
            <i className="fa-solid fa-house-chimney fa-2xl" />
          </div>
        </div>
        <div
          className={`side-bar-item ${
            activePage === Pages.Games ? "active" : ""
          } ${props.page}-item`}
          onClick={() => {
            setActivePage(Pages.Games);
            setIsSidebarActive(!isSidebarActive);
            navigate(`/${user.id}/${props.page}/games/browse`);
          }}
        >
          <p className="side-bar-item-text">GAMES</p>
          <div className="side-bar-item-icon">
            <i className="fa-solid fa-gamepad fa-2xl" />
          </div>
        </div>
        <div
          className={`side-bar-item ${
            activePage === Pages.Profiles ? "active" : ""
          } ${props.page}-item`}
          onClick={() => {
            setActivePage(Pages.Profiles);
            setIsSidebarActive(!isSidebarActive);
            navigate(`/${user.id}/${props.page}/profiles/browse`);
          }}
        >
          <p className="side-bar-item-text">PROFILES</p>
          <div className="side-bar-item-icon">
            <i className="fa-solid fa-users fa-2xl" />
          </div>
        </div>
      </div>
      <div className="side-bar-bottom">
        <div
          className={`side-bar-item ${
            activePage === Pages.MyProfile ? "active" : ""
          } ${props.page}-item`}
          onClick={() => {
            setActivePage(Pages.MyProfile);
            setIsSidebarActive(!isSidebarActive);
            navigate(
              `/${user.id}/${props.page}/profiles/${
                props.page === "xbox"
                  ? user.xboxGamertag
                  : user.playstationGamertag
              }`
            );
          }}
        >
          <p className="side-bar-item-text">PSN PROFILE</p>
          <div className="side-bar-item-icon">
            <i className="fa-solid fa-user fa-2xl" />
          </div>
        </div>
        <div
          className={`side-bar-item ${
            activePage === Pages.Account ? "active" : ""
          } ${props.page}-item`}
          onClick={() => {
            setActivePage(Pages.Account);
            setIsSidebarActive(!isSidebarActive);
          }}
        >
          <p className="side-bar-item-text">ACCOUNT</p>
          <div className="side-bar-item-icon">
            <i className="fa-solid fa-id-card fa-2xl" />
          </div>
        </div>
        <div
          className={`side-bar-item ${props.page}`}
          onClick={() => {
            setActivePage(Pages.Home);
            setIsSidebarActive(!isSidebarActive);
            navigate(
              `/${user.id}/${props.page === "xbox" ? "playstation" : "xbox"}`
            );
          }}
        >
          <p className="side-bar-item-text">
            {props.page === "xbox" ? "PLAYSTATION" : "XBOX"}
          </p>
          <img
            src={props.icon}
            className={`side-bar-item-icon ${
              props.page === "xbox" ? "playstation" : "xbox"
            }-icon`}
          />
        </div>
        <div
          className={`side-bar-item`}
          onClick={() => {
            setActivePage(Pages.Home);
            setIsSidebarActive(!isSidebarActive);
            navigate(`/${user.id}`);
          }}
        >
          <p className="side-bar-item-text">RETURN</p>
          <div className="side-bar-item-icon">
            <i className="fa-solid fa-circle-arrow-right fa-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
