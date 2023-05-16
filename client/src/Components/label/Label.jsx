import React from "react";
import Classes from "./Label.module.css";
function Label(props) {
  return (
    <div
      className={Classes.Label + " " + props.className}
      style={{ backgroundColor: props.color }}
      onClick={props.onClick}
    >
      {props.label}
    </div>
  );
}

export default Label;
