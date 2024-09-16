import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { gameSearchModalState } from "../../functions/state";
import "../../style/modal/modal-search-bar.css";

function ModalSearchBar(props: ModalSearchBarProps) {
  const setIsGameSearchModalActive = useSetRecoilState(gameSearchModalState);

  return (
    <div className="modal-search">
      <div className="search-input">
        <input
          autoFocus={true}
          value={props.searchTerm}
          placeholder="Search..."
          onChange={(e) => props.setSearchTerm(e.target.value)}
        />
        <i className="fa-solid fa-magnifying-glass fa-xl fa-flip-horizontal" />
      </div>
      <div className="close" onClick={() => setIsGameSearchModalActive(false)}>
        <i className="fa-solid fa-xmark fa-2xl fa-flip-horizontal" />
      </div>
    </div>
  );
}

export default ModalSearchBar;

interface ModalSearchBarProps {
  searchTerm: string;
  setSearchTerm: SetterOrUpdater<string>;
}
