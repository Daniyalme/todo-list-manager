import React, { useState } from "react";

const Task = (props) => {
  const [TaskName, setTaskName] = useState(props.item.name);
  const [Taskdate, setTaskDate] = useState(props.item.date.toISOString());

  return (
    <div>
      <p>{TaskName}</p>
      <p>{Taskdate}</p>
    </div>
  );
};

export default Task;
