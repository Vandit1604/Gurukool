import React from "react";
import Classes from "./Rise.module.css";
function Rise(props) {
  return (
    <div
      className={Classes.Rise}
      style={{ animationDuration: `${1 + props.Delay}s` }}
    >
      {props.children}
    </div>
  );
}

export default Rise;
