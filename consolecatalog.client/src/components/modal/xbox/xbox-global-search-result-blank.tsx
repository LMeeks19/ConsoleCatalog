import "../../../style/xbox/xbox-global-search-modal.css";

export function XboxGlobalSearchResultBlank(props: GlobalSearchResultBlankProps) {
  return <div className="result blank">{props.element}</div>;
}

export default XboxGlobalSearchResultBlank;

interface GlobalSearchResultBlankProps {
  element: JSX.Element;
}
