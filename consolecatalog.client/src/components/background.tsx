import playstation_logo from "../images/playstation_logo.webp";
import xbox_logo from "../images/xbox_logo.jpg";
import "../styling/background.css";

function Background() {
  return (
    <div className="background">
      <div className="playstation">
        <img src={playstation_logo} className="playstation-logo" />
      </div>
      <div className="xbox">
        <img src={xbox_logo} className="xbox-logo" />
      </div>
    </div>
  );
}

export default Background;
