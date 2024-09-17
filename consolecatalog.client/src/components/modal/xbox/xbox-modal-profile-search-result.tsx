import { XBXProfileSummary } from "../../../functions/interfaces/xbox/profile-interfaces";
import { useNavigate } from "react-router-dom";
import "../../../style/xbox/xbox-modal-profile-search-result.css";
import { useSetRecoilState } from "recoil";
import { searchModalState } from "../../../functions/state";

function XboxModalProfileSearchResult(props: ProfileSearchResultProps) {
  const navigate = useNavigate();
  const setIsSearchModalActive = useSetRecoilState(searchModalState);

  return (
    <div
      className="result"
      onClick={() => {
        setIsSearchModalActive(false);
        navigate(`/xbox/profiles/${props.profile.gamertag}`, {
          state: {
            username: props.profile.gamertag,
          },
        });
      }}
    >
      <img src={props.profile.displayPicRaw}></img>
      <div className="result-info">
        <div className="result-title">{props.profile.gamertag}</div>
      </div>
    </div>
  );
}

export default XboxModalProfileSearchResult;

interface ProfileSearchResultProps {
  profile: XBXProfileSummary;
}
