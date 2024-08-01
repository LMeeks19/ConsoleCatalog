import xbox_logo from "../images/xbox_logo.jpg";
import "../styling/background.css";

function XboxSoloBackground() {
  return (
    <div className="background">
      <img src={xbox_logo} className="xbox-solo-background" />
    </div>
  );
}

export default XboxSoloBackground;
