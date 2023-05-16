import React, { useEffect } from "react";
import Flex from "../Ui/Flex/Flex";
import Classes from "./Dialogue.module.css";
function Dialogue(props) {
  useEffect(() => {
    if (props.Show === false) {
      window.onscroll = undefined;
    } else {
      window.scrollTo(0, 0);
    }
  }, [props.Show]);
  return (
    <Flex
      style={{ display: props.Show ? "flex" : "none" }}
      className={Classes.Dialogue}
    >
      {props.children}
    </Flex>
  );
}

export default Dialogue;
