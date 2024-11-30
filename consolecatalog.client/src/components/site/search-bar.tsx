import { SetterOrUpdater } from "recoil";
import "../../style/site/search-bar.css";

function SearchBar(props: SearchBarProps) {
  return (
    <div className="search-container">
      <input
        className="search-input"
        value={props.searchTerm}
        placeholder={props.placeholder}
        onChange={(e) => props.setSearchTerm(e.target.value)}
        disabled={props.disabled}
      />
      <i className="search-icon fa-solid fa-magnifying-glass fa-lg fa-flip-horizontal" />
    </div>
  );
}

export default SearchBar;

interface SearchBarProps {
  placeholder: string;
  searchTerm: string;
  setSearchTerm: SetterOrUpdater<string>;
  disabled: boolean;
}
