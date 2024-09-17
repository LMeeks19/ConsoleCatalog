import {
  GameSummary,
} from "../../../functions/interfaces/interfaces";
import { ProfileResults } from "../../../functions/interfaces/playstation/profile-interfaces";
import { useEffect, useState } from "react";
import PlaystationModalGameSearchResult from "./playstation-modal-game-search-result";
import ModalSearchBar from "../modal-search-bar";
import PlaystationGlobalSearchResultBlank from "./playstation-global-search-result-blank";
import {
  getPSNTitles,
  makeUniversalSearch,
} from "../../../functions/server/external/playstation-calls";
import { BeatLoader } from "react-spinners";
import "../../../style/playstation/playstation-global-search-modal.css";
import Conditional from "../../site/if-then-else";
import { GlobalSearchTab } from "../../../functions/enums";
import PlaystationModalProfileSearchResult from "./playstation-modal-profile-search-result";

function PlaystationGlobalSearchModal() {
  const [games, setGames] = useState<GameSummary[]>([] as GameSummary[]);
  const [profiles, setProfiles] = useState<ProfileResults[]>(
    [] as ProfileResults[]
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
          const games = await getPSNTitles(searchTerm);
          setGames(games);
        } else if (globalSearchTab === GlobalSearchTab.Profiles) {
          const response = await makeUniversalSearch(searchTerm);
          setProfiles(response.profiles.domainResponses[0].results);
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
            If: "active playstation",
          })}`}
          onClick={() => setGlobalSearchTab(GlobalSearchTab.Games)}
        >
          <div className="text">Games</div>
        </div>
        <div
          className={`search-tab ${Conditional({
            Condition: globalSearchTab === GlobalSearchTab.Profiles,
            If: "active playstation",
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
          If={<PlaystationGlobalSearchResultBlank element={getTextMessage()} />}
          Else={
            <Conditional
              Condition={globalSearchTab === GlobalSearchTab.Games}
              If={games.map((game) => {
                return <PlaystationModalGameSearchResult key={game.id} game={game} />;
              })}
              Else={profiles.map((profile) => {
                return (
                  <PlaystationModalProfileSearchResult
                    key={profile.socialMetadata.accountId}
                    profile={profile.socialMetadata}
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

export default PlaystationGlobalSearchModal;
