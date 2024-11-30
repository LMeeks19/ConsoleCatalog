import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  activePageState,
  sidebarState,
  userState,
} from "../../functions/state";
import { Pages } from "../../functions/enums";
import { BarProps } from "../../functions/interfaces/interfaces";
import "../../style/site/sidebar.css";
import Conditional from "./if-then-else";

function SideBar(props: BarProps) {
  const [isSidebarActive, setIsSidebarActive] = useRecoilState(sidebarState);
  const [activePage, setActivePage] = useRecoilState(activePageState);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  return (
    <div
      className={`side-bar ${props.page} ${Conditional({
        Condition: isSidebarActive,
        If: "active",
      })}`}
    >
      <div className="side-bar-top">
        <div
          className={`side-bar-item ${Conditional({
            Condition: activePage === Pages.Home,
            If: "active",
          })} ${props.page}-item`}
          onClick={() => {
            setActivePage(Pages.Home);
            setIsSidebarActive(!isSidebarActive);
            navigate(`/${props.page}`);
          }}
        >
          <p className="side-bar-item-text">HOME</p>
          <div className="side-bar-item-icon">
            <i className="fa-solid fa-house-chimney fa-2xl" />
          </div>
        </div>
        <div
          className={`side-bar-item ${Conditional({
            Condition: activePage === Pages.Games,
            If: "active",
          })} ${props.page}-item`}
          onClick={() => {
            setActivePage(Pages.Games);
            setIsSidebarActive(!isSidebarActive);
            navigate(`/${props.page}/games`);
          }}
        >
          <p className="side-bar-item-text">GAMES</p>
          <div className="side-bar-item-icon">
            <i className="fa-solid fa-gamepad fa-2xl" />
          </div>
        </div>
        <div
          className={`side-bar-item ${Conditional({
            Condition: activePage === Pages.Profiles,
            If: "active",
          })} ${props.page}-item`}
          onClick={() => {
            setActivePage(Pages.Profiles);
            setIsSidebarActive(!isSidebarActive);
            navigate(`/${props.page}/profiles`);
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
          className={`side-bar-item ${Conditional({
            Condition: activePage === Pages.MyProfile,
            If: "active",
          })} ${props.page}-item`}
          onClick={() => {
            setActivePage(Pages.MyProfile);
            setIsSidebarActive(!isSidebarActive);
            navigate(
              `/${props.page}/profiles/${Conditional({
                Condition: props.page === "xbox",
                If: user.xboxGamertag,
                Else: user.playstationGamertag,
              })}`,
              {
                state: {
                  userId: user.id,
                  username: Conditional({
                    Condition: props.page === "xbox",
                    If: user.xboxGamertag,
                    Else: user.playstationGamertag,
                  }),
                },
              }
            );
          }}
        >
          <p className="side-bar-item-text">
            <Conditional
              Condition={props.page === "xbox"}
              If={"XBX PROFILE"}
              Else={"PSN PROFILE"}
            />
          </p>
          <div className="side-bar-item-icon">
            <i className="fa-solid fa-user fa-2xl" />
          </div>
        </div>
        <div
          className={`side-bar-item ${Conditional({
            Condition: activePage === Pages.Account,
            If: "active",
          })} ${props.page}-item`}
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
              `/${Conditional({
                Condition: props.page === "xbox",
                If: "playstation",
                Else: "xbox",
              })}`
            );
          }}
        >
          <p className="side-bar-item-text">
            {Conditional({
              Condition: props.page === "xbox",
              If: "PLAYSTATION",
              Else: "XBOX",
            })}
          </p>
          <img
            src={props.icon}
            className={`side-bar-item-icon ${Conditional({
              Condition: props.page === "xbox",
              If: "playstation",
              Else: "xbox",
            })}-icon`}
          />
        </div>
        <div
          className={`side-bar-item`}
          onClick={() => {
            setActivePage(Pages.Home);
            setIsSidebarActive(!isSidebarActive);
            navigate("/");
          }}
        >
          <p className="side-bar-item-text">RETURN</p>
          <div className="side-bar-item-icon">
            <i className="fa-solid fa-circle-arrow-right fa-2xl" />
          </div>
        </div>
        <div
          className={`side-bar-item`}
          onClick={() => {
            setIsSidebarActive(!isSidebarActive);
            navigate("/login");
          }}
        >
          <p className="side-bar-item-text">LOGOUT</p>
          <div className="side-bar-item-icon">
            <i className="fa-solid fa-right-from-bracket fa-2xl"></i>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
