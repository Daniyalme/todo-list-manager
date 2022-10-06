import React, { useState } from "react";
import IndividualTask from "./IndividualTask";

const Tasks = (props) => {
  console.log("Tasks.js");
  return (
    <div>
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
      {/* <IndividualTask
        name={props.items[0].name}
        creationdate={props.items[0].creationdate}
        duedate={props.items[0].duedate}
        taskstate={props.items[0].state}
        description={props.items[0].description}
      /> */}
    </div>
  );
};

export default Tasks;
