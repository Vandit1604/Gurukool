import React from "react";
import Classes from "./Home.module.css";
import ExploreImg from "../Assets/Explore.png";
import Flex from "../Ui/Flex/Flex";
import Button from "../Ui/Button/Button";
import { Link } from "react-router-dom";
function Explore() {
  return (
    <Flex className={Classes.Home_Section}>
      <Flex className={Classes.Box}>
        <h1>Explore Section</h1>
        <p>About Explore Section</p>
        <Link to="/Explore">
          <Button>Explore Section</Button>
        </Link>
      </Flex>
      <img
        src={ExploreImg}
        className={Classes.Image}
        style={{ float: "right" }}
        alt="SectionImage"
      />
    </Flex>
  );
}

export default Explore;
