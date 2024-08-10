import "../../styling/game/game-card.css";
import playstation_icon from "../../images/playstation_icon.png";

function GameCardBlankCollection(props: GameCardBlankCollectionProps) {
  function getIterationCount(total: number): Array<number> {
    let array = new Array();
    for (let i = 0; i < total; i++) array.push(i);
    return array;
  }

  return (
    <>
      {getIterationCount(props.number).map((i) => {
        return <GameCardBlank key={i} />;
      })}
    </>
  );
}

function GameCardBlank() {
  return (
    <div className="card blank">
      <div className="card-image-container">
        <div className="card-image">
          <img src={playstation_icon}></img>
        </div>
      </div>
      <div className="card-info"></div>
    </div>
  );
}

export default GameCardBlankCollection;

interface GameCardBlankCollectionProps {
  number: number;
}
