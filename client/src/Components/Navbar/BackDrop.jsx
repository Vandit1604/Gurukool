import React from "react";
import Classes from "./Navbar.module.css";
function BackDrop(props) {
  return (
    <div
      className={Classes.Backdrop}
      style={{ display: props.Show ? "block" : "none" }}
      onClick={props.onClick}
    ></div>
  );
}

export default BackDrop;
