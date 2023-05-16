import React from "react";
import Flex from "../Ui/Flex/Flex";
import Classes from "./Hamburger.module.css";
function HamBurger(props) {
  return (
    <Flex
      className={Classes.Hamburger + ` ${props.Active && Classes.ActiveHam}`}
      onClick={props.onClick}
    >
      <div className={Classes.Line}></div>
      <div className={Classes.Line}></div>
      <div className={Classes.Line}></div>
    </Flex>
  );
}

export default HamBurger;
