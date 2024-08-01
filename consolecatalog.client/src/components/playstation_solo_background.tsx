import playstation_logo from "../images/playstation_logo.webp";
import "../styling/background.css";

function PlaystationSoloBackground() {
  return (
    <div className="background">
      <img src={playstation_logo} className="playstation-solo-background" />
    </div>
  );
}

export default PlaystationSoloBackground;
