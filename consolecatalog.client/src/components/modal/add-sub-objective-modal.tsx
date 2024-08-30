import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import "../../styling/modal/add-sub-objective-modal.css";
import { addSubObjectiveModalState, userState } from "../../functions/state";
import { useEffect, useState } from "react";
import Conditional from "../site/if-then-else";
import { SubObjective } from "../../functions/interfaces";
import { postSubObjectives } from "../../functions/server";

function AddSubObjectiveModal(props: AddSubObjectiveModalProps) {
  const setIsAddSubObjectiveModalActive = useSetRecoilState(
    addSubObjectiveModalState
  );
  const [subObjectives, setSubObjectives] = useState<SubObjective[]>(
    [] as SubObjective[]
  );
  const [mergeIntoSingleTask, setMergeIntoSingleTask] =
    useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [isPasted, setIsPasted] = useState<boolean>(false);
  const user = useRecoilValue(userState);

  useEffect(() => {
    function setTaskCreationCount() {
      if (text !== "") {
        if (mergeIntoSingleTask) {
          setSubObjectives([
            {
              userId: user.id,
              titleId: props.titleId,
              trophyId: props.trophyId,
              details: text,
              isComplete: false,
            },
          ]);
        } else {
          let splitText = text.split("\n");
          setSubObjectives(
            splitText.map((text) => {
              return {
                userId: user.id,
                titleId: props.titleId,
                trophyId: props.trophyId,
                details: text,
                isComplete: false,
              };
            })
          );
        }
      }
      else 
        setMergeIntoSingleTask(false);
    }
    setTaskCreationCount();
  }, [text, setText, mergeIntoSingleTask, setMergeIntoSingleTask]);

  async function createSubObjectives() {
    const createdSubObjectives = await postSubObjectives(subObjectives);
    props.setSubObjectives([...createdSubObjectives]);
    setIsAddSubObjectiveModalActive(false);
  }

  function getSubmitButtonText() {
    if (text === "") return "Add 0 Sub Objectives";
    else if (mergeIntoSingleTask || subObjectives.length === 1)
      return "Add 1 Sub Objective";
    return `Add ${subObjectives.length} Sub Objectives`;
  }

  return (
    <>
      <div className="add-container">
        <div className="add-input">
          <textarea
            rows={
              subObjectives.length === 0 || text === ""
                ? 1
                : subObjectives.length
            }
            spellCheck={false}
            autoFocus={true}
            placeholder="Add Sub Objective..."
            onChange={(e) => {
              if (e.target.value === "") {
                setIsPasted(false);
              }
              setText(e.target.value);
            }}
            onPaste={() => setIsPasted(true)}
          />
        </div>
        <div
          className="close"
          onClick={() => setIsAddSubObjectiveModalActive(false)}
        >
          <i className="fa-solid fa-xmark fa-2xl fa-flip-horizontal" />
        </div>
      </div>
      <Conditional
        Condition={isPasted}
        If={
          <div className="paste-text">
            Each line from the pasted text will be added as a separate task
          </div>
        }
      />
      <div className="confirm-container">
        <div className="checkbox-container">
          <input
            disabled={subObjectives.length <= 1 && !mergeIntoSingleTask}
            id="checkbox"
            name="checkbox"
            className="checkbox"
            type="checkbox"
            checked={mergeIntoSingleTask}
            onClick={() => setMergeIntoSingleTask(!mergeIntoSingleTask)}
          />
          <label className="label" htmlFor="checkbox">
            Merge into single task
          </label>
        </div>
        <button
          className="add"
          disabled={subObjectives.length === 0 || text === ""}
          onClick={() => createSubObjectives()}
        >
          {getSubmitButtonText()}
        </button>
      </div>
    </>
  );
}

export default AddSubObjectiveModal;

interface AddSubObjectiveModalProps {
  titleId: string;
  trophyId: number;
  setSubObjectives: SetterOrUpdater<SubObjective[]>;
}
