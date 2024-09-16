import { PSNProfileSummary } from "../../functions/interfaces";
import { useNavigate } from "react-router-dom";
import "../../style/modal/modal-profile-search-result.css";

function ModalProfileSearchResult(props: ProfileSearchResultProps) {
  const navigate = useNavigate();

  return (
    <div
      className="result"
      onClick={() => {
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

export default ModalProfileSearchResult;

interface ProfileSearchResultProps {
  profile: PSNProfileSummary;
}
