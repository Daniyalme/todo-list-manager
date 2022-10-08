import React, { useState } from "react";
import IndividualTask from "./IndividualTask";

const Tasks = (props) => {
  return (
    <div>
      {/* Add A Table from Material UI/Emotion for this <div> */}
      {props.items.map((item) => (
        <IndividualTask
          key={item.id}
          name={item.name}
          creationdate={item.creationdate}
          duedate={item.duedate}
          taskstate={item.state}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default Tasks;
