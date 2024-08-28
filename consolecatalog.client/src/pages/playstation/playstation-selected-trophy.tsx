import { useRecoilValue } from "recoil";
import Conditional from "../../components/site/if-then-else";
import { sidebarState } from "../../functions/state";
import Playstation from "./playstation";
import { useLocation } from "react-router-dom";
import { getTrophyRarity, getTrophyTypeIcon } from "../../functions/methods";
import "../../styling/playstation/playstation-selected-trophy.css";
import { useEffect, useState } from "react";
import { SubObjective } from "../../functions/interfaces";
import {
  deleteSubObjective,
  deleteSubObjectives,
  getSubObjectives,
  putSubObjective,
} from "../../functions/server";

function PlaystationSelectedTrophy() {
  const isSidebarActive = useRecoilValue(sidebarState);
  const location = useLocation();
  const trophy = location.state?.trophy;
  const [subObjectives, setSubObjectives] = useState<SubObjective[]>(
    [] as SubObjective[]
  );

  useEffect(() => {
    async function fetchSubObjectives() {
      const fetchedSubObjectives = await getSubObjectives(
        location.state.titleId,
        trophy.trophyId
      );
      setSubObjectives(fetchedSubObjectives);
    }
    fetchSubObjectives();
  }, []);

  async function removeSubObjective(subObjective: SubObjective) {
    const deletedSubObjectiveId = await deleteSubObjective(subObjective);
    setSubObjectives(
      subObjectives.filter(
        (subObjective) => subObjective.id !== deletedSubObjectiveId
      )
    );
  }

  async function removeAllSubObjectives(subObjectives: SubObjective[]) {
    const deletedSubObjectiveIds = await deleteSubObjectives(subObjectives);
    setSubObjectives(
      subObjectives.filter(
        (subObjective) => !deletedSubObjectiveIds.includes(subObjective.id)
      )
    );
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

  return (
    <>
      <Playstation />
      <div
        className={`content ${Conditional({
          Condition: isSidebarActive,
          If: "disabled",
        })}`}
      >
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
              <i
                className="fa-regular fa-circle-check earned"
                style={{ color: "#049006" }}
              ></i>
            }
          />
          <div className="rarity">
            <div>{getTrophyRarity(trophy?.trophyRare)} </div>
            <div>{trophy?.trophyEarnedRate}%</div>
          </div>
          <img className="type" src={getTrophyTypeIcon(trophy?.trophyType)} />
        </div>
        <div className="title">
          <div className="name">Sub Objectives</div>
          <div className="actions">
            <button className="add">
              <div className="label">Add</div>
              <i className="fa-solid fa-plus add-icon"></i>
            </button>
            <button
              className={`delete ${Conditional({
                Condition: subObjectives.length === 0,
                If: "disabled",
              })}`}
              onClick={() => removeAllSubObjectives(subObjectives)}
              disabled={subObjectives.length === 0}
            >
              <div className="label">Delete All</div>
              <i className="fa-solid fa-trash-can add-icon"></i>
            </button>
          </div>
        </div>
        <div
          className={`sub-objectives ${Conditional({
            Condition: subObjectives.length === 0,
            If: "empty",
          })}`}
        >
          <Conditional
            Condition={subObjectives.length === 0}
            If={<div>No Sub Objectives</div>}
            Else={subObjectives
              .sort((a,b) => a.details.localeCompare(b.details))
              .sort((a, b) => Number(a.isComplete) - Number(b.isComplete))
              .map((subObjective) => {
                return (
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
                    <i
                      className="fa-solid fa-trash-can delete-icon"
                      onClick={() => removeSubObjective(subObjective)}
                    ></i>
                  </div>
                );
              })}
          />
        </div>
      </div>
    </>
  );
}

export default PlaystationSelectedTrophy;
