import React, { useState } from "react";

const Task = (props) => {
  const [TaskName, setTaskName] = useState(props.item.name);
  const [Taskdate, setTaskDate] = useState(props.item.date.toISOString());

  return (
    <span>
      <p>{TaskName}</p>
      <p>{Taskdate}</p>
    </span>
  );
};

export default Task;
