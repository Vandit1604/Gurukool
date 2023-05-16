import React from "react";
import Classes from "./Home.module.css";
import Flex from "../Ui/Flex/Flex";
import ForumImg from "../Assets/Forum.png";
import Button from "../Ui/Button/Button";
import { Link } from "react-router-dom";
function Doubt() {
  return (
    <Flex className={Classes.Home_Section} style={{ flexWrap: "wrap-reverse" }}>
      <img
        src={ForumImg}
        className={Classes.Image}
        style={{ float: "left" }}
        alt="SectionImage"
      />
      <Flex className={Classes.Box}>
        <h1>Doubt Forum</h1>
        <p>
          We have a special section in our App, THE DOUBT FORUM, where mentee
          can open any doubt regarding his stack with labels and offer some
          points on each doubt for the mentor.
        </p>
        <Link to="/Forum">
          <Button>Doubt Forum</Button>
        </Link>
      </Flex>
    </Flex>
  );
}

export default Doubt;
