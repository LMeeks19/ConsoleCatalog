import playstation_icon from "../images/playstation_icon.png";
import "../styling/background.css";
import "../styling/playstation.css";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../functions/state";
import { useEffect } from "react";

function PlaystationSoloBackground() {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  useEffect(() => {
    async function getPSNUser() {
      await fetch("http://localhost:3000/users-list/1")
        .then((response) => response.json())
        .then((usersList) => {
          console.log(usersList);
          // Write an action that you want you want to perform with the response
        })
        .catch((error) => {
          console.log(error);
          // Handle the error in case the request is not successfull
        });
    }
    getPSNUser();
  }, []);

  return (
    <div className="top-bar">
      <span
        className="top-bar-title playstation"
        onClick={() => navigate(`/${user.id}`)}
      >
        CONSOLE CATALOG
      </span>
      <div className="top-bar-logo">
        <span className="top-bar-text">PLAYSTATION</span>
        <img src={playstation_icon} className="top-bar-icon" />
      </div>
    </div>
  );
}

export default PlaystationSoloBackground;
