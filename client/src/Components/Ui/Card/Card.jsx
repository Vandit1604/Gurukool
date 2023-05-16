import React from "react";
import Classes from "./Card.module.css";
function Card(props) {
  return (
    <div className={Classes.Card + " " + props.className}>{props.children}</div>
  );
}

export default Card;
