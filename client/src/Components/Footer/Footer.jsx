import React from "react";
import Logo from "../Logo/Logo";
import Flex from "../Ui/Flex/Flex";
import Classes from "./Footer.module.css";
function Footer() {
  return (
    <Flex className={Classes.Footer}>
      <Logo />
    </Flex>
  );
}

export default Footer;
