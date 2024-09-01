import "../../style/game/game-search-result.css";

export function GameSearchResultBlank(props: GameSearchResultBlankProps) {
  return <div className="result blank">{props.element}</div>;
}

export default GameSearchResultBlank;

interface GameSearchResultBlankProps {
  element: JSX.Element;
}
