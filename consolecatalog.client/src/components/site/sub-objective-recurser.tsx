import { useSetRecoilState } from "recoil";
import { SubObjective } from "../../functions/interfaces/interfaces";
import {
  deleteSubObjective,
  putSubObjective,
} from "../../functions/server/internal/global-calls";
import Conditional from "./if-then-else";
import {
  addSubObjectiveModalState,
  subObjectiveParentIdState,
} from "../../functions/state";
import { useState } from "react";

function SubObjectiveRecurser(props: SubObjectiveRecurserProps) {
  const setIsAddSubObjectiveModalActive = useSetRecoilState(
    addSubObjectiveModalState
  );
  const setSubObjectiveParentId = useSetRecoilState(subObjectiveParentIdState);

  const [subObjectives, setSubObjectives] = useState<
    SubObjective[] | undefined
  >(props.subObjectives);

  async function removeSubObjective(subObjective: SubObjective) {
    const deletedSubObjectiveId = await deleteSubObjective(subObjective);
    setSubObjectives(
      subObjectives?.filter(
        (subObjective) => subObjective.id !== deletedSubObjectiveId
      )
    );
  }

  async function updateSubObjective(subObjective: SubObjective) {
    const updatedSubObjective = await putSubObjective(subObjective);
    const updatedSubObjectives = subObjectives?.map((subObjective) => {
      if (subObjective.id === updatedSubObjective.id)
        return updatedSubObjective;
      return subObjective;
    });
    setSubObjectives(updatedSubObjectives);
  }

  return (
    <>
      {subObjectives?.map((subObjective) => {
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
            <SubObjectiveRecurser subObjectives={subObjective.children} />
          </div>
        );
      })}
    </>
  );
}

export default SubObjectiveRecurser;

interface SubObjectiveRecurserProps {
  subObjectives: SubObjective[] | undefined;
}
