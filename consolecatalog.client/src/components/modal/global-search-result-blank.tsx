import "../../style/modal/global-search-modal.css";

export function GlobalSearchResultBlank(props: GlobalSearchResultBlankProps) {
  return <div className="result blank">{props.element}</div>;
}

export default GlobalSearchResultBlank;

interface GlobalSearchResultBlankProps {
  element: JSX.Element;
}
