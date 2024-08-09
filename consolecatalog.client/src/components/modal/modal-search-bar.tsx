import { useRecoilState } from "recoil";
import { gameSearchModalState } from "../../functions/state";
import "../../styling/modal/modal-search-bar.css";

function ModalSearchBar(props: ModalSearchBarProps) {
  const [isGameSearchModalActive, setIsGameSearchModalActive] =
    useRecoilState(gameSearchModalState);

  return (
    <div className="search">
      <input
        autoFocus={isGameSearchModalActive}
        value={props.searchTerm}
        placeholder="Search..."
        onChange={(e) => props.setSearchTerm(e.target.value)}
      />
      <i className="fa-solid fa-magnifying-glass fa-xl fa-flip-horizontal" />
      <div className="close" onClick={() => setIsGameSearchModalActive(false)}>
        <i className="fa-solid fa-xmark fa-2xl fa-flip-horizontal" />
      </div>
    </div>
  );
}

export default ModalSearchBar;

interface ModalSearchBarProps {
  searchTerm: string;
  setSearchTerm: Function;
}
