import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { searchModalState } from "../../functions/state";
import "../../style/modal/modal-search-bar.css";

function ModalSearchBar(props: ModalSearchBarProps) {
  const setIsSearchModalActive = useSetRecoilState(searchModalState);

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
      <div className="close" onClick={() => setIsSearchModalActive(false)}>
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
