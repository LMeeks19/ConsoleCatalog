import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Conditional from "../../components/site/if-then-else";
import {
  addSubObjectiveModalState,
  searchModalState,
  sidebarState,
  subObjectiveParentIdState,
} from "../../functions/state";
import Playstation from "./playstation";
import { useLocation } from "react-router-dom";
import {
  FormatStringDate,
  getProgressColour,
  getTrophyRarity,
  getTrophyTypeIcon,
} from "../../functions/methods";
import "../../style/playstation/playstation-selected-trophy.css";
import { useEffect, useState } from "react";
import { SubObjective } from "../../functions/interfaces/interfaces";
import {
  deleteSubObjective,
  getSubObjectives,
  putSubObjective,
} from "../../functions/server/internal/global-calls";
import Modal from "../../components/modal/modal";
import AddSubObjectiveModal from "../../components/modal/add-sub-objective-modal";
import SearchBar from "../../components/site/search-bar";
import { BeatLoader } from "react-spinners";
import ProgressBar from "@ramonak/react-progress-bar";
import { SubObjectivePlatform } from "../../functions/enums";

function PlaystationSelectedTrophy() {
  const isSidebarActive = useRecoilValue(sidebarState);
  const location = useLocation();
  const trophy = location.state?.trophy;
  const [subObjectives, setSubObjectives] = useState<SubObjective[]>(
    [] as SubObjective[]
  );
  const [isAddSubObjectiveModalActive, setIsAddSubObjectiveModalActive] =
    useRecoilState(addSubObjectiveModalState);
  const setSubObjectiveParentId = useSetRecoilState(subObjectiveParentIdState);
  const isSearchModalActive = useRecoilValue(searchModalState);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<number>(0);

  useEffect(() => {
    async function fetchSubObjectives() {
      setIsLoading(true);
      const fetchedSubObjectives = await getSubObjectives(
        location.state.userId,
        location.state.titleId,
        trophy?.trophyId,
        SubObjectivePlatform.PSN
      );
      setSubObjectives(fetchedSubObjectives);
      setIsLoading(false);
    }
    fetchSubObjectives();
  }, []);

  async function removeSubObjective(subObjective: SubObjective) {
    const remainingSubObjectives = await deleteSubObjective(subObjective);
    setSubObjectives(remainingSubObjectives);
  }

  async function updateSubObjective(subObjective: SubObjective) {
    const updatedSubObjective = await putSubObjective(subObjective);
    const updatedSubObjectives = subObjectives.map((subObjective) => {
      if (subObjective.id === updatedSubObjective.id)
        return updatedSubObjective;
      return subObjective;
    });
    setSubObjectives(updatedSubObjectives);
  }

  function sortedSubObjectives(): SubObjective[] {
    let subObjs = subObjectives.map((subObjecitve) => {
      return subObjecitve;
    });

    if (sortBy === 0)
      subObjs = subObjectives
        .sort((a, b) => a.details?.localeCompare(b.details))
        .sort(
          (a, b) =>
            new Date(a.createdDate).getMilliseconds() -
            new Date(b.createdDate).getMilliseconds()
        );
    if (sortBy === 1)
      subObjs = subObjectives.sort((a, b) =>
        a.details?.localeCompare(b.details)
      );
    return subObjs;
  }

  function subObjectiveRecurser(subObjs: SubObjective[]) {
    return subObjs?.map((subObjective) => {
      return (
        <div
          key={subObjective.id}
          style={{
            marginTop: "10px",
            marginLeft: "50px",
          }}
        >
          <div
            className={`sub-objective ${Conditional({
              Condition: subObjective.isComplete,
              If: "complete",
            })}`}
            key={subObjective.id}
          >
            <div className="checkbox-container">
              <input
                onClick={() => updateSubObjective(subObjective)}
                defaultChecked={subObjective.isComplete}
                className="input-checkbox"
                id={subObjective.id}
                type="checkbox"
                style={{ display: "none" }}
              />
              <label className="checkbox" htmlFor={subObjective.id}>
                <span>
                  <svg width="12px" height="9px" viewBox="0 0 12 9">
                    <polyline points="1 5 4 8 11 1"></polyline>
                  </svg>
                </span>
              </label>
            </div>
            <div className="text">{subObjective.details}</div>
            <div className="icon-container">
              <i
                className="fa-solid fa-plus add-icon"
                onClick={() => {
                  setSubObjectiveParentId(subObjective.id!);
                  setIsAddSubObjectiveModalActive(true);
                }}
              ></i>
              <i
                className="fa-solid fa-trash-can delete-icon"
                onClick={() => removeSubObjective(subObjective)}
              ></i>
            </div>
          </div>
          {subObjectiveRecurser(subObjective.children!)}
        </div>
      );
    });
  }

  return (
    <>
      <Playstation />
      <Conditional
        Condition={isAddSubObjectiveModalActive}
        If={
          <Modal
            component={
              <AddSubObjectiveModal
                userId={location.state.userId}
                titleId={location.state?.titleId}
                trophyId={trophy?.trophyId}
                platform={SubObjectivePlatform.PSN}
                setSubObjectives={setSubObjectives}
              />
            }
          />
        }
      />
      <div
        className={`content ${Conditional({
          Condition:
            isSidebarActive ||
            isAddSubObjectiveModalActive ||
            isSearchModalActive,
          If: "disabled",
        })}`}
      >
        <div className="trophy-container">
          <div
            className={`trophy ${Conditional({
              Condition: trophy?.earned,
              If: "earned",
            })}`}
          >
            <img className="image" src={trophy?.trophyIconUrl}></img>
            <div className="details">
              <div className="name">{trophy?.trophyName}</div>
              <div className="description">{trophy?.trophyDetail}</div>
            </div>
            <Conditional
              Condition={trophy?.earned}
              If={
                <div className="earned">
                  <div className="earned-text">
                    <div>Completed:</div>
                    {FormatStringDate(trophy?.earnedDateTime)}
                  </div>
                  <i
                    className="fa-regular fa-circle-check earned-icon"
                    style={{ color: "#049006" }}
                  ></i>
                </div>
              }
            />
            <Conditional
              Condition={!trophy?.earned && trophy?.progress !== null}
              If={
                <div className="progress">
                  <div className="progress-value">
                    <div>
                      {trophy?.progress}/{trophy?.trophyProgressTargetValue}
                    </div>
                    <ProgressBar
                      completed={trophy?.progressRate}
                      baseBgColor="#161616"
                      bgColor={getProgressColour(trophy?.progressRate)}
                      labelAlignment="outside"
                    />
                  </div>
                </div>
              }
            />
            <div className="rarity">
              <div>{getTrophyRarity(trophy?.trophyRare)} </div>
              <Conditional
                Condition={trophy?.trophyEarnedRate !== null}
                If={<div>{trophy?.trophyEarnedRate}%</div>}
              />
            </div>
            <img className="type" src={getTrophyTypeIcon(trophy?.trophyType)} />
          </div>
          <div className="title">
            <div className="name">Sub Objectives</div>
            <div className="actions">
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholder="Search Sub Objectives..."
                disabled={isLoading || subObjectives.length === 0}
              />
              <div className="custom-select">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(Number(e.target.value))}
                  disabled={isLoading}
                >
                  <option value={0}>Newest</option>
                  <option value={1}>Alphabetically</option>
                </select>
              </div>
              <button
                className="add"
                onClick={() => setIsAddSubObjectiveModalActive(true)}
                disabled={trophy?.earned}
              >
                <div className="label">Add</div>
                <i className="fa-solid fa-plus add-icon"></i>
              </button>
            </div>
          </div>
          <Conditional
            Condition={isLoading}
            If={
              <div className="loader">
                <BeatLoader speedMultiplier={0.5} color="white" size={20} />
              </div>
            }
            Else={
              <div
                className={`sub-objectives ${Conditional({
                  Condition:
                    subObjectives.length === 0 ||
                    subObjectives.filter((subObjectives) =>
                      subObjectives.details?.includes(searchTerm)
                    ).length === 0,
                  If: "empty",
                })}`}
              >
                <Conditional
                  Condition={
                    subObjectives.length === 0 ||
                    subObjectives.filter((subObjectives) =>
                      subObjectives.details?.includes(searchTerm)
                    ).length === 0
                  }
                  If={<div>No Sub Objectives</div>}
                  Else={sortedSubObjectives()
                    .filter((subObjecitve) =>
                      subObjecitve.details?.includes(searchTerm)
                    )
                    .sort((a, b) => Number(a.isComplete) - Number(b.isComplete))
                    .map((subObjective) => {
                      return (
                        <div key={subObjective.id}>
                          <div
                            className={`sub-objective ${Conditional({
                              Condition: subObjective.isComplete,
                              If: "complete",
                            })}`}
                          >
                            <div className="checkbox-container">
                              <input
                                onClick={() => updateSubObjective(subObjective)}
                                defaultChecked={subObjective.isComplete}
                                className="input-checkbox"
                                id={subObjective.id}
                                type="checkbox"
                                style={{ display: "none" }}
                              />
                              <label
                                className="checkbox"
                                htmlFor={subObjective.id}
                              >
                                <span>
                                  <svg
                                    width="12px"
                                    height="9px"
                                    viewBox="0 0 12 9"
                                  >
                                    <polyline points="1 5 4 8 11 1"></polyline>
                                  </svg>
                                </span>
                              </label>
                            </div>
                            <div className="text">{subObjective.details}</div>
                            <div className="icon-container">
                              <i
                                className="fa-solid fa-plus add-icon"
                                onClick={() => {
                                  setSubObjectiveParentId(subObjective.id!);
                                  setIsAddSubObjectiveModalActive(true);
                                }}
                              ></i>
                              <i
                                className="fa-solid fa-trash-can delete-icon"
                                onClick={() => removeSubObjective(subObjective)}
                              ></i>
                            </div>
                          </div>
                          {subObjectiveRecurser(subObjective.children!)}
                        </div>
                      );
                    })}
                />
              </div>
            }
          />
        </div>
      </div>
    </>
  );
}

export default PlaystationSelectedTrophy;
