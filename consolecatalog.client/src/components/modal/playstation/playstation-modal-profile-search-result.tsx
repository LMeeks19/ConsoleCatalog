import { PSNProfileSummary } from "../../../functions/interfaces/playstation/profile-interfaces";
import { useNavigate } from "react-router-dom";
import "../../../style/playstation/playstation-modal-profile-search-result.css";
import { useSetRecoilState } from "recoil";
import { searchModalState } from "../../../functions/state";

function PlaystationModalProfileSearchResult(props: ProfileSearchResultProps) {
  const navigate = useNavigate();
  const setIsSearchModalActive = useSetRecoilState(searchModalState);

  return (
    <div
      className="result"
      onClick={() => {
        setIsSearchModalActive(false);
        navigate(`/playstation/profiles/${props.profile.onlineId}`, {
          state: {
            username: props.profile.onlineId,
          },
        });
      }}
    >
      <img src={props.profile.avatarUrl ?? props.profile.profilePicUrl}></img>
      <div className="result-info">
        <div className="result-title">{props.profile.onlineId}</div>
      </div>
    </div>
  );
}

export default PlaystationModalProfileSearchResult;

interface ProfileSearchResultProps {
  profile: PSNProfileSummary;
}
