import React from "react";

const NewTaskModal = () => {
  const InputNameHandler = (event) => {
    console.log(event.target.value);
  };

  const InputDescriptionHandler = (event) => {
    console.log(event.target.value);
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
          <button>Cancel</button>
          <button>Add Task</button>
        </form>
      </div>
      <div className="modal-footer"></div>
    </div>
  );
};

export default NewTaskModal;
