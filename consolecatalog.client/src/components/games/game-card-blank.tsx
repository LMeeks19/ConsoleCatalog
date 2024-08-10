import "../../styling/game/game-card.css";
import { BeatLoader } from "react-spinners";

function GameCardBlankCollection(props: GameCardBlankCollectionProps) {
  function getIterationCount(total: number): Array<number> {
    const array = [];
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
      <BeatLoader speedMultiplier={.5} color="white" size={30} />
    </div>
  );
}

export default GameCardBlankCollection;

interface GameCardBlankCollectionProps {
  number: number;
}
