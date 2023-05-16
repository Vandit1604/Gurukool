import React from "react";
import Flex from "../Ui/Flex/Flex";
import Classes from "./Navbar.module.css";
function SideNav(props) {
  return (
    <Flex
      className={Classes.SideBar}
      style={{
        transform: props.Show ? "translateX(0px)" : "translateX(1000px)",
      }}
    >
      {props.children}
    </Flex>
  );
}

export default SideNav;
