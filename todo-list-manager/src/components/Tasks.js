import React, { useState } from "react";
import IndividualTask from "./IndividualTask";

const Tasks = (props) => {
  console.log("Tasks.js");
  return (
    <div>
      <nav>
      <button>Add Task</button>
      </nav>
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
