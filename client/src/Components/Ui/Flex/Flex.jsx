import React from "react";
import Classes from "./Flex.module.css";
function Flex(props) {
  return (
    <div
      className={Classes.Flex + " " + props.className}
      onClick={props.onClick}
      key={props.key}
      style={props.style}
    >
      {props.children}
    </div>
  );
}

export default Flex;
