import {
  GameSummary,
  ProfileResults,
} from "../../functions/interfaces";
import { useEffect, useState } from "react";
import ModalGameSearchResult from "./modal-game-search-result";
import ModalSearchBar from "./modal-search-bar";
import GlobalSearchResultBlank from "./global-search-result-blank";
import {
  getTitles,
  makeUniversalSearch,
} from "../../functions/server/external/playstation-calls";
import { BeatLoader } from "react-spinners";
import "../../style/modal/global-search-modal.css";
import Conditional from "../site/if-then-else";
import { GlobalSearchTab } from "../../functions/enums";
import ModalProfileSearchResult from "./modal-profile-search-result";

function GlobalSearchModal(props: { page: string }) {
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
          const games = await getTitles(searchTerm);
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

  function getPageName() {
    if (props.page === "xbox") return "xbox";
    return "playstation";
  }

  return (
    <>
      <ModalSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="search-tabs">
        <div
          className={`search-tab ${Conditional({
            Condition: globalSearchTab === GlobalSearchTab.Games,
            If: `active ${getPageName()}`,
          })}`}
          onClick={() => setGlobalSearchTab(GlobalSearchTab.Games)}
        >
          <div className="text">Games</div>
        </div>
        <div
          className={`search-tab ${Conditional({
            Condition: globalSearchTab === GlobalSearchTab.Profiles,
            If: `active ${getPageName()}`,
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
          If={<GlobalSearchResultBlank element={getTextMessage()} />}
          Else={
            <Conditional
              Condition={globalSearchTab === GlobalSearchTab.Games}
              If={games.map((game) => {
                return <ModalGameSearchResult key={game.id} game={game} />;
              })}
              Else={profiles.map((profile) => {
                return (
                  <ModalProfileSearchResult
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

export default GlobalSearchModal;
