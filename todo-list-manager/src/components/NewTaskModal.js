import React from "react";
import { useDispatch } from "react-redux";
import { NewTaskModalActions } from "../store/NewTaskModalSlice";

const NewTaskModal = (props) => {
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

  // --------------------- addTask to DB should get implemented --------------------------
  // const addTaskDB = (taskobj) => {
  //   const db = getDatabase();
  //   const Newid = props.maxid + 1;

  //   const reference = ref(db, "/tasks/" + taskobj.id);
  //   const NewObj = {
  //     id: Newid,
  //     ...taskobj,
  //   };
  //   console.log("New Task :");
  //   console.table(NewObj);
  //   set(reference, NewObj);
  //   tasksActions.addTask(NewObj);

  //   console.log("New Task Added!");
  // };

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
