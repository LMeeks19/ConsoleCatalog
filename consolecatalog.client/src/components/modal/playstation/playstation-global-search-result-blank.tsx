import "../../../style/playstation/playstation-modal-game-search-result.css";

export function PlaystationGlobalSearchResultBlank(props: GlobalSearchResultBlankProps) {
  return <div className="result blank">{props.element}</div>;
}

export default PlaystationGlobalSearchResultBlank;

interface GlobalSearchResultBlankProps {
  element: JSX.Element;
}
