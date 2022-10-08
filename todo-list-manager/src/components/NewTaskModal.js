import React from "react";
import { useDispatch } from "react-redux";
import { NewTaskModalActions } from "../store/NewTaskModalSlice";

const NewTaskModal = () => {
  const dispatch = useDispatch();

  const InputNameHandler = (event) => {
    console.log(event.target.value);
  };

  const InputDescriptionHandler = (event) => {
    console.log(event.target.value);
  };

  const ClickCancelHandler = () => {
    dispatch(NewTaskModalActions.hide());
  };

  return (
    <div className="modal">
      <div className="modal-header">New Task Modal</div>
      <div className="modal-body">
        <form>
          <input
            type={"text"}
            placeholder={"Task Name"}
            onChange={InputNameHandler}
          />
          <input
            type={"text"}
            placeholder={"Description"}
            onChange={InputDescriptionHandler}
          />
          <button type="button" onClick={ClickCancelHandler}>
            Cancel
          </button>
          <button type="submit">Add Task</button>
        </form>
      </div>
      <div className="modal-footer"></div>
    </div>
  );
};

export default NewTaskModal;
