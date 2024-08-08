import "../styling/game-card.css";

function GameCardBlank() {
  return (
    <div className="card blank">
      <div className="card-image-container">
        <i className="fa-solid fa-image fa-2xl card-image"></i>
      </div>
      <div className="card-info"></div>
    </div>
  );
}

export default GameCardBlank;


