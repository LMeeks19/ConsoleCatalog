import "../../styling/game/game-search-result.css";

function GameSearchResultBlankCollection(
  props: GameSearchResultBlankCollectionProps
) {
  function getIterationCount(total: number): Array<number> {
    let array = new Array();
    for (let i = 0; i < total; i++) array.push(i);
    return array;
  }

  return (
    <>
      {getIterationCount(props.number).map((i) => {
        return <GameSearchResultBlank key={i} />;
      })}
    </>
  );
}

function GameSearchResultBlank() {
  return (
    <div className="result blank">
      <i className="fa-regular fa-image fa-2xl"></i>
    </div>
  );
}

export default GameSearchResultBlankCollection;

interface GameSearchResultBlankCollectionProps {
  number: number;
}
