import React, { useState } from "react";

const IndividualTask = (props) => {
  const [TaskName, setTaskName] = useState(props.name);
  const [TaskCreationDate, setTaskCreationDate] = useState(props.creationdate);
  const [TaskDueDate, setTaskDueDate] = useState(props.duedate);
  const [TaskState, setTaskState] = useState(props.taskstate);
  const [Description, setDescription] = useState(props.description);
  const [ShowDescription, setShowDescription] = useState(false);
  // console.log("IndividualTask.js");

  const ShowDescriptionHandler = () => {
    setShowDescription(!ShowDescription);
  };

  return (
    <div>
      <button onClick={ShowDescriptionHandler}>Show Description</button>
      <p>{TaskName}</p>
      <p>{TaskCreationDate.toString()}</p>
      <p>{TaskDueDate.toString()}</p>
      <p>{TaskState}</p>
      {ShowDescription && <p>{Description}</p>}
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
};

export default IndividualTask;
