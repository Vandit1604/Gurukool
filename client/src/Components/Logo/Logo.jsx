import React from "react";
import { Link } from "react-router-dom";
import Flex from "../Ui/Flex/Flex";
import Classes from "./Logo.module.css";
function Logo(props) {
  return (
    <Flex
      className={Classes.Heading + " " + props.className}
      style={props.style}
    >
      <Link to="/" className="Link">
        <i className={Classes.Heading_icon + " fas fa-graduation-cap"}></i>
        GuruKool
      </Link>
    </Flex>
  );
}

export default Logo;
