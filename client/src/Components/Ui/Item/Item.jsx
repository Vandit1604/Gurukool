import React from "react";
import Classes from "./Item.module.css";
function Item(props) {
  return (
    <div className={Classes.Item} onClick={props.onClick}>
      {props.children}
    </div>
  );
}

export default Item;
