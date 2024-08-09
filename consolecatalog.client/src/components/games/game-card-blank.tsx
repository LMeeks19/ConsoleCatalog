import "../../styling/game/game-card.css";

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
        <i className="fa-solid fa-image fa-2xl card-image"></i>
      </div>
      <div className="card-info"></div>
    </div>
  );
}

export default GameCardBlankCollection;

interface GameCardBlankCollectionProps {
  number: number;
}
