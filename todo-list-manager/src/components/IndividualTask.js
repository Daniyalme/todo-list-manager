import React, { useState } from "react";

const IndividualTask = (props) => {
  const [TaskName, setTaskName] = useState(props.name);
  const [TaskCreationDate, setTaskCreationDate] = useState(props.creationdate);
  const [TaskDueDate, setTaskDueDate] = useState(props.duedate);
  const [TaskState, setTaskState] = useState(props.taskstate);
  const [Description, setDescription] = useState(props.description);
  console.log("IndividualTask.js");
  return (
    <div>
      <button>Show Description</button>
      <p>{TaskName}</p>
      <p>{TaskCreationDate.toString()}</p>
      <p>{TaskDueDate.toString()}</p>
      <p>{TaskState}</p>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
};

export default IndividualTask;
