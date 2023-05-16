import React from "react";
import Classes from "./Button.module.css";
function Button(props) {
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className={props.className + " " + Classes.Button}
      style={props.style}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

export default Button;
