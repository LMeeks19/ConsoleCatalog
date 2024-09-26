import { useEffect, useState } from "react";
import ModalSearchBar from "../modal-search-bar";
import { BeatLoader } from "react-spinners";
import "../../../style/xbox/xbox-global-search-modal.css";
import Conditional from "../../site/if-then-else";
import { GlobalSearchTab } from "../../../functions/enums";
import XboxGlobalSearchResultBlank from "./xbox-global-search-result-blank";
import XboxModalProfileSearchResult from "./xbox-modal-profile-search-result";
import { XBXProfileSummary } from "../../../functions/interfaces/xbox/profile-interfaces";
import {
  getXBXProfilesByUsername,
  getXBXTitles,
} from "../../../functions/server/external/xbox-calls";
import { GameSummary } from "../../../functions/interfaces/interfaces";
import XboxModalGameSearchResult from "./xbox-modal-game-search-result";

function XboxGlobalSearchModal() {
  const [games, setGames] = useState<GameSummary[]>([] as GameSummary[]);
  const [profiles, setProfiles] = useState<XBXProfileSummary[]>(
    [] as XBXProfileSummary[]
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [globalSearchTab, setGlobalSearchTab] = useState<GlobalSearchTab>(
    GlobalSearchTab.Games
  );

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(async () => {
      if (searchTerm !== "") {
        if (globalSearchTab === GlobalSearchTab.Games) {
          const games = await getXBXTitles(searchTerm);
          setGames(games);
        } else if (globalSearchTab === GlobalSearchTab.Profiles) {
          const response = await getXBXProfilesByUsername(searchTerm);
          setProfiles(response.people);
        }
        setIsLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [searchTerm, globalSearchTab]);

  function getTextMessage(): JSX.Element {
    if (searchTerm === "") return <div>Begin Typing to Search</div>;
    else if (isLoading)
      return <BeatLoader color="white" size={15} speedMultiplier={0.5} />;
    else if (
      games.length === 0 &&
      searchTerm !== "" &&
      globalSearchTab === GlobalSearchTab.Games
    )
      return <div>No Games Found</div>;
    else if (
      profiles.length === 0 &&
      searchTerm !== "" &&
      globalSearchTab === GlobalSearchTab.Profiles
    )
      return <div>No Profiles Found</div>;
    return <></>;
  }

  return (
    <>
      <ModalSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="search-tabs">
        <div
          className={`search-tab ${Conditional({
            Condition: globalSearchTab === GlobalSearchTab.Games,
            If: "active xbox",
          })}`}
          onClick={() => setGlobalSearchTab(GlobalSearchTab.Games)}
        >
          <div className="text">Games</div>
        </div>
        <div
          className={`search-tab ${Conditional({
            Condition: globalSearchTab === GlobalSearchTab.Profiles,
            If: "active xbox",
          })}`}
          onClick={() => setGlobalSearchTab(GlobalSearchTab.Profiles)}
        >
          <div className="text">Profiles</div>
        </div>
      </div>
      <div className="results">
        <Conditional
          Condition={
            isLoading ||
            searchTerm === "" ||
            (globalSearchTab === GlobalSearchTab.Games && games.length === 0) ||
            (globalSearchTab === GlobalSearchTab.Profiles &&
              profiles.length === 0)
          }
          If={<XboxGlobalSearchResultBlank element={getTextMessage()} />}
          Else={
            <Conditional
              Condition={globalSearchTab === GlobalSearchTab.Games}
              If={games.map((game) => {
                return <XboxModalGameSearchResult key={game.id} game={game} />;
              })}
              Else={profiles.map((profile) => {
                return (
                  <XboxModalProfileSearchResult
                    key={profile.xuid}
                    profile={profile}
                  />
                );
              })}
            />
          }
        />
      </div>
    </>
  );
}

export default XboxGlobalSearchModal;
